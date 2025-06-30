import pytest
from rest_framework.test import APIClient
from main.views import fs

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture(autouse=True)
def clear_fs():
    fs.files.clear()
    fs.set_directory('')
    yield

def test_create_directory(client: APIClient):
    response = client.post("/fs/some_folder/")
    assert response.status_code == 201

    response = client.get('/fs/')
    assert response.status_code == 200
    assert "some_folder/" in response.json()

def test_create_file(client: APIClient):
    response = client.post("/fs/file.txt")
    assert response.status_code == 201

    response = client.get('/fs/')
    assert response.status_code == 200
    assert "file.txt" in response.json()

def test_create_nested_file(client: APIClient):
    response = client.post("/fs/data/file.txt")
    assert response.status_code == 201

    response = client.get('/fs/data/')
    assert response.status_code == 200
    assert "file.txt" in response.json()

def test_get_file_content_and_update(client: APIClient):
    client.post("/fs/script.sh")
    response = client.get('/fs/script.sh')

    assert response.status_code == 200
    assert response.json()['content'] == ''

    response = client.put('/fs/script.sh', {'content': "echo Hello"}, format='json')
    assert response.status_code == 200

    response = client.get('/fs/script.sh')
    assert response.json()['content'] == "echo Hello"

def test_delete_file(client: APIClient):
    client.post('/fs/logs.txt')
    response = client.delete('/fs/logs.txt')
    assert response.status_code == 204

    response = client.get('/fs/logs.txt')
    assert response.status_code == 404

def test_delete_directory(client: APIClient):
    client.post('/fs/dir/')
    response = client.delete('/fs/dir/')
    assert response.status_code == 204

    response = client.get('/fs/dir/')
    assert response.status_code == 404

def test_delete_nested_directory(client: APIClient):
    client.post('/fs/dir/data/qwe.txt')
    response = client.delete('/fs/dir/data/')
    assert response.status_code == 204

    response = client.get('/fs/dir/data/qwe.txt')
    assert response.status_code == 404

def test_files_sorting(client: APIClient):
    client.post("/fs/abc.txt")
    client.post("/fs/qwe.txt")

    response = client.get('/fs/?sort=name')
    assert response.status_code == 200
    data = response.json()
    assert ['abc.txt', 'qwe.txt'] == data

def test_search_path(client: APIClient):
    client.post('/fs/dir1/file.txt')
    client.post('/fs/data.db')

    response = client.get('/search/?path=dir')
    assert response.status_code == 200

    data = response.json()
    assert 'dir1/' in data
    assert 'dir1/file.txt' in data