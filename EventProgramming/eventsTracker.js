var tracker = (function(){
  var list = [];

  return {
    list: function(){
      return list.slice();
    },
    elements: function(){
      return list.map(event => event.target);
    },
    clear: function(){
      list = [];
      elements = [];
      return 0;
    },
    addEvent: function(event){
      list.push(event);
    }
  }
})();

function track(callback){
  return function(event){
    if (tracker.list().indexOf(event) === -1){
      tracker.addEvent(event);
    }
    callback(event);
  }
}

var divRed = document.querySelector('div#red');
var divBlue = document.querySelector('div#blue');
var divOrange = document.querySelector('div#orange');
var divGreen = document.querySelector('div#green');
console.log(divGreen);

divRed.addEventListener('click', track(function(event) {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(function(event) {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(function(event) {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(function(event) {
  document.body.style.background = 'green';
}));

console.log(tracker.list().length);
console.log(tracker.elements());
