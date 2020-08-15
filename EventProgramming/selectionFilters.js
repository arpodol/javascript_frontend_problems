var animalToClassifications = {
  Bear: ['Vertabrate', 'Warm-blooded', 'Mammal'],
  Turtle: ['Vertabrate', 'Cold-blooded'],
  Whale: ['Vertabrate', 'Warm-blooded', 'Mammal'],
  Salmon: ['Vertabrate', 'Cold-blooded'],
  Ostrich: ['Vertabrate', 'Warm-blooded', 'Bird'],
}

var classicationToAnimals = {
  Vertabrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  Mammal: ['Bear', 'Whale'],
  Bird: ['Ostrich'],
}



var classifications = document.getElementById('animal-classifications');
var animals = document.getElementById('animals');
var clearButton = document.getElementById('clear');

classifications.addEventListener('input', event => {
  var selectedClass = classifications.options[classifications.selectedIndex];
  console.log(selectedClass.value);
  var animalArray = Array.prototype.slice.apply(animals.options);
  animalArray.forEach(animal => {
    if(!classicationToAnimals[selectedClass.value].includes(animal.value)){
      animal.style.display = 'none';
    } else {
      animal.style.dispaly = '';
    }
  })
})


animals.addEventListener('input', event => {
  var selectedClass = animals.options[animals.selectedIndex];
  console.log(selectedClass.value);
  var classificationArray = Array.prototype.slice.apply(classifications.options);
  classificationArray.forEach(classification => {
    if(!animalToClassifications[selectedClass.value].includes(classification.value)){
      classification.style.display = 'none';
    } else {
      classification.style.dispaly = '';
    }
  })
})

clearButton.addEventListener('click', event => {
  event.preventDefault();
  var animalArray =  Array.prototype.slice.apply(animals.options);
  var classificationArray = Array.prototype.slice.apply(classifications.options);

  animalArray.forEach(animal => animal.style.display = '');
  classificationArray.forEach(classification => classification.style.display = '');
  animals.selectedIndex = 0;
  classifications.selectedIndex = 0;
})
