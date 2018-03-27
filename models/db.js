const faker = require("faker");

const NUM = 30;
let users = [];

for (let i=0; i<NUM; i++) {
  let name = faker.name.findName();
  // the email replaces whitespace with blank
  let person = {
    name: name,
    email: name.replace(/\s/g, "") + "@student.unimelb.edu.au"
  };
  users.push(person);
}

module.exports = users;