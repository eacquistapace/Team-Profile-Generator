const inquirer = require("inquirer");
const fs = require("fs");
const jest = require("jest");
const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const dataWrite = require("./src/data");
const DelPath = "./dist/index.html";

const EngArray = [];
const IntArray = [];
const ManArray = [];

async function newEmployee() {
  await inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What type of employee would you like to add?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then((response) => promptSelector(response));
}

function promptSelector(result) {
  if (result.role === "Manager") {
    addManager();
  } else if (result.role === "Engineer") {
    addEngineer();
  } else {
    addIntern();
  }
}

async function addManager() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the manager's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the manager's email address?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is this manager's office number?",
      },
    ])
    .then((response) => newMan(response));
}

async function addEngineer() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the engineer's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the engineer's email address?",
      },
      {
        type: "input",
        name: "github",
        message: "What is this engineer's GitHub username?",
      },
    ])
    .then((response) => newEng(response));
}

async function addIntern() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is the intern's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is the intern's email address?",
      },
      {
        type: "input",
        name: "school",
        message: "Which school did this intern attend?",
      },
    ])
    .then((response) => newInt(response));
}

function newMan(v) {
  const Man = new Manager(v.name, v.id, v.email, v.officeNumber);
  console.log(Man);
  ManArray.push(Man);
  another();
}

function newEng(v) {
  const Eng = new Engineer(v.name, v.id, v.email, v.github);
  console.log(Eng);
  EngArray.push(Eng);
  another();
}

function newInt(v) {
  const Int = new Intern(v.name, v.id, v.email, v.school);
  console.log(Int);
  IntArray.push(Int);
  another();
}

async function another() {
  await inquirer
    .prompt([
      {
        type: "confirm",
        name: "bin",
        message: "Would you like to add another employee?",
      },
    ])
    .then((response) => checkIf(response));
}

function checkIf(x) {
  if (x.bin === true) {
    newEmployee();
  } else {
    pageMaker()
      .then(AppendManCard())
      .then(AppendEngCard())
      .then(AppendIntCard())
      .then(FinishIt());
  }
}
async function pageMaker() {
  try {
    fs.unlinkSync(DelPath);
  } catch (err) {
    console.error(err);
  }
  // Pushes html template to new create new html file
  let bplate = dataWrite.boilerplateGen();
  fs.writeFileSync(__dirname + "/dist/index.html", bplate, (err) => {
    if (err) console.log(err);
    else {
      console.log("Logged Successfully!");
    }
  });
}
async function AppendManCard() {
  let MGen = dataWrite.ManCardGen(ManArray);
  console.log(ManArray.length);

  if (ManArray.length === 0) {
    console.log("No Data");
  } else {
    console.log("Writing Manager");
    fs.appendFileSync(__dirname + "/dist/index.html", MGen, (err) => {
      if (err) console.log(err);
      else {
        console.log("Manager Card Created");
      }
    });
  }
}
async function AppendEngCard() {
  let EGen = dataWrite.EngCardGen(EngArray);
  console.log(EngArray.length);
  if (EngArray.length === 0) {
    console.log("No Data");
  } else {
    console.log("Writing Engineer");
    fs.appendFileSync(__dirname + "/dist/index.html", EGen, (err) => {
      if (err) console.log(err);
      else {
        console.log("Engineer Card Created");
      }
    });
  }
}
async function AppendIntCard() {
  let IGen = dataWrite.IntCardGen(IntArray);
  console.log(IntArray.length);
  if (IntArray.length === 0) {
    console.log("No Data");
  } else {
    console.log("Writing Intern");
    fs.appendFileSync(__dirname + "/dist/index.html", IGen, (err) => {
      if (err) console.log(err);
      else {
        console.log("Intern Card Created");
      }
    });
  }
}
async function FinishIt() {
  let pageEnd = dataWrite.finalGen();
  fs.appendFileSync(__dirname + "/dist/index.html", pageEnd, (err) => {
    if (err) console.log(err);
    else {
      console.log("All Done!");
    }
  });
}

newEmployee();
