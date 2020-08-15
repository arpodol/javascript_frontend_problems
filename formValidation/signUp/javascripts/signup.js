$(function(){

  var app = {
    init: function(){
      $('input').blur(this.bindFormBlurEvents.bind(this));
      $('input').focus(this.bindFormFocusEvents.bind(this));
      $('form').submit(this.bindSubmitEvents.bind(this));
      $('#first_name, #last_name').keypress(this.bindTextOnlyKey.bind(this));
      $('#cc1, #cc2, #cc3, #cc4').keypress(this.bindNumeralOnlyKey.bind(this));
      $('#cc1, #cc2, #cc3').keyup(this.bindTabForward.bind(this));
    },

    bindFormBlurEvents: function(e){
      e.preventDefault();
      if($('form')[0].checkValidity()){
        $('#form_error').text('');
      }
      this.validateInput(e.target);
    },

    validateInput: function(input){
      if (!input.checkValidity()){
        var idName = $(input).attr('id');
        var labelName = $('label[for=' + idName + ']').text();
        if (input.validity.valueMissing){
          $(input).addClass('field_error');
          $(input).next('.field_error_message').html(labelName + ' is required!');
        } else if (input.validity.patternMismatch){
          $(input).addClass('field_error');
          $(input).next('.field_error_message').html('Please enter a valid ' + labelName);
        } else if (input.validity.tooShort){
          $(input).addClass('field_error');
          $(input).next('.field_error_message').html('Password must be 10 or longer');
        }
      }
    },

    bindTabForward: function(e){
      if (($(e.target).val().length) === 4){
        $(e.target).nextAll('input')[0].focus();
      }
    },

    bindFormFocusEvents: function(e){
      e.preventDefault();
      $(e.target).removeClass('field_error');
      $(e.target).next('.field_error_message').html('');
    },

    bindSubmitEvents: function(e){
      e.preventDefault();
      if($('form')[0].checkValidity()){
        $('#form_error').text('');
        $('#serialdata').text(this.serailizeData());
      } else {
        var self = this;
        $('input').each(function(){
          self.validateInput(this);
        });
        $('#form_error').text('Form cannot be submitted until errors are corrected.')
      }
    },

    serailizeData: function(serialArray){
      var self = this;
      var serialObj = {};
      var serialArray = [];

      $('form').find('input').each(function(){
        serialObj[$(this).attr('name')] = serialObj[$(this).attr('name')] || '';
        serialObj[$(this).attr('name')] += this.value;
      });

      Object.keys(serialObj).forEach(function(key){
        var serialString = '';
        serialString += encodeURIComponent(key);
        serialString += '=';
        serialString += encodeURIComponent(serialObj[key]);
        serialArray.push(serialString);
      });

      return serialArray.join('&');


    },

    bindTextOnlyKey: function(e){
      if (!(e.key.match(/[a-zA-Z'\s]/))){
        e.preventDefault();
      }
    },

    bindNumeralOnlyKey: function(e){
      if (!(e.key.match(/[0-9]/))){
        e.preventDefault();
      }
    },

  }

  app.init();

});
