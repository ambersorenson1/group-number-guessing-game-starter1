const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}

let theNumber = randomNumber(1, 25);
console.log(theNumber);
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

app.post('/guess', (req, res) => {
  console.log('the number', theNumber);
  console.log(req.body);
  let correctAnswers = [];
  let incorrectAnswers = [];
  // // 🌈🌈🌈🌈🌈 What do you see if you run: 🌈🌈🌈🌈🌈
  // console.log(req.body);
  //   // -Matt :)
  // for(let guess of req.body){
    // if(guess.number === theNumber){
    //   correctAnswers.push(req.body.indexOf(guess));
    // }else if (guess.number > theNumber) {
    //   incorrectAnswers.push('Guess too high'); 
    // }else{
    //   incorrectAnswers.push('Guess too low');
    // }
  // }
  // if(correctAnswers.length > 0){
  // res.send('The correct answers are: ', correctAnswers);
  // }else{
  // res.send(incorrectAnswers);
  // }
  // res.send(req.body);
// });

console.log('Guess 1:', req.body.number1);

if(req.body.number1 == theNumber){
  correctAnswers.push(req.body.number1)
}else if (req.body.number1 > theNumber) {
  incorrectAnswers.push('Guess too high'); 
}else{
  incorrectAnswers.push('Guess too low');
}

if(req.body.number2 == theNumber){
  correctAnswers.push(req.body.number2)
}else if (req.body.number2 > theNumber) {
  incorrectAnswers.push('Guess too high'); 
}else{
  incorrectAnswers.push('Guess too low');
}

if(req.body.number3 == theNumber){
  correctAnswers.push(req.body.number3)
}else if (req.body.number3 > theNumber) {
  incorrectAnswers.push('Guess too high'); 
}else{
  incorrectAnswers.push('Guess too low');
}

if(req.body.number4 == theNumber){
  correctAnswers.push(req.body.number4)
}else if (req.body.number4 > theNumber) {
  incorrectAnswers.push('Guess too high'); 
}else{
  incorrectAnswers.push('Guess too low');
}

// console.log('correct answers are:', correctAnswers);
// console.log('incorrect answers are:', incorrectAnswers);

if(correctAnswers.length > 0){
  console.log('The correct answers are: ', correctAnswers);
  res.send({response: 'The correct answers are: ', correctAnswers});
  }else{
   res.send(incorrectAnswers);
  }
});


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
