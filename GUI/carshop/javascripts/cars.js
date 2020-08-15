$(function(){
  var cars = [
    { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
    { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
    { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
    { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
    { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
    { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
    { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
  ];

  var app = {
    init: function(){
      this.carTemplate = Handlebars.compile($('#cars_template').html());
      this.filterTemplate = Handlebars.compile($('#filter_template').html());
      this.fullFilters = this.generateFilters();
      this.$filter = $('#filters');
      this.filteredCars = cars;
      this.renderFilters(this.fullFilters);
      this.renderCars();
      $('header').on('click','#filter_submit' ,this.handleButtonClick.bind(this));
      $('header').on('change', 'select', this.generatePartialFilters.bind(this));
    },


    filterCars: function(filters){
      this.filteredCars= cars.filter(function(car){
        var validity = true;
          Object.keys(filters).forEach(function(key){
            if (car[key] !== filters[key]){
              validity = false;
            }
          })
        return validity;
      });
      this.renderCars();
    },

    renderCars: function(){
      $('#cars').html(this.carTemplate({cars: this.filteredCars}));
    },

    renderFilters: function(filterObj){
      var filterTemplate = this.filterTemplate;
      this.$filter.html(filterTemplate(filterObj));
    },

    generateFilters: function(){
      var filters = {make:[],image:[],model:[],year:[],price:[]};
      cars.forEach(function(car){
        Object.keys(car).forEach(function(key){
          if(!filters[key].includes(car[key])){
            filters[key].push(car[key]);
          }
        })
      })
      return filters;
    },

    handleButtonClick: function(){
      this.filterCars(this.grabFilterValues());
    },

    generatePartialFilters: function(){
      var filters = this.grabFilterValues();
      var filteredCars = cars.filter(function(car){
        var validity = true;
          Object.keys(filters).forEach(function(key){
            if (car[key] !== filters[key]){
              validity = false;
            }
          })
        return validity;
      });


      var partialFilter = {make:[],image:[],model:[],year:[],price:[]};
      filteredCars.forEach(function(car){
        Object.keys(car).forEach(function(key){
          if(!partialFilter[key].includes(car[key])){
            partialFilter[key].push(car[key]);
          }
        })
      })
      this.renderFilters(partialFilter);
      this.setSelectedFilters(filters);
    },

    setSelectedFilters(filters){
      Object.keys(filters).forEach(function(key){
        ($(`#${key}`).children().filter(function(index){
          return $(this).attr('value') === String(filters[key]);
        })).attr('selected','selected');
      })
    },

    grabFilterValues: function(){
      var make = $('#make').val();
      var model = $('#model').val();
      var price = Number($('#price').val());
      var year = Number($('#year').val());

      var filter = {};

      if (make) filter.make = make;
      if (model) filter.model = model;
      if (price) filter.price = price;
      if (year) filter.year = year;

      return filter;
    }

  }

  app.init();

});
