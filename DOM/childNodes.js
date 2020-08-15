<div id="1">
  <h1 id="2">Hello, <em id="3">World</em></h1>
  <p id="4">
    Welcome to wonderland. This is an
    <span id="5">awesome</span> place.
  </p>
  <a href="#" id="6"><strong id="7">Enter</strong></a>
  <div id="8"><p id="9"><a href="#" id="10">Go back</a></p></div>
</div>

//1   direct nodes = 9 indirect nodes = 12
//2   direct nodes = 2 indirect nodes = 1
//3   direct nodes = 1 indirect = 0
//4   direct nodes = 3 indirect = 1
//5   direct nodes = 1 indirect = 0
//6   direct nodes = 1 indirect = 1
//7   direct nodes = 1 indirect = 0
//8   direct nodes = 1 indirect = 2
//9   direct nodes = 1 indirect = 1
//10  direct nodes = 1 indirect = 0
function walk(node, callback) {
  callback(node);                                // do something with node
  var i;
  for (i = 0; i < node.childNodes.length; i++) { // for each child node
    walk(node.childNodes[i], callback);          // recursively call walk()
  }
}

function childNodes(id){
  var parentNode = document.getElementById(id);
  var childNodeCount = 0;
  //Array.prototype.slice.apply(parentNode);
  parentNode.childNodes.forEach(function(node){
    walk(node, function(subNode){
      childNodeCount += 1;
    })
  })
  return [parentNode.childNodes.length, childNodeCount - parentNode.childNodes.length];
}
console.log(childNodes(1));
console.log(childNodes(2));
console.log(childNodes(3));
console.log(childNodes(4));
console.log(childNodes(5));
console.log(childNodes(6));
console.log(childNodes(7));
console.log(childNodes(8));
console.log(childNodes(9));
console.log(childNodes(10));
