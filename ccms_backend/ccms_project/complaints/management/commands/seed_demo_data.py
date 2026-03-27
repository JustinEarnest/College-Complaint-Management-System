import random
from django.core.management.base import BaseCommand
from django.db import transaction
from django.contrib.auth import get_user_model
from faker import Faker
from accounts.models import User
from students.models import Student
from departments.models import Department
from complaints.models import Complaint
from complaint_status.models import ComplaintStatus

fake = Faker()

class Command(BaseCommand):
    help = 'Seeds the database with 100 students and 200 complaints'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database seeding...'))

        departments_list = ['CSE', 'ECE', 'ME', 'CE', 'EEE', 'IT', 'AI', 'DS', 'CyberSecurity', 'IoT']
        
        with transaction.atomic():
            # 1. Create Departments
            depts = []
            for d_name in departments_list:
                dept, created = Department.objects.get_or_create(dept_name=d_name)
                depts.append(dept)
            
            self.stdout.write(f'Created/Found {len(depts)} departments.')

            # 2. Create Students (100)
            students = []
            users_to_create = []
            student_data = []

            self.stdout.write('Generating 100 student records...')
            for i in range(100):
                first_name = fake.first_name().lower()
                last_name = fake.last_name().lower()
                username = f"{first_name}_{last_name}_{random.randint(100, 999)}"
                email = f"{username}@edu.com"
                phone = "".join([str(random.randint(0, 9)) for _ in range(10)])
                
                user = User(
                    username=username,
                    email=email,
                    role='student',
                    first_name=first_name.capitalize(),
                    last_name=last_name.capitalize()
                )
                user.set_password(f"{username}@123")
                users_to_create.append(user)
                student_data.append({'phone': phone, 'dept': random.choice(depts)})

            # Bulk create users
            User.objects.bulk_create(users_to_create)
            
            # Fetch the created users to link with Students
            created_users = User.objects.filter(role='student').order_by('-id')[:100]
            
            students_to_create = []
            for i, user in enumerate(reversed(created_users)):
                student = Student(
                    name=user.get_full_name(),
                    email=user.email,
                    phone=student_data[i]['phone'],
                    department=student_data[i]['dept']
                )
                students_to_create.append(student)

            Student.objects.bulk_create(students_to_create)
            students = list(Student.objects.all())
            self.stdout.write(self.style.SUCCESS(f'Successfully created 100 students.'))

            # 3. Create Complaints (200)
            self.stdout.write('Generating 200 complaints...')
            complaints_to_create = []
            
            categories = ['Hostel', 'Academic', 'Infrastructure', 'Technical', 'Other']
            priorities = ['Low', 'Medium', 'High']
            
            complaint_titles = [
                "Wi-Fi not working in Hostel Block {block}",
                "Library books overdue notification error",
                "Canteen food quality issue",
                "Water shortage in Washroom floor {floor}",
                "Projector malfunction in Room {room}",
                "Laboratory equipment broken",
                "Scholarship disbursement delay",
                "Bus service timing mismatch",
                "Noise complaint in study area",
                "AC not cooling in Seminar Hall",
                "Id card replacement request",
                "Examination portal login issue",
                "Gym equipment maintenance needed",
                "Sports ground lighting problem",
                "Certificate issuance delay"
            ]

            for i in range(200):
                student = random.choice(students)
                category = random.choice(categories)
                priority = random.choice(priorities)
                
                title_template = random.choice(complaint_titles)
                title = title_template.format(
                    block=random.randint(1, 5),
                    floor=random.randint(1, 4),
                    room=random.randint(101, 505)
                )
                
                complaint = Complaint(
                    student=student,
                    department=student.department,
                    subject=title,
                    description=fake.paragraph(nb_sentences=5),
                    category=category,
                    priority=priority
                )
                complaints_to_create.append(complaint)

            Complaint.objects.bulk_create(complaints_to_create)
            
            # 4. Create Complaint Statuses
            # Get the newly created complaints
            created_complaints = Complaint.objects.all().order_by('-complaint_id')[:200]
            
            statuses_to_create = []
            status_choices = ['Pending', 'In Progress', 'Resolved']
            
            for complaint in created_complaints:
                status = random.choice(status_choices)
                status_obj = ComplaintStatus(
                    complaint=complaint,
                    status=status,
                    remarks=fake.sentence() if status != 'Pending' else ""
                )
                statuses_to_create.append(status_obj)
            
            ComplaintStatus.objects.bulk_create(statuses_to_create)
            
            self.stdout.write(self.style.SUCCESS(f'Successfully created 200 complaints and statuses.'))
            self.stdout.write(self.style.SUCCESS('Seeding completed successfully!'))
