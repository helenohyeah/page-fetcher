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
const localPath = userInput[1];

const askUser = (question, localPath, body) => {
  rl.question(question, (answer) => {
    if (answer.toLowerCase() === 'y') {
      fs.writeFile(localPath, body, () => {
        console.log('File contents overwritten');
        process.exit();
      });
    } else if (answer.toLowerCase() === 'n') {
      process.exit();
    } else {
      askUser('Invalid entry. Overwrite? (Y/N): ', localPath, body);
    }
  });
};

request(url, (error, response, body) => {
  // check if file exists
  fs.access(localPath, (err) => {
    if (err) { // file doesn't exist case
      fs.writeFile(localPath, body, () => {
        console.log('File contents successfully copied');
        process.exit();
      });
    } else { // file exists case
      askUser('File already exists. Overwrite? (Y/N): ', localPath, body);
    }
  });
});