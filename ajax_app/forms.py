from django import forms


class TrainerForm(forms.Form):
    firstname = forms.CharField(label='Firstname', max_length=30)
    lastname = forms.CharField(label='Lastname', max_length=30)
    phone = forms.IntegerField()
    subject = forms.ChoiceField()
