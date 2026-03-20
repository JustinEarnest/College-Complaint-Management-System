from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(User.USERNAME_FIELD) or kwargs.get('email')
        
        if not username:
            return None
            
        try:
            # Look for user by username or email
            user = User.objects.get(Q(username=username) | Q(email=username))
        except User.DoesNotExist:
            # Run the default password hasher once to reduce the vulnerability
            # to timing attacks.
            User().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
        return None
