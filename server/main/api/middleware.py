from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from datetime import datetime, timezone


# class JWTAuthCookieMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
#         refresh_token = request.COOKIES.get(
#             settings.SIMPLE_JWT['REFRESH_COOKIE'])

#         if access_token:
#             try:
#                 # decode access token
#                 access_token_obj = RefreshToken(access_token)

#                 # check if expired
#                 if access_token_obj.get('exp', 0) < datetime.now(timezone.utc).timestamp():
#                     if refresh_token:
#                         refresh_token_obj = RefreshToken(refresh_token)
#                         new_access_token = str(refresh_token_obj.access_token)
#                         request.META['HTTP_AUTHORIZATION'] = f"Bearer {new_access_token}"

#                         # refresh the refresh token
#                         request._refresh_access_token = new_access_token

#             except TokenError:
#                 pass

#     def process_response(self, request, response):
#         if hasattr(request, '_refresh_access_token'):
#             response.set_cookie(
#                 key=settings.SIMPLE_JWT['AUTH_COOKIE'],
#                 value=request._refresh_access_token,
#                 expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
#                 httponly=True,
#                 secure=settings.SIMPLE_JWT['COOKIE_SECURE']
#             )

#         return response


class JWTAuthCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])

        if access_token:
            request.META['HTTP_AUTHORIZATION'] = f"Bearer {access_token}"

        response = self.get_response(request)
        return response
