from django.shortcuts import render
from .forms import TrainerForm


def trainer_list(request):
    """Diplay the trainer list page after API call"""
    data = {}
    data['title_tag'] = data['logo'] = 'List of Trainers'
    return render(request, 'ajax_app/trainer_list.html', data)

def trainer_create(request):
    """Display the trainer's registration page"""
    data={}
    data['title_tag'] = data['logo'] = 'Trainer Registration'
    data['button_tag'] = 'Submit'
    data['form'] = TrainerForm()
    return render(request, 'ajax_app/trainer_form.html', data)

def trainer_update(request, id):
    """Display the trainer's update page"""
    data={}
    data['title_tag'] = data['logo'] = 'Trainer Update'
    data['button_tag'] = 'Update'
    data['form'] = TrainerForm()
    return render(request, 'ajax_app/trainer_form.html', data)
