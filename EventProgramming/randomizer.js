function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(callbacks) {
  var calls = Array.prototype.slice.apply(arguments);
  var seconds = 0;
  var maxTime = calls.length * 2;
  var timer = setInterval(function(){
    seconds += 1;
    if (seconds >= maxTime){
      clearInterval(timer);
    }
    console.log(seconds);
  }, 1000)

  calls.forEach(callback => setTimeout(callback, randomTime(maxTime) * 1000))
}

function randomTime(n){
  return Math.floor(Math.random() * n);
}

randomizer(callback1, callback2, callback3);
