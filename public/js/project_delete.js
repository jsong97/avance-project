$(document).ready(function(){
  $('.delete-project').on('click', function(e){
    $target = $(e.target);
    const project_id = $target.attr('data-id');
    const username = $target.attr('data-name');
    console.log(project_id);
    console.log(username);
    $.ajax({
      type: 'DELETE',
      url: '/' + username + '/' + project_id,
      success: function(response){
        alert('Deleting Image');
        window.location.href= '/'+ username;
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
