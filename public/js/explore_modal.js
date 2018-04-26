var projectModals = document.querySelectorAll('.openBtn');
const numModals = projectModals.length;

for (var i=0; i<numModals; i++){
  let count = i;
  projectModals[count].addEventListener('click', function(){
    switch(projectModals[count].getAttribute("id")){
      case "explore_proj_1":
        $('.modal-body').load('/explore/1/1',function(){
          $('#myModal').modal({show:true});
        });
        break;
      case "explore_proj_2":
        $('.modal-body').load('/explore/1/2',function(){
          $('#myModal').modal({show:true});
        });
        break;
      case "explore_proj_3":
        $('.modal-body').load('/explore/1/3',function(){
          $('#myModal').modal({show:true});
        });
        break;
      case "explore_proj_4":
        $('.modal-body').load('/explore/1/4',function(){
          $('#myModal').modal({show:true});
        });
        break;
      case "explore_proj_5":
        $('.modal-body').load('/explore/1/5',function(){
          $('#myModal').modal({show:true});
        });
        break;
      case "explore_proj_6":
        $('.modal-body').load('/explore/1/6',function(){
          $('#myModal').modal({show:true});
        });
        break;
      case "explore_proj_7":
        $('.modal-body').load('/explore/1/7',function(){
          $('#myModal').modal({show:true});
        });
        break;
      case "explore_proj_8":
        $('.modal-body').load('/explore/1/8',function(){
          $('#myModal').modal({show:true});
        });
        break;
      case "explore_proj_9":
        $('.modal-body').load('/explore/1/9',function(){
          $('#myModal').modal({show:true});
        });
        break;
    }
  });
}


// $('.openBtn').on('click',function(){
//   if ($("box1")){
//     $('.modal-body').load('/explore/1/5',function(){
//       $('#myModal').modal({show:true});
//       console.log("hi");
//     });
//   }
//   console.log($('openBtn').getAttribute("id"));
// });
