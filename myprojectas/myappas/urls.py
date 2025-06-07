from django.urls import path
from .views import *
from django.urls import re_path
from myappas.views import FrontendAppView  # adjust your_app

urlpatterns = [
    # ... your API urls here ...

    # Catch-all route to serve React index.html
    re_path(r'^.*$', FrontendAppView.as_view(), name='frontend'),
]


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin/add-user/', AdminAddUserView.as_view(), name='admin-add-user'),
    path('admin/attendances/', AttendanceListView.as_view(), name='attendance-list'),
    path('admin/attendance/<int:id>/', AttendanceUpdateView.as_view(), name='attendance-edit'),
    path('loginuser/', LoginAPIView.as_view(), name='loginuser'),
    path('punch-in/', PunchInView.as_view(), name='punch-in'),
    path('punch-out/', PunchOutView.as_view(), name='punch-out'),
    path('attendance/', AttendanceHistoryView.as_view(), name='attendance-history'),
    path('print/', ExportAttendanceExcelView.as_view(), name='excel_report'),
    path('report/', AdminMonthlyReportView.as_view(), name='monthly_report') ,
    path('notify/', AdminNotifyMissingPunchView.as_view(), name='missing_notify') ,
    re_path(r'^.*$', FrontendAppView.as_view(), name='frontend'),

]


