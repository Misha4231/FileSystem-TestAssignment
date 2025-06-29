from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response

from .simple_file_system import SimpleFileSystem

fs = SimpleFileSystem()

class FileSystemView(APIView):
    def get(self, request: Request, path: str):
        if path.endswith('/') or path == '': 
            # directory view
            try:
                fs.set_directory(path)
            except KeyError as e:
                return Response(e.args, status=404)
            
            sort = request.query_params.get('sort')
            reverse = True if request.query_params.get('reverse') == '1' else False

            return Response(fs.list_files(sort_by=sort, reverse=reverse))
        else: 
            # file content
            try:
                content = fs.read_file(path)
                return Response(content)
            except KeyError as e:
                return Response(e.args, status=404)
            

class SearchFileView(APIView):
    def get(self, request: Request):
        filename = request.query_params.get('filename')
        content = request.query_params.get('content')
        
        return Response(fs.search_file(filename, content))