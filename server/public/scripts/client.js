$(document).ready(handleReady);
function handleReady() {
  console.log("jquery is loaded!");
  $('#submitBtn').on('click', handleGuess);
  // handleRenderItems();
}
// function handleTheClick(){
//   theGuess = [
//     {number: $('#guess-1').val()},
//     {number: $('#guess-2').val()},
//     {number: $('#guess-3').val()},
//     {number: $('#guess-4').val()},
//   ];
//   // console.log(theGuess);
//   handleGuess(theGuess);
// }
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
    // ^Looks like `theGuess` is probably undefined right here ^
    // Maybe...handleGuess needs a parameter?
    // Worth a shot anyway. Ping me if you're still stuck on this after 5-10 minutes....
  }).then ((response) => {
    console.log('response received');
    $('#history').append(`
    <li>Round: ${response.round})</li>
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

// function handleResetButton{
//   $('#resetBtn').on('click')
// }
