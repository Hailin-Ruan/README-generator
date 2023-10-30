// packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

// questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Provide a brief description of your project:",
  },
  {
    type: "input",
    name: "installation",
    message: "What are the steps required to install your project?",
  },
  {
    type: "input",
    name: "usage",
    message: "Provide instructions and examples for use:",
  },
  {
    type: "input",
    name: "contributing",
    message: "How can other developers contribute to your project?",
  },
  {
    type: "input",
    name: "tests",
    message: "Provide examples on how to run tests for your application:",
  },
  {
    type: "list",
    name: "license",
    message: "Choose a license for your project:",
    choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3-Clause", "None"],
  },
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub username:",
  },
  {
    type: "input",
    name: "email",
    message: "Enter your email address:",
  },
];

// write README file
function writeToFile(fileName, data) {
    fs.writeFileSync(fileName, data);
}

// initialize app
function init() {
    inquirer
    .prompt(questions)
    .then((answers) => {
      const markdownContent = generateMarkdown(answers);
      writeToFile('README.md', markdownContent);
      console.log('README.md successfully generated!');
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function call to initialize app
init();
