import urllib.request
import urllib.parse
import json

BASE_URL = "http://127.0.0.1:8000/api"

def make_request(endpoint, data=None, token=None):
    url = f"{BASE_URL}/{endpoint}"
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    
    req_data = json.dumps(data).encode('utf-8') if data else None
    req = urllib.request.Request(url, data=req_data, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, response.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8')
    except Exception as e:
        return 0, str(e)

def run_test():
    print("=== Login ===")
    status, text = make_request("login/", {"username": "tester", "password": "password123"})
    print(f"  {status}: {text[:120]}")
    
    token = None
    try:
        token = json.loads(text).get("access")
        print(f"  Token obtained: {token[:20]}...")
    except Exception:
        pass

    print("\n=== Complaints (authenticated) ===")
    status, text = make_request("complaints/", token=token)
    print(f"  {status}: {text[:120]}")

    print("\n=== Complaints (no token) ===")
    status, text = make_request("complaints/")
    print(f"  {status}: {text[:80]}")

if __name__ == "__main__":
    run_test()
