function colorGeneration(indent){
  walk(document.body, function(subNode){
    var depthCount = 0;
    currentNode = subNode;
    while(currentNode.nodeName !== 'BODY'){
      depthCount += 1;
      currentNode = currentNode.parentNode;
    }
    if (depthCount === indent){
      subNode.classList.add('generation-color');
    }
  });
}

function walk(node, callback) {
  callback(node);                                // do something with node
  var i;
  for (i = 0; i < node.children.length; i++) { // for each child node
    walk(node.children[i], callback);          // recursively call walk()
  }
}
colorGeneration(8);
