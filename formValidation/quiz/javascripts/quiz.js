$(function(){
  var questions = [
    {
      id: 1,
      description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
      options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
    },
    {
      id: 2,
      description: 'Which of the following numbers is the answer to Life, the \
      Universe and Everything?',
      options: ['66', '13', '111', '42'],
    },
    {
      id: 3,
      description: 'What is Pan Galactic Gargle Blaster?',
      options: ['A drink', 'A machine', 'A creature', 'None of the above'],
    },
    {
      id: 4,
      description: 'Which star system does Ford Prefect belong to?',
      options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
    },
  ];

  var answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

  var app = {
    init: function(){
      var quiz_template = Handlebars.compile($('#quiz_template').html());
      $('fieldset').append(quiz_template({questions: questions}));
      $('form').on('submit', this.checkAnswers.bind(this));
      $('form').on('reset', this.bindReset.bind(this));
    },

    checkAnswers: function(e){
      e.preventDefault();
      $('#submittal').prop('disabled', true);
      $('.question').each(function(){
        var num = $(this).data('id');
        if ($(this).find(':checked').length === 1){
          var answer = $(this).find(':checked')[0].value;
          if (answer === answerKey[$(this).data('id')] ){
            $(this).children('.answer').html('You are correct!');
            $(this).children('.answer').addClass('correct');
          } else {
            $(this).children('.answer').html(`Incorrect. The correct answer is: "${answerKey[num]}".`);
            $(this).children('.answer').addClass('incorrect');
          }
        } else {
          $(this).children('.answer').html(`You didn't answer. The correct answer is: "${answerKey[num]}".`);
          $(this).children('.answer').addClass('incorrect');
        }
      })
    },

    bindReset: function(e){
      e.preventDefault();
      $('#submittal').prop('disabled', false);
      $('.answer').each(function(){
        $(this).html('');
        $(this).removeClass(['correct', 'incorrect']);
      });
      $(':checked').each(function(){
        $(this).prop('checked', false);
      })
    }
  }

  app.init();

});
