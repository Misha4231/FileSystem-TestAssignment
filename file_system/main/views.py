from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from .simple_file_system import SimpleFileSystem

fs = SimpleFileSystem()

class FileSystemView(APIView):
    def get(self, request: Request, path: str):
        if path.endswith('/') or path == '': # directory view
            try:
                fs.set_directory(path)
            except KeyError as e:
                return Response(e.args, status=404)
            
            return Response(fs.list_files())
        else: # file content
            try:
                content = fs.read_file(path)
                return Response(content)
            except KeyError as e:
                return Response(e.args, status=404)