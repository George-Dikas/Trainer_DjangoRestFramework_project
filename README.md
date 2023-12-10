# Trainer_DjangoRestFramework_project
## Description
Trainer_DjangoRestFramework_project is consist of two applications:
1) rest_api was created with Django Rest Framework and provides Crud operations for trainers and subjects.
2) ajax_app is a Django application that sends API request to rest_api application for trainers CRUD perposes and also receives Api responses.     
## Technologies
* Django 4.2.7
* Django Rest Framework 3.14.0
* Django-crispy-forms 1.14.0
* Bootstrap 4.6.2
* Font-awesome 5.11.2
## Use Project Locally:
* Project Folder and Virtual Environment:		
  - Open Visual Studio Code
  - Launch Profile/Command Prompt																										
  - Go to this path: C:\Users\User\Desktop																					
  - Create a folder for the project: C:\Users\User\Desktop>mkdir Trainer_DRF_project							
  - Get inside the folder: C:\Users\User\Desktop>cd Trainer_DRF_project																							
  - Create a Virtual Environment with name myenv: C:\Users\User\Desktop\Trainer_DRF_project>python -m venv myenv					
  - Activate Virtual Environment: C:\Users\User\Desktop\Trainer_DRF_project>myenv\Scripts\activate										
* Clone Project OR:                                                                                                                     									
  - (myenv) C:\Users\User\Desktop\Trainer_DRF_project>git clone https://github.com/George-Dikas/Trainer_DjangoRestFramework_project.git
  - Change folder's name Trainer_DjangoRestFramework_project inside the Trainer_DRF_project	folder into trainer_drf_project			
  - (myenv) C:\Users\User\Desktop\Trainer_DRF_project>cd trainer_drf_project	
* Download Project:
  - Code/Download Zip
  - Extract folder and put it into Virtual Environment myenv
  - Change folder's name Trainer_DjangoProject-master into trainer_drf_project
  - (myenv) C:\Users\User\Desktop\Trainer_DjangoProject>cd trainer_drf_project
* Run Project: 
  - Install all requirments for the project: 
    (myenv) C:\Users\User\Desktop\Trainer_DRF_project\trainer_drf_project>pip install -r requirements.txt
  - Begin your local server: 
    (myenv) C:\Users\User\Desktop\Trainer_DRF_project\trainer_drf_project>python manage.py runserver
  - For rest_api urls look at rest_api.urls.py file
  - Type into your browser for ajax_app side: 127.0.0.1:8000/ajax_app/trainer_list/
