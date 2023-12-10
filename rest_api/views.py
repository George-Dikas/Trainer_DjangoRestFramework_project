from django.shortcuts import get_object_or_404  
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status  
from .models import Subject, Trainer
from .serializers import SubjectSerializer, TrainerSerializer
from .paginations import TrainerPagination


@api_view(['GET'])
@permission_classes([AllowAny])
def trainer_list(request):
    """Display trainers with pagination"""
    paginator = TrainerPagination()
    paginator.page_size = 7
    trainers = Trainer.objects.select_related('subject')
    result_page = paginator.paginate_queryset(trainers, request)
    serializer = TrainerSerializer(result_page, many=True)
    return paginator.get_paginated_response(
        request.get_full_path(), 
        serializer.data
    )

@api_view(['POST'])
def trainer_create(request):
    """Create a trainer"""
    serializer = TrainerSerializer(data=request.data)
    if serializer.is_valid(): 
        serializer.save()
        return Response({
            'message': 'Trainer was created successfully!', 
            'serializer_data': serializer.data
            }, status=status.HTTP_201_CREATED
        )
    return Response({
        'message': 'Something went wrong, please try again.', 
        'serializer_data': serializer.data, 
        'serializer_errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['GET', 'POST'])
def trainer_update(request, id):
    """Display and update a trainer"""
    try:
        trainer = Trainer.objects.get(id=id)
    except Trainer.DoesNotExist as error:
        return Response(f'{error}', status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TrainerSerializer(trainer, many=False)
        return Response(serializer.data)

    serializer = TrainerSerializer(instance=trainer, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Trainer was updated succesfully!', 
            'serializer_data': serializer.data
            }
        )
    return Response({
        'message': 'Something went wrong, please try again.', 
        'serializer_data': serializer.data, 
        'serializer_errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['GET', 'DELETE'])
def trainer_delete(request, id):
    """Display and delete a trainer"""
    try:
        trainer = Trainer.objects.get(id=id)
    except Trainer.DoesNotExist as error:
        return Response(f'{error}', status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TrainerSerializer(trainer, many=False)
        return Response(serializer.data)

    trainer.delete()
    return Response('Trainer was deleted successfully.', 
        status=status.HTTP_204_NO_CONTENT
    )

@api_view(['GET'])
def subject_list(request):
    """Display all subjects"""
    subjects = Subject.objects.all()
    serializer = SubjectSerializer(subjects, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def subject_create(request):
    """Create a subject"""
    serializer = SubjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Subject was created successfully!',
            'serializer_data': serializer.data,
            }, status=status.HTTP_201_CREATED
        )
    return Response({
        'message': 'Something went wrong, please try again.',
        'serializer_data': serializer.data,
        'serializer_errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['GET', 'POST'])
def subject_update(request, id):
    """Display and update a subject"""
    subject = get_object_or_404(Subject, pk=id)

    if request.method == 'GET':
        serializer = SubjectSerializer(subject, many=False)
        return Response(serializer.data)

    serializer = SubjectSerializer(instance=subject, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Subject was updated successfully!',
            'serializer_data': serializer.data 
            }
        )
    return Response({
        'message': 'Something went wrong, please try again!',
        'serializer_data': serializer.data,
        'serializer_errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['GET', 'DELETE'])
def subject_delete(request, id):
    """Display and delete a subject"""
    subject = get_object_or_404(Subject, pk=id)

    if request.method == 'GET':
        serializer = SubjectSerializer(subject, many=False)
        return Response(serializer.data)

    subject.delete()
    return Response('Subject was deleted successfully.',
        status=status.HTTP_204_NO_CONTENT
    )    
