const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// const writeAsync = util.promisify(fs.writeFile);

// questions.employeeQuestions()
// question.managerQuestion()

let chosedRole = "Manager"
let chosenName = "officeNumber";
let chosenMessage = "Office Number:";

const questions = {
  employeeQuestions: () => {
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Name:",
      },
      {
        type: "input",
        name: "id",
        message: "ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Email:",
      },
      {
        type: "input",
        name: chosenName,
        message: chosenMessage,
      },
      {
        type: "list",
        name: "listChoice",
        message: "Which license type are you using?:",
        choices: ["Engineer", "Intern", "End"],
      }
    ]).then((response) => {
      switch (response.listChoice) {
        case "Engineer":
          chosenName = questions.engineerQuestion.name;
          chosenMessage = questions.engineerQuestion.message;
          team.push(new Intern("calvin", "UT Austin"));
          questions.employeeQuestions();
          break;
        case "intern":
           chosenName = questions.internQuestion.name;
           chosenMessage = questions.engineerQuestion.message;
           team.push(new Intern("calvin", "UT Austin"));
           questions.employeeQuestions();
           break;
        default:
          return render();
      }
    });
  },
  managerQuestion:
  {
    role: "Manager",
    name: "officeNumber",
    message: "Office Number:",
  },
  engineerQuestion:
  {
    role:"Engineer",
    name: "github",
    message: "Github:",
  },
  internQuestion:
  {
    role: "Intern",
    name: "school",
    message: "School",
  }
},

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
