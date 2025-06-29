from django.urls import path

from .views import FileSystemView, SearchFileView

urlpatterns = [
    path('fs/<path:path>', FileSystemView.as_view(), name='file_system'),
    path('fs/', FileSystemView.as_view(), {'path': ''}, name='file_system_root'),
    path('search/', SearchFileView.as_view(), name='search_file'),
]