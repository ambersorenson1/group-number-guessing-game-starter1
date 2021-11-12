const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
//Initialize object rounds. The only attribute we use is round. It's not currently working.
let rounds = {round: 0, player1: '', player2: '', player3: '', player4: ''};
//Initialize theNumber randomly to set the target.
let theNumber = randomNumber(1, 25);
//Initialize correctAnswers to an empty array to populate with winners.
let correctAnswers = [];
//Initialize incorrectAnswers to an empty array to populate with too high or too low for losers.
let incorrectAnswers = [];

//Function to randomize number for theNumber.
function randomNumber(min, max){
  return Math.floor(Math.random() * (1 + max - min) + min);
}
//Logging the number so we know which one to choose if we want to test winners.
console.log(theNumber);
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

//Post handling players guesses.
app.post('/guess', (req, res) => {
  console.log('the number', theNumber);
  console.log(req.body);

//Conditional for player 1's guess.
if(req.body.number1 == theNumber){
  //If player 1's guess correct, populate correctAnswer array.
  correctAnswers.push('Player 1 wins!');
}else if (req.body.number1 > theNumber) {
  //If player 1's guess is incorrect, and its too high. Populate incorrectAnswer array.
  incorrectAnswers.push(`Guess ${req.body.number1}, too high`); 
}else{
  //If player 1's guess is incorrect, and its too low. Populate incorrectAnswer array.
  incorrectAnswers.push(`Guess ${req.body.number1}, too low`);
}
//Repeat above logic for other 3 players.
if(req.body.number2 == theNumber){
  correctAnswers.push('Player 2 wins!');
}else if (req.body.number2 > theNumber) {
  incorrectAnswers.push(`Guess ${req.body.number2}, too high`); 
}else{
  incorrectAnswers.push(`Guess ${req.body.number2}, too low`);
}

if(req.body.number3 == theNumber){
  correctAnswers.push('Player 3 wins!');
}else if (req.body.number3 > theNumber) {
  incorrectAnswers.push(`Guess ${req.body.number3}, too high`); 
}else{
  incorrectAnswers.push(`Guess ${req.body.number3}, too low`);
}

if(req.body.number4 == theNumber){
  correctAnswers.push('Player 4 wins!');
}else if (req.body.number4 > theNumber) {
  incorrectAnswers.push(`Guess ${req.body.number4}, too high`); 
}else{
  incorrectAnswers.push(`Guess ${req.body.number4}, too low`);
}

//handles round number.
rounds.round ++;
res.send(`${rounds.round}`);
console.log('round:', rounds.round);
});

//Handle get for rendering answers.
app.get('/answer', (req, res) => {
  //Check if a correct answer has been populated into the array. Run winning logic.
  if(correctAnswers.length > 0){
    //Respond with correctAnswer array.
    res.send(correctAnswers);
    //Reset correctAnswer array for next game.
    correctAnswers = [];
    //Reset incorrectAnswer array for next game.
    incorrectAnswers = [];
    //Reroll a new number target.
    theNumber = randomNumber(1, 25);
    //Reset the rounds that totally are working.
    rounds.round = 0;
    //Else if all incorrect answers:
    }else{
      //Send incorrectAnswers array.
      res.send(incorrectAnswers);
      //Reset incorrectAnswers array so we don't append lots of stuff.
      incorrectAnswers = [];
    }
});

app.get('/reset', (req, res) => {
  correctAnswers = [];
  incorrectAnswers = [];
  rounds.round = 0;
  theNumber = randomNumber(1, 25);
  console.log(theNumber);
  res.send('round reset');
})

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
