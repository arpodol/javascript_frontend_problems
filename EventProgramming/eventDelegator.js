var element1 = document.querySelector('table');
var element2 = document.querySelector('main h1');
var element3 = document.querySelector('main');

var callback = function(event) {
  alert('Target: ' + event.target.tagName + '\nCurrent Target: ' + event.currentTarget.tagName);
};

function delegateEvent(parentElement, selector, eventType, callback){
  if (parentElement === null){
    return undefined;
  }

  parentElement.addEventListener(eventType, e => {
    if (Array.from(parentElement.querySelectorAll(selector)).includes(event.target)){
      callback(e);
      event.stopPropagation();
    }
  });
  return true;
}
console.log(delegateEvent(element3, 'aside p', 'click', callback));
