from datetime import datetime

class File:
    def __init__(self, content: str):
        self.content = content
        self.created_at = datetime.now()
        self.modified_at = datetime.now()

    def size(self) -> int:
        return len(self.content.encode('utf-8'))

    def update_content(self, content: str):
        self.content = content
        self.modified_at = datetime.now()

    def serializable(self) -> dict[str, str]:
        return {
            "content": self.content,
            "created_at": self.created_at,
            "modified_at": self.modified_at,
            "size": self.size()
        }