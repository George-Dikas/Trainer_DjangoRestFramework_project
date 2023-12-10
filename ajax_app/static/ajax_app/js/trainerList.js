$(document).ready(function() {
    // Prepare rest_api url for API call, to populate the trainers' list
    var url = '/rest_api/trainer_list/'
    last_part = window.location.href.split("/").pop();
    
    
    // If current url of ajax_app is something like this: /ajax_app/trainers_list/?page=2
    // prepare rest_api url like this: /rest_api/trainers_list/?page=2 
    if (last_part != '') {
        url += last_part
    }

    $.ajax({
        method: 'GET',
        url: url,

        success: function(data) { 
            // Populate list with trainers 
            for (let trainer in data['results']) {
                $('table').find('tbody').append(
                    `<tr>
                        <td>${data['results'][trainer].lastname}</td>
                        <td>${data['results'][trainer].firstname}</td>
                        <td>${data['results'][trainer].phone}</td>
                        <td>${data['results'][trainer].subject}</td>
                        <td>
                            <a class="text-success"
                            href="/ajax_app/trainer_update/${data['results'][trainer].id}/"> 
                                <i class="fas fa-user-edit"></i>
                            </a>                    
                            <a class="delete" data-toggle="modal" data-target="#deleteTrainer"
                            href="/rest_api/trainer_delete/${data['results'][trainer].id}/"> 
                                <i class="fas fa-user-slash text-danger"></i>
                            </a>
                        </td>
                    </tr>`
                ); 
            }
            
            // If rest_api returns more than 1 pages, make pagination in ajax_app
            if (data.total_pages > 1) {
                $('body').append(
                    '<ul class="pagination justify-content-center fixed-bottom"></ul>'
                );

                if(data.previous) {
                    $('.pagination').append(
                        `<li class="page-item"> 
                            <a class="page-link" href="${data.previous}">Previous</a>
                        </li>`
                    );
                }

                else {
                    $('.pagination').append(
                        `<li class="page-item disabled"> 
                            <a class="page-link">Previous</a>
                        </li>`
                    );
                }

                for(let i in data.range) {
                    if (data.range[i] == data.current_page_number) {
                        $('.pagination').append(
                            `<li class="page-item active" aria-current="page"> 
                                <a class="page-link" 
                                href="${data.current_path}">${data.range[i]}</a>
                            </li>`
                        );
                    }

                    else {
                        $('.pagination').append(
                            `<li class="page-item"> 
                                <a class="page-link" 
                                href="/rest_api/trainer_list/?page=${data.range[i]}">${data.range[i]}</a>
                            </li>`
                        );
                    }
                } 

                if(data.next) {
                    $('.pagination').append(
                        `<li class="page-item"> 
                            <a class="page-link" href="${data.next}">Next</a>
                        </li>`
                    );
                }

                else {
                    $('.pagination').append(
                        `<li class="page-item disabled"> 
                            <a class="page-link">Next</a>
                        </li>`
                    );
                }

                // Access of Pagination
                $('.page-link').click(function(e) {
                    e.preventDefault();
                    url = $(this).attr('href').replace('rest_api', 'ajax_app');
                    window.location.replace(url);
                });
            } 

            $('.delete').click(function() {
                // Get the url of delete button and its node
                url = $(this).attr('href');
                thisRow = $(this).parent().parent();
                
                // Push modal's delete button
                $('#deleteBtn').click(function(e) {
                    trainerDelete(url, thisRow);
                    $("#deleteTrainer .close").click(); 
                });
            });
        },

        error: function(XMLHttpRequest) { 
            alert(XMLHttpRequest.status + ': ' + XMLHttpRequest.statusText); 
        } 
    }) 
    
    // Api call to delete a particular trainer
    function trainerDelete(url, thisRow) {
        $.ajax({
            method: 'DELETE',
            url: url,
            
            success: function() {
                $('#warning').remove();
                thisRow.remove();

                $('.jumbotron').prepend(
                    '<div class="alert alert-warning alert-dismissible fade show"' +
                    'id="warning" style="margin-bottom: 0px;" role="alert">' + 
                        'Trainer was deleted successfully.' +
                        '<button type="button" class="close" data-dismiss="alert"' +
                        'aria-label="Close"><span aria-hidden="true">&times;</span>' +
                        '</button>' +
                    '</div>');

                $('#warning').fadeOut(15000);
            },

            error: function() {
                alert('Something went wrong with deletion.');
            }
        })
    }
});