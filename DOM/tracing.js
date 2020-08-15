function domTreeTracer(id){
  var tree = [];

  var start = document.getElementById(id);
  var parent = start.parentNode;
  while (parent.nodeName !== 'HTML'){
    tree.push(Array.prototype.slice.apply(parent.children).map(function(node){
      return node.nodeName;
    }))
    parent = parent.parentNode;
  }
  return tree;
}

console.log(domTreeTracer(1));
console.log(domTreeTracer(2));
console.log(domTreeTracer(22));
