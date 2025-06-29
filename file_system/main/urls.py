from django.urls import path

from .views import FileSystemView

urlpatterns = [
    path('<path:path>', FileSystemView.as_view(), name='file_system'),
    path('', FileSystemView.as_view(), {'path': ''}, name='file_system_root'),
]