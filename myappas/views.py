from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from django.contrib.auth import get_user_model  
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,serializers
from .models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from .models import Attendance
from rest_framework.authtoken.models import Token 
from rest_framework.permissions import AllowAny
from datetime import datetime,date
import pandas as pd
from django.http import HttpResponse
from rest_framework.permissions import IsAdminUser
from django.core.mail import send_mail
from django.views.generic import TemplateView


User = get_user_model()


from django.views.generic import TemplateView

class FrontendAppView(TemplateView):
    template_name = 'index.html'
   
   
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()  
    serializer_class = RegisterSerializer
    # In RegisterView (or serializer)
    def perform_create(self, serializer):
        user = serializer.save(is_staff=True)  # mark as admin



class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "username": user.username,
                "email": user.email,
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class AdminAddUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = AdminAddUserSerializer
    def perform_create(self, serializer):
        user = serializer.save(is_staff=False)  # normal user


class AttendanceListView(generics.ListAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceListSerializer

class AttendanceUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceUpdateSerializer
    lookup_field = 'id'
    

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.id,
            'email': user.email,
            'is_admin': user.is_staff  # ✅ Add this line
        }, status=status.HTTP_200_OK)



class PunchInView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        today = date.today()

        if Attendance.objects.filter(user=user, date=today).exists():
            return Response({'detail': 'Already punched in today.'}, status=400)

        Attendance.objects.create(
            user=user,
            date=today,
            punch_in=datetime.now().time()
        )
        return Response({'detail': 'Punched in successfully'}, status=200)


class PunchOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        today = date.today()

        try:        
            attendance = Attendance.objects.get(user=user, date=today)
        except Attendance.DoesNotExist:
            return Response({'detail': 'You have not punched in today.'}, status=400)

        if attendance.punch_out is not None:
            return Response({'detail': 'Already punched out today.'}, status=400)

        attendance.punch_out = datetime.now().time()
        attendance.save()

        return Response({'detail': 'Punched out successfully'}, status=200)

class AttendanceHistoryView(ListAPIView):
    serializer_class = AttendanceHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Attendance.objects.filter(user=self.request.user).order_by('-date')



class ExportAttendanceExcelView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        attendance_qs = Attendance.objects.filter(user=user).order_by('-date')

        # Prepare data for DataFrame
        data = []
        for record in attendance_qs:
            data.append({
                'Date': record.date,
                'Punch In': record.punch_in,
                'Punch Out': record.punch_out,
            })

        # Create DataFrame
        df = pd.DataFrame(data)

        # Create a BytesIO buffer to save Excel file in-memory
        from io import BytesIO
        buffer = BytesIO()
        # Write the DataFrame to the buffer as Excel
        with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Attendance')

        buffer.seek(0)

        # Return the Excel file as response
        response = HttpResponse(
            buffer,
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=attendance.xlsx'
        return response

from datetime import date

class AdminMonthlyReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        year = int(request.query_params.get('year', date.today().year))
        month = int(request.query_params.get('month', date.today().month))

        start_date = date(year, month, 1)
        if month == 12:
            end_date = date(year + 1, 1, 1)
        else:
            end_date = date(year, month + 1, 1)

        records = Attendance.objects.filter(user=user, date__gte=start_date, date__lt=end_date)
        total_days = records.count()

        data = {
            'total_days': total_days,
            'records': [
                {
                    'date': r.date.strftime('%Y-%m-%d'),
                    'punch_in': r.punch_in.strftime('%H:%M:%S') if r.punch_in else None,
                    'punch_out': r.punch_out.strftime('%H:%M:%S') if r.punch_out else None,
                }
                for r in records
            ]
        }

        return Response(data)

from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from datetime import date
from .models import Attendance, CustomUser as User  # or just User if already imported

class AdminNotifyMissingPunchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = date.today()
        users = User.objects.all()
        missing_users = []

        for user in users:
            try:
                attendance = Attendance.objects.get(user=user, date=today)
                if attendance.punch_out is None:
                    missing_users.append(user.username)
            except Attendance.DoesNotExist:
                missing_users.append(user.username)

        if missing_users:
            try:
                send_mail(
                    'Missing Punch Alert',
                    f'The following users missed punch in/out today: {", ".join(missing_users)}',
                    settings.EMAIL_HOST_USER,
                    [settings.EMAIL_HOST_USER],
                    fail_silently=False  # Don't suppress errors
                )
                return Response({'detail': 'Admin notified of missing punches.', 'missing_users': missing_users})
            except Exception as e:
                return Response({'detail': 'Notification failed', 'error': str(e)}, status=500)

        return Response({'detail': 'All users punched correctly today.', 'missing_users': []})
