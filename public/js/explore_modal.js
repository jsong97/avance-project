$('.openBtn').on('click',function(){
  $('.modal-body').load('/explore/5/5',function(){
    $('#myModal').modal({show:true});
    console.log("hi");
  });
});
