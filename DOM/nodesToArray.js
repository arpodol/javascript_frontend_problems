function nodesToArr(){
  return iterate(document.body);
}

function iterate(node){
  var children = node.children;
  var childArr = Array.prototype.slice.apply(children);
  var testArray = [node.nodeName];
  if (node.children.length === 0){
    testArray.push([]);
  } else {
    testArray.push(childArr.map(function(childNode){
      return iterate(childNode);
    }))
  }
  return testArray;
}
