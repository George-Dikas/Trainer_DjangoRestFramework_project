from django.db import models
from django.core.validators import RegexValidator


class Subject(models.Model):
    title = models.CharField(max_length=20)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class Trainer(models.Model):
    __alphabetic_char = RegexValidator(r'^[a-zA-Z]*$', 
                                        'You can insert only letters.')
    firstname = models.CharField(max_length=30, validators=[__alphabetic_char])
    lastname = models.CharField(max_length=30, validators=[__alphabetic_char])
    phone = models.IntegerField()
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT)

    class Meta:
        ordering = ['lastname', 'firstname', 'subject']

    def __str__(self):
        return self.lastname + ' ' + self.firstname
