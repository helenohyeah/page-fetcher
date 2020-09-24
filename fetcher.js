const request = require('request');
const fs = require ('fs');
// const stdin = process.stdin;
// const stdout = process.stdout;
// stdin.setRawMode(true);
// stdin.setEncoding('utf8');

// const rl = readline.createInterface({
//   input: stdin,
//   output: stdout
// });

const userInput = process.argv.slice(2);
const url = userInput[0];
const localPath = userInput[1];

// const askUser = (localPath, body) => {
//   rl.question('File already exists. Overwrite? (Y/N)')
  
//   stdin.resume();
//   stdout.write(`The file already exists. Overwrite? (Y/N): `);
//   stdin.on('data', (data) => {
//     if (data === 'y') {
//       // overwrite file
//       fs.writeFile(localPath, body, () => {
//       console.log('Overwrite successful');
//       });
//     }
//     if (data === 'n') process.exit();
//   })
// };


request(url, (error, response, body) => {

  fs.access(localPath, (err) => {
    if (err) {
      fs.writeFile(localPath, body, () => {
      console.log('File contents successfully copied');
      });
    } else {
      fs.writeFile(localPath, body, () => {
      console.log('File contents overwritten');
      });
    }
    // } else {
    //   askUser(localPath, body);
    // }
  });
});


//   // writes contents to file
//   fs.writeFile(path, content, () => {
//   console.log('File contents successfully copied');
//   });
// });


// request(url, (error, response, body) => {
//   fs.writeFile(localPath, body, () => {
//     if (localPath) {
//       askUser();
//       if (askUser() === false) process.exit();
//     }
//     console.log(`File contents copied into ${localPath}`);
//   })
// })

// fs.readFile(localPath, 'utf8', (err, data) => {
//   // console.log(data);
//   print(data);
// });

// const print = (data) => console.log(data);
// console.log('url', url, ', local path', localPath);
