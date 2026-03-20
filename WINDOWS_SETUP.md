# Windows Setup Guide: College Complaint Management System

This guide will walk you through the process of setting up and running the College Complaint Management System on a Windows operating system.

## Prerequisites

Before starting, ensure you have the following software installed:

1.  **Python 3.10+**: Download from [python.org](https://www.python.org/downloads/windows/).
    - *Note: During installation, make sure to check "Add Python to PATH".*
2.  **Node.js (LTS)**: Download from [nodejs.org](https://nodejs.org/).
3.  **MySQL Server**: Recommended to use [XAMPP](https://www.apachefriends.org/index.html) (which includes MySQL/MariaDB) or the standalone [MySQL Community Server](https://dev.mysql.com/downloads/installer/).

---

## 1. Database Configuration

1.  Open your MySQL terminal (or phpMyAdmin if using XAMPP).
2.  Create a new database and user by running the following commands:

```sql
CREATE DATABASE ccms_db;
CREATE USER 'ccms_user'@'localhost' IDENTIFIED BY 'ccms123';
GRANT ALL PRIVILEGES ON ccms_db.* TO 'ccms_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## 2. Backend Setup

1.  Open a Command Prompt (cmd) or PowerShell window and navigate to the project root.
2.  Navigate to the backend directory:
    ```bash
    cd ccms_backend/ccms_project
    ```
3.  Create a virtual environment:
    ```bash
    python -m venv venv
    ```
4.  Activate the virtual environment:
    - **Command Prompt**: `venv\Scripts\activate`
    - **PowerShell**: `.\venv\Scripts\activate`
    - *Note: If PowerShell shows an error about script execution, run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` first.*
5.  Install the required dependencies:
    ```bash
    pip install django djangorestframework django-cors-headers mysqlclient djangorestframework-simplejwt
    ```
6.  Apply migrations:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
7.  (Optional) Seed the database if a seeding script is provided:
    ```bash
    python seed_db.py
    ```
8.  Start the backend server:
    ```bash
    python manage.py runserver
    ```
    The backend will be running at `http://127.0.0.1:8000/`.

---

## 3. Frontend Setup

1.  Open a **new** terminal window and navigate to the `ccms_frontend` directory:
    ```bash
    cd ccms_frontend
    ```
2.  Install the npm packages:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm start
    ```
    The frontend will be running at `http://localhost:3000/`.

---

## Troubleshooting

- **MySQL Connection Error**: Ensure the MySQL service is running in XAMPP or as a Windows service.
- **mysqlclient Installation Error**: If `pip install mysqlclient` fails, you may need the [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) or try using `mysql-connector-python` instead (may require changing ENGINE in `settings.py`). Alternatively, download a pre-built wheel from [Unofficial Windows Binaries](https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient).
- **Node.js Errors**: If `npm install` fails, try running it with administrator privileges or clearing the cache with `npm cache clean --force`.
- **Environment Variables**: If `python` or `node` is not recognized, ensure they are added to your system's PATH.
