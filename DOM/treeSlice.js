function sliceTree(start, finish){
  var startNode = document.getElementById(start);
  var finishNode = document.getElementById(finish);
  if (startNode === null || finishNode === null){
    return undefined;
  }
  var currentNode = finishNode;
  var sliceArray = [currentNode.nodeName];
  do {
    currentNode = currentNode.parentNode;
    sliceArray.unshift(currentNode.nodeName);
    if (currentNode.nodeName === 'BODY'){
      return undefined;
    }
  } while (currentNode !== startNode)
  return sliceArray;
}
console.log(sliceTree(1, 4));
console.log(sliceTree(1, 76));
console.log(sliceTree(2, 5));
console.log(sliceTree(5, 4));
console.log(sliceTree(1, 23));
console.log(sliceTree(1, 22));
console.log(sliceTree(11, 19));
