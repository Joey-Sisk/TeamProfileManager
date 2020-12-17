class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    
  }

  getRole() {
    return "Employee";
  }
}



// ---------------------------------

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    return "Manager";
  }
}

const manager = new Manager(100, "sue@gmail.com", "Susan", 100);
console.log(manager.getRole());


/* 
1 manager
0 to many engineers
0 to many interns

team = [
  new Manager(),
  new Engineer()
  new Engineer1()
  new Intern()
]

3 prompts , seperate questions

prompt({
  "what is your name", 
  "..."
  "which type of team member would you like to add?"
}).then(managerChoice => {

  if user selects engineers
    ask engineer questions => promptEngineer()
  else if user selects interns
    ask intern questions
  else
    render html (there is a render method)
});

promptEngineer({
  [

  ]
}).then(engineerResponse => {
  if user selects engineers
    ask engineer questions => promptEngineer()
  else if user selects inters
    ask intern questions
  else
    render html (there is a render method)
});

function askIntern() {
  inquirer.promt([

  ]).then(internResponse => {
    name, school

    team.push(new Intern("calvin", "UT Austin"));
  });
}
*/

