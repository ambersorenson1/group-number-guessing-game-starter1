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
    console.log(response);
  }).catch ((error) => {
    console.log('error', error);
  });
}

function handleRenderItems() {
  
}

