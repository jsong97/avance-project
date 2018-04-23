function User(firstName, lastName, userName, accountType){
  this.firstName = firstName;
  this.lastName = lastName;
  this.userName = userName;
  this.accountType = accountType;
}

User.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
}

var jsong = new User("Justin", "Song", "jsong97", "Premium");
var user_fullName = jsong.fullName();

var project_author = document.querySelector("#project-image-author");
project_author.innerHTML = "by " + user_fullName;


function Admins() {
  var admins = ["Kathy Teo", "Lingshen Luo", "Justin Song"];
  return {
    getAdmins: function() {
      return admins;
    },
    addAdmin: function(newAdmin) {
      admins.push(newAdmin);
    }
  }
}

var websiteAdmins = new Admins();
websiteAdmins.getAdmins();
websiteAdmins.addAdmins("Niels");
console.log(websiteAdmins.getAdmins());
