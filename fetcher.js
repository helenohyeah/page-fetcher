const request = require('request');
const fs = require('fs');
const readline = require('readline');

const stdin = process.stdin;
const stdout = process.stdout;
stdin.setRawMode(true);
stdin.setEncoding('utf8');

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

const userInput = process.argv.slice(2);
const url = userInput[0];
const path = userInput[1];

// ask user for input to overwrite or exit program
const askUser = (question, path, body) => {
  rl.question(question, (answer) => {
    if (answer.toLowerCase() === 'y') {
      fs.writeFile(path, body, () => {
        console.log('File contents overwritten');
        process.exit();
      });
    } else if (answer.toLowerCase() === 'n') {
      process.exit();
    } else {
      askUser('Invalid entry. Overwrite? (Y/N): ', path, body);
    }
  });
};

request(url, (error, response, body) => {
  // checks for errors
  if (error) {
    console.log('ERROR:', error.code);
    process.exit();
  }

  // checks status code
  if (response.statusCode !== 200) {
    console.log('Something went wrong :(', response.statusText);
    process.exit();
  }

  // check if dir exists
  fs.stat(path, (err, stats) => {
    if (err) {
      console.log('Invalid local path');
      process.exit();
    }
  });

  // check if file exists
  fs.access(path, (err) => {
    if (err) { // file doesn't exist case => copy file
      fs.writeFile(path, body, () => {
        console.log('File contents successfully copied');
        process.exit();
      });
    } else { // file exists case => ask to overwrite
      askUser('File already exists. Overwrite? (Y/N): ', path, body);
    }
  });
});