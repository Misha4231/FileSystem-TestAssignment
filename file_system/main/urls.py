from django.urls import path

from .views import FileSystemView, SearchFileAndDirectoryView

urlpatterns = [
    path('fs/<path:path>', FileSystemView.as_view(), name='file_system'),
    path('fs/', FileSystemView.as_view(), {'path': ''}, name='file_system_root'),
    path('search/', SearchFileAndDirectoryView.as_view(), name='search_file'),
]