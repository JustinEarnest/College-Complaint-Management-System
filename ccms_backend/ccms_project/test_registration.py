import urllib.request
import urllib.parse
import json

BASE_URL = "http://127.0.0.1:8000/api"

def make_request(endpoint, data=None, auth_token=None):
    url = f"{BASE_URL}/{endpoint}"
    headers = {'Content-Type': 'application/json'}
    if auth_token:
        headers['Authorization'] = f'Bearer {auth_token}'
    
    req_data = None
    if data:
        req_data = json.dumps(data).encode('utf-8')
    
    req = urllib.request.Request(url, data=req_data, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, response.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8')
    except Exception as e:
        return 0, str(e)
def run_test():
    print("1. Registering new student...")
    status, text = make_request("register/", {
        "username": "tester",
        "email": "tester@test.com",
        "password": "password123",
        "role": "student",
        "phone": "555-5555",
        "department": 1
    })
    print("Register Response:", status, text)
    
    print("2. Login...")
    status, text = make_request("login/", {
        "username": "tester",
        "password": "password123"
    })
    print("Login Response:", status, text)
    
    token = None
    try:
        token = json.loads(text).get("access")
    except Exception:
        pass

    print("3. Getting Complaints...")
    status, text = make_request("complaints/", auth_token=token)
    print("Complaints Response:", status, text)

if __name__ == "__main__":
    run_test()
