const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

let currentRole = "Manager";
let currentName = "officeNumber";
let currentMessage = "What is the Office Number for this Manager?";

console.log("Answer the questions to enter information for your Employee's.");
console.log("The first round of questions will be for your Manager.");

const questions = {
  employeeQuestions: () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: `What is the name of this ${currentRole}?`,
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
        {
          type: "input",
          name: "id",
          message: `What is the ID number for this ${currentRole}?`,
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          },
        },
        {
          type: "input",
          name: "email",
          message: `What is th email for this ${currentRole}?`,
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "uniqueQuestion",
          message: currentMessage,
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
        {
          type: "list",
          name: "listChoice",
          message: "Which employee type will you enter next?",
          choices: ["Engineer", "Intern", "Print Summary"],
        },
      ])
      .then((answers) => {
        const newEmployee = roleSelector(
          answers.name,
          answers.id,
          answers.email,
          answers.uniqueQuestion
        );

        teamMembers.push(newEmployee);

        switch (answers.listChoice) {
          case "Engineer":
            currentRole = questions.engineerQuestion.role;
            currentName = questions.engineerQuestion.name;
            currentMessage = questions.engineerQuestion.message;
            questions.employeeQuestions();
            break;
          case "Intern":
            currentRole = questions.internQuestion.role;
            currentName = questions.internQuestion.name;
            currentMessage = questions.internQuestion.message;
            questions.employeeQuestions();
            break;
          default:
            console.log(
              "Look in the output folder for your Employee Team Summary page."
            );
            questions.createOutput();
            break;
        }
      });
  },
  engineerQuestion: {
    role: "Engineer",
    name: "github",
    message: "What is the github adress for your Engineer?:",
  },
  internQuestion: {
    role: "Intern",
    name: "school",
    message: "Which school is your Intern from?",
  },
  createOutput() {
    if (!fs.existsSync(OUTPUT_DIR, "output")) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  },
};

function roleSelector(name, id, email, uniqueQuestion) {
  switch (currentRole) {
    case "Engineer":
      return new Engineer(name, id, email, uniqueQuestion);
    case "Intern":
      return new Intern(name, id, email, uniqueQuestion);
    default:
      return new Manager(name, id, email, uniqueQuestion);
  }
}

questions.employeeQuestions();

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
