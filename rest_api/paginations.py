from rest_framework.response import Response
from rest_framework.pagination import (
    PageNumberPagination, 
    _get_displayed_page_numbers
)


class TrainerPagination(PageNumberPagination):
    """Extends PageNumberPagination class"""

    def get_paginated_response(self, current_path, data):
        return Response({
            'total_objects': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page_number': self.page.number,
            'page_size': self.page_size,
            'current_path': current_path,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'range': _get_displayed_page_numbers(
                self.page.number, self.page.paginator.num_pages 
                ),
            'results': data,
        })
