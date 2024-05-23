from rest_framework import pagination
from django.conf import settings


class CustomPagination(pagination.PageNumberPagination):
    # page_size = settings.REST_FRAMEWORK['PAGE_SIZE']
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 100
