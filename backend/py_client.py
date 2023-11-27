import requests

endpoint_base = "http://127.0.0.1:5000/"

def create_admin():
    endpoint = endpoint_base + "user/register"
    
    data = {
        "first_name": "Seba",
        "last_name": "Sanhueza",
        "user_name": "admin",
        "password": "admin",
        "email": "admin@admin.cl"
    }
    
    get_response = requests.post(endpoint, json=data)
    
def login_admin():
    endpoint = endpoint_base + "user/login"
    
    data = {
        "user_name": "admin",
        "password": "admin"
    }
    
    get_response = requests.post(endpoint, json=data)
    print(get_response.text)
    print(get_response.status_code)
    
def create_entrytime():
    endpoint = endpoint_base + "entrytime/"
    
    data = {
        "user_id": 1
    }
    
    get_response = requests.post(endpoint, json=data)
    print(get_response.text)
    print(get_response.status_code)
import requests

endpoint_base = "http://127.0.0.1:5000/"

def create_admin():
    endpoint = endpoint_base + "user/register"
    
    data = {
        "first_name": "Seba",
        "last_name": "Sanhueza",
        "user_name": "admin",
        "password": "admin",
        "email": "admin@admin.cl"
    }
    
    get_response = requests.post(endpoint, json=data)
    
def login_admin():
    endpoint = endpoint_base + "user/login"
    
    data = {
        "user_name": "admin",
        "password": "admin"
    }
    
    get_response = requests.post(endpoint, json=data)
    print(get_response.text)
    print(get_response.status_code)
    
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



if __name__ == "__main__":
    while True:
        functions = [create_admin, login_admin, create_entrytime, create_exittime]
        
        index = 0
        for function in functions:
            print(f'[{index}] {function.__name__}')
            index += 1
            
        choice = input("Choose a function: ")
        try:
            choice=int(choice)
        except:
            print("Invalid choice")
            continue
        functions[choice]()
 
    endpoint = endpoint_base + "exittime/"
    
    data = {
        "user_id": 1
    }
    
    get_response = requests.post(endpoint, json=data)
    print(get_response.text)
    print(get_response.status_code)



if __name__ == "__main__":
    while True:
        functions = [create_admin, login_admin, create_entrytime, create_exittime]
        
        index = 0
        for function in functions:
            print(f'[{index}] {function.__name__}')
            index += 1
            
        choice = input("Choose a function: ")
        try:
            choice=int(choice)
        except:
            print("Invalid choice")
            continue
        functions[choice]()
 