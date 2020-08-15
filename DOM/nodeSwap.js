function nodeSwap(firstId, secondId){
  // check for null
  var first = document.getElementById(firstId);
  var second = document.getElementById(secondId);

  if (!first || !second){
    return undefined
  };

  var firstParents = getParents(first, function(node){
    return node;
  })

  var secondParents = getParents(second, function(node){
    return node;
  })

  var maxLength = Math.max(firstParents.length, secondParents.length);

  for (let i = 0; i < maxLength; i += 1){
    if (firstParents[i] === second || secondParents[i] === first){
      return undefined;
    }
  }

  //validation complete
  var dummyNode = document.createElement('p');
  first.insertAdjacentElement('beforebegin',dummyNode);
  second.insertAdjacentElement('beforebegin', first);
  dummyNode.insertAdjacentElement('afterend', second);
  dummyNode.remove();
  return true;
}

function getParents(startNode, callback){
  var nodeArray = [];
  var currentNode = startNode.parentNode;
  while (currentNode.nodeName !== 'HTML'){
    nodeArray.push(callback(currentNode));
    currentNode = currentNode.parentNode;
  }
  return nodeArray;
}
nodeSwap(1, 20);
nodeSwap(1, 4);
nodeSwap(9, 3);
