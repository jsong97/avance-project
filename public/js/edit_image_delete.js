$(document).ready(function(){
  $('.delete-image').on('click', function(e){
    $target = $(e.target);
    const imageId = $target.attr('data-id');
    const project_id = $target.attr('data-project');
    // const id = $target.attr('data-id');
    // const project_id = $target.attr('')
    $.ajax({
      type: 'DELETE',
      url: '/image/'+ project_id + '/' + imageId + '/edit',
      success: function(response){
        alert('Deleting Image');
        window.location.href= '/image/'+ project_id;
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});
