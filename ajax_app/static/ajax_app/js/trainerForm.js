$(document).ready(function() {
    // Populate Select input with subjects from API
    fetch('/rest_api/subject_list')
    .then((resp) => resp.json())
    .then(function(data) {
        for (let i in data) {
            $('#id_subject').append(
                `<option value="${data[i].title}"> ${data[i].title} </option>`
            ); 
        }
    })

    // If Trainer-Creation, prepare the corresponding Trainer-Creation url of API 
    if (window.location.pathname.split('/')[2] == 'trainer_create') {
        var url = '/rest_api/trainer_create/';
    }

    // Else Trainer-Update, so prepare the corresponding Trainer-Update url of API
    else {
        var urlPartId = window.location.pathname.split('/')[3];
        var url = '/rest_api/trainer_update/' + urlPartId + '/';
        
        // Get particular trainers' data and populate the form
        $.ajax({
            method: 'GET',
            url: url,

            success: function(trainer) {
                $('#id_lastname').val(trainer.lastname); 
                $('#id_firstname').val(trainer.firstname); 
                $('#id_phone').val(trainer.phone); 
                $('#id_subject').val(trainer.subject).change();
            },

            // In case of invalid id - There is no trainer with this id
            error: function(XMLHttpRequest) {
                $("form :input").prop("disabled", true);

                $('.jumbotron').append(
                    '<div class="alert alert-danger alert-dismissible fade show"' +
                    'id="error" style="margin-top: 15px;" role="alert">' + 
                        XMLHttpRequest.responseText +
                        '<button type="button" class="close" data-dismiss="alert"' +
                        'aria-label="Close"><span aria-hidden="true">&times;</span>' +
                        '</button>' +
                    '</div>'
                );

                $('#error').fadeOut(15000);
            }
        })
    }

    // Submit a new trainer or update a existing trainer
    $('#submitBtn').click(function(e) {
        e.preventDefault();

        // Initialize the Inputs' Dom Before the validation
        $('input').removeClass('is-invalid').siblings('p').remove();
        $('#div_id_lastname').css('margin-bottom', '16px');
        $('#div_id_firstname').css('margin-bottom', '16px');
        $('#div_id_phone').css('margin-bottom', '16px');
        
        // Serialize the form and make the API call for trainer creation or 
        // trainer update
        var form = $('form').serializeArray();
        var dataForm = {}

        for (let i in form) {
            dataForm[form[i].name] = form[i].value
        }
        
        $.ajax({
            method: 'POST',
            url: url,
            data: JSON.stringify(dataForm), 
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },

            success: function(data) { 
                // Reset form after creation
                if (url == '/rest_api/trainer_create/') {
                    $('form').trigger('reset');
                }

                // Delete previous messages
                $('#success').remove();
                $('#error').remove();
                
                $('.jumbotron').append(
                    '<div class="alert alert-success alert-dismissible fade show"' +
                    'id="success" style="margin-top: 15px;" role="alert">' + 
                        data.message +
                        '<button type="button" class="close" data-dismiss="alert"' +
                        'aria-label="Close"><span aria-hidden="true">&times;</span>' +
                        '</button>' +
                    '</div>'
                );

                $('#success').fadeOut(15000);
            },

            error: function(XMLHttpRequest) { 
                // Delete previous messages
                $('#success').remove();
                $('#error').remove();

                if (XMLHttpRequest.responseJSON.serializer_errors.lastname) {
                    $('#id_lastname').addClass('is-invalid').after(
                        '<p class="invalid-feedback" style="margin: 0px 2px;">' +
                            '<stong>' +
                                XMLHttpRequest.responseJSON.serializer_errors.lastname +
                            '</strong>' +
                        '</p>'
                    );
        
                    $('#div_id_lastname').css('margin-bottom', '0px');
                }
                
                if (XMLHttpRequest.responseJSON.serializer_errors.firstname) {
                    $('#id_firstname').addClass('is-invalid').after(
                        '<p class="invalid-feedback" style="margin: 0px 2px;">' +
                            '<stong>' + 
                                XMLHttpRequest.responseJSON.serializer_errors.firstname +
                            '</strong>' +
                        '</p>'
                    );
    
                    $('#div_id_firstname').css('margin-bottom', '0px');
                }

                if (XMLHttpRequest.responseJSON.serializer_errors.phone) {
                    $('#id_phone').addClass('is-invalid').after(
                        '<p class="invalid-feedback" style="margin: 0px 2px;">' +
                            '<stong>' + 
                                XMLHttpRequest.responseJSON.serializer_errors.phone +
                            '</strong>' +
                        '</p>'
                    );
    
                    $('#div_id_phone').css('margin-bottom', '0px');
                }

                $('.jumbotron').append(
                    '<div class="alert alert-danger alert-dismissible fade show"' +
                    'id="error" style="margin-top: 9px;" role="alert">' + 
                        XMLHttpRequest.responseJSON.message +
                        '<button type="button" class="close" data-dismiss="alert"' +
                        'aria-label="Close"><span aria-hidden="true">&times;</span>' +
                        '</button>' +
                    '</div>');

                $('#error').fadeOut(15000);
            } 
        }) 
    });

    // Get the CSRF_Token for post method of form
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});