const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager";
  }
}

const davey = new Manager("Davey", 120, "davey@gmail.com", 100); // example
console.log(davey.getRole());
console.log(davey.getEmail());

module.exports = Manager;
