from .models import Subject, Trainer
from rest_framework import serializers


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

    def validate_title(self, title):
        """Unique subject's validation"""
        if Subject.objects.filter(title=title):
            raise serializers.ValidationError(
                f'There is already a subject with title {title}.' 
            )
        return title 


class SubjectRelatedField(serializers.RelatedField):
    def display_value(self, instance):
        """Defines how a subject is displayed in the front-end"""
        return instance

    def to_representation(self, value):
        """Defines how a subject is displayed in the output JSON or XML"""
        return str(value)

    def to_internal_value(self, data):
        """Getting an object Subject for the given value"""
        return Subject.objects.get(title=data)


class TrainerSerializer(serializers.ModelSerializer):
    subject = SubjectRelatedField(queryset=Subject.objects.all(), many=False)

    class Meta:
        model = Trainer
        fields = ('id', 'lastname', 'firstname', 'subject', 'phone')
