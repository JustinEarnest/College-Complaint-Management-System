import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ccms_project.settings')
django.setup()

from accounts.models import User
from students.models import Student
from departments.models import Department

def seed_data():
    print("Seeding departments...")
    depts = ['Computer Science', 'Electronics', 'Mechanical', 'Civil']
    dept_objs = {}
    for name in depts:
        dept, created = Department.objects.get_or_create(dept_name=name)
        dept_objs[name] = dept
        print(f"  Department '{name}' - {'Created' if created else 'Already exists'}")

    print("\nSeeding Users...")
    users = [
        {'username': 'admin_user', 'email': 'admin@ccms.com', 'password': 'password123', 'role': 'admin'},
        {'username': 'student_jane', 'email': 'jane@test.com', 'password': 'password123', 'role': 'student', 'dept': 'Computer Science', 'phone': '1234567890'},
        {'username': 'student_john', 'email': 'john@test.com', 'password': 'password123', 'role': 'student', 'dept': 'Electronics', 'phone': '0987654321'},
    ]

    for u_data in users:
        user, created = User.objects.get_or_create(
            username=u_data['username'],
            defaults={'email': u_data['email'], 'role': u_data['role']}
        )
        if created:
            user.set_password(u_data['password'])
            user.save()
            print(f"  User '{u_data['username']}' - Created")
        else:
            print(f"  User '{u_data['username']}' - Already exists")

        if u_data['role'] == 'student':
            student, s_created = Student.objects.get_or_create(
                email=u_data['email'],
                defaults={
                    'name': u_data['username'],
                    'phone': u_data['phone'],
                    'department': dept_objs[u_data['dept']]
                }
            )
            print(f"    Student record - {'Created' if s_created else 'Already exists'}")

if __name__ == "__main__":
    seed_data()
