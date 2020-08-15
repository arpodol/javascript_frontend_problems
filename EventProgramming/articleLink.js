document.addEventListener("DOMContentLoaded", function () {
  var highlightedElement;
  var articleLinks = document.querySelectorAll("li");
  var main = document.querySelector('main');
  //console.log(articles);
  function highlightElement(element) {
    if (highlightedElement) {
      highlightedElement.classList.remove("highlight");
    }
    element.classList.add("highlight");
    highlightedElement = element;
  }

  articleLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.stopPropagation();
      var targetID = event.target.getAttribute("href");
      var targetElement = document.querySelector(targetID);
      highlightElement(targetElement);
    });
  });

  main.addEventListener("click", (event) => {
    var element = event.target;
    if (element.tagName !== 'ARTICLE'){element = element.parentNode};
    if (element.tagName === 'ARTICLE'){
      event.stopPropagation();
      highlightElement(element);
    }
  });

  document.addEventListener("click", (event) => {
    highlightElement(main);
  })
});
