from .file import File

class SimpleFileSystem:
    def __init__(self):
        self.files: dict[str, File] = {
            'data/': '',
            'file.txt': 'some content',
            'etc/root/': '',
            'usr/executable.exe': 'scriptasdasd',
            'usr/bash.exe': 'more script',
        }
        self.directory: str = ''

    def create_file(self, name: str, content: str) -> None:
        self.files[name] = File(content)

    def read_file(self, name: str) -> File:
        if name not in self.files.keys():
            raise KeyError('File not exists')
        
        return self.files[name]
    
    def update_file(self, name: str, content: str) -> None:
        if name not in self.files.keys():
            raise KeyError('File not exists')
        
        self.files[name].update_content(content)

    def delete_file(self, name: str) -> None:
        self.files.pop(name)

    def list_files(self):
        return self.files.keys()
    
    def execute_command(self, command: str) -> str | None:
        if command == 'ls':
            return ' '.join(self.list_files())
        
        task, filepath, *content = command.split(' ')

        if task == 'cat':
            return self.read_file(filepath)
        elif task == 'rm':
            self.delete_file(filepath)
        elif task == 'edit':
            self.update_file(filepath, ' '.join(content))
        else:
            raise Exception('Unnown command')

    def set_directory(self, directory: str):
        directory_exists = any(d.startswith(directory) for d in self.files.keys())
        if not directory_exists:
            raise KeyError('Directory not exists')
        
        self.directory = directory

    def search_file(self, filename: str | None = None, content: str | None = None) -> list[dict[str, File]]:
        results = []

        for path, file in self.files.items():
            # if file lays in current directory and have provided filename or provided content
            if path.startswith(self.directory) and ((filename and filename in path.split('/')[-1]) or (content and content in file.content)):
                results.append({path: file})

        return results

    def list_files(self, sort_by: str | None = None, reverse: bool = False) -> list[str]:
        # get file names in current directory
        current_files = set()
        for path in self.files.keys():
            if path.startswith(self.directory):
                relative_path = path[len(self.directory):]
                first_part = relative_path.split('/')[0]

                is_directory = relative_path.count('/') > 0
                if is_directory:
                    current_files.add(first_part + '/')
                else:
                    current_files.add(first_part)

        current_files = list(current_files)
        if sort_by == 'name':
            current_files.sort(reverse=reverse)
        elif sort_by == 'size':
            def get_size(entry_name: str):
                path = self.directory + entry_name

                # directories treated as size 0
                if entry_name.endswith('/'):
                    return 0
                
                return self.read_file(path).size() if path in self.files.keys() else 0
            
            current_files.sort(key=get_size, reverse=reverse)

        return current_files
    