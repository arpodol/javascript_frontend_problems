function arrayToNodes(nodes){
  var element = document.createElement(nodes[0]);

  nodes[1].forEach(function(node){
    if (node !== []){
      element.appendChild(arrayToNodes(node));
    }
  })
  return element;
}

var nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];
arrayToNodes(nodes);
