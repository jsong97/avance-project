var modal = document.getElementById('myModal');

// Get the button that opens the modal
var all_projects = document.querySelectorAll("#myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal

all_projects.forEach(function(project){
  // // will implement this when we have databases
  // project.addEventListener('click', function(){
  //
  //   // var project_id = this.getAttribute('project-id');
  // })

  project.onclick = function() {
    modal.style.display = "block";
  }
});

// btn.onclick = function() {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
