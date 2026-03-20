import os
import django
from django.conf import settings
from django.db import connection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ccms_project.settings')
django.setup()

with connection.cursor() as cursor:
    cursor.execute('SET FOREIGN_KEY_CHECKS = 0;')
    cursor.execute("SHOW TABLES")
    tables = [row[0] for row in cursor.fetchall()]
    for table in tables:
        cursor.execute(f"DROP TABLE `{table}`;")
    cursor.execute('SET FOREIGN_KEY_CHECKS = 1;')

print("All tables dropped successfully.")
