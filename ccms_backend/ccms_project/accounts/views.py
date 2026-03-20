from django.contrib.auth import get_user_model, authenticate
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    role = request.data.get('role', 'student')
    email = request.data.get('email', '')

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        role=role
    )

    if role == 'student':
        from students.models import Student
        from departments.models import Department
        
        phone = request.data.get('phone', '')
        department_id = request.data.get('department')
        
        try:
            department = Department.objects.get(dept_id=department_id)
            Student.objects.create(
                name=username,
                email=email,
                phone=phone,
                department=department
            )
        except Department.DoesNotExist:
            user.delete()
            return Response({"error": "Invalid department"}, status=400)
        except Exception as e:
            user.delete()
            return Response({"error": str(e)}, status=400)

    refresh = RefreshToken.for_user(user)
    return Response({
        "message": "Registered successfully",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "role": role
    })


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required"}, status=400)

    # authenticate will now use our custom backend to check both username and email
    user = authenticate(request, username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "role": getattr(user, 'role', ''),
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })

    return Response({"error": "Invalid credentials"}, status=401)


@api_view(['POST'])
@permission_classes([AllowAny])
def user_logout(request):
    # JWT is stateless; client should delete the token.
    # If blacklisting is enabled, refresh token could be added to blacklist here.
    return Response({"message": "Logged out successfully"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    return Response({
        "user": request.user.username,
        "role": request.user.role
    })