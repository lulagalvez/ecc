import requests

endpoint_base = "http://127.0.0.1:5000/"


def send_json():
    endpoint = endpoint_base
    data = {
        "first_name": "Camilo",
        "last_name": "Jarpa",
        "second_last_name": "Gutierrez",
        "age": 22,
    }
    get_response = requests.get(endpoint, json=data)

    print(get_response.text)
    print(get_response.status_code)
    
def create_user():
    endpoint = endpoint_base + "user/"
    
    data = {
        "first_name": "Seba",
        "last_name": "Sanhueza",
        "role": "admin",
        "user_name": "sanhue",
        "password": "1234",
        "email": "admin@admin.cl"
    }
    
    get_response = requests.post(endpoint, json=data)
    
def create_entrytime():
    endpoint = endpoint_base + "entrytime/"
    
    data = {
        "user_id": 1
    }
    
    get_response = requests.post(endpoint, json=data)
    print(get_response.text)
    print(get_response.status_code)

def create_exittime():
    endpoint = endpoint_base + "exittime/"
    
    data = {
        "user_id": 1
    }
    
    get_response = requests.post(endpoint, json=data)
    print(get_response.text)
    print(get_response.status_code)


create_exittime()