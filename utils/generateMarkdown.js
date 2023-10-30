// returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license) {
    return `![License](https://img.shields.io/badge/License-${license}-brightgreen)`;
  }
  return "";
}

// returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license) {
    return `[License](https://opensource.org/licenses/${license})`;
  }
  return "";
}

// returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license) {
    return `This project is licensed under the ${license} license. Click the [License](https://opensource.org/licenses/${license}) for more details.`;
  }
  return "";
}

// generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
  
  ${renderLicenseBadge(data.license)}
  
  ## Description
  ${data.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  ${renderLicenseLink(data.license) ? `\n- [License](#license)` : ""}
  
  ## Installation
  ${data.installation}

  ## Usage
  ${data.usage}

  ## Contributing
  ${data.contributing}

  ## Tests
  ${data.tests}

  ## Questions
  For any questions, please contact me using the information below:

  GitHub: [${data.github}](https://github.com/${data.github})

  Email: ${data.email}

  ${renderLicenseSection(data.license)}
`;
}

module.exports = generateMarkdown;
