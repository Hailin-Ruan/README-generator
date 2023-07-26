const fs = require('fs');
const inquirer = require('inquirer');

async function promptUser() {
    let inquirer;
  try {
    inquirer = (await import('inquirer')).default;
  } catch (err) {
    inquirer = require('inquirer');
  }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of your project:',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description of your project:',
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Enter installation instructions:',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter usage instructions:',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Choose a license for your project:',
            choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'None'],
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Enter guidelines for contributing:',
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Enter test instructions:',
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address:',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username:',
        },
    ]);
}

function generateREADME(answers) {
    return `
# ${answers.title}

${renderLicenseBadge(answers.license)}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${renderLicenseNotice(answers.license)}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
For any questions, please contact ${answers.name} via:
- Email: ${answers.email}
- GitHub: [${answers.github}](https://github.com/${answers.github})
`;
}

function renderLicenseBadge(license) {
    if (!license) return '';

    const licenseBadge = `[![License](https://img.shields.io/badge/license-${encodeURIComponent(license)}-green)](https://opensource.org/licenses/${encodeURIComponent(license)})`;
    return licenseBadge;
}

function renderLicenseNotice(license) {
    if (!license) return 'This application is not covered under any license.';

    return `This application is covered under the ${license} license.`;
}

async function init() {
    try {
        console.log('Please enter the title of your project:');
        const { title } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
            }
        ]);

        console.log('\nPlease answer the following questions to generate the README.md file:\n');
        const answers = await promptUser();
        const readmeContent = generateREADME({ ...answers, title });
        fs.writeFileSync('README.md', readmeContent);
        console.log('README.md file successfully generated!');
    } catch (err) {
        console.error('Error generating README.md:', err);
    }
}

init();