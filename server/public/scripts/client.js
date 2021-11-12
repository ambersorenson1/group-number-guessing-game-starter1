$(document).ready(handleReady);
function handleReady() {
  console.log("jquery is loaded!");
  $('#submitBtn').on('click', handleGuess);
  $('#resetBtn').on('click', handleResetButton);
}

// Send server guesses. Server responds if correct, if not responds how close each guess was.
// On correct response, send ajax get for a new number.
function handleGuess () {
  let theGuess = {
    number1: $('#guess-1').val(),
    number2: $('#guess-2').val(),
    number3: $('#guess-3').val(),
    number4: $('#guess-4').val(),
  };

  $.ajax ({
    method: 'POST',
    url: '/guess',
    data: theGuess
  }).then ((response) => {
    console.log(response);
    $('#history').append(`
    <li>Round: ${response}</li>
    `);
    handleRenderItems();
  }).catch ((error) => {
    console.log('error', error);
  });
}

function handleRenderItems() {
  $.ajax ({
    method: 'GET',
    url: '/answer'
  }).then ((response) => {
    console.log('the response is:', response);
    $('#history').append(`
    <li>Guess 1: ${response[0]}</li>
    <li>Guess 2: ${response[1]}</li>
    <li>Guess 3: ${response[2]}</li>
    <li>Guess 4: ${response[3]}</li>
    
    `);
  }).catch ((error) => {
    console.log('error', error);
  });
}


function handleResetButton(){
  $.ajax ({
    method: 'GET',
    url: '/reset'
  }).then ((response) => {
    console.log(response);
    $('#history').empty();
  }).catch ((error) => {
    console.log('error:', error);
  });
}
