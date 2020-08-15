$(function(){
  var todo_items = [
    { id: 1, title: 'Homework' },
    { id: 2, title: 'Shopping' },
    { id: 3, title: 'Calling Mom' },
    { id: 4, title: 'Coffee with John '}
  ];

  var todosTemplate = Handlebars.compile($('#todos_template').html());
  var confirmationTemplate = Handlebars.compile($('#confirmation_template').html());

  function hideModal(){
    $('.confirmation').empty();
    $('.confirmation').toggle();
    $('.modal').toggle();
  }

  function deleteTodo(id){
    $('#todos').children().filter(`[data-id="${id}"]`).remove();
  }

  function toggleContextMenu(xPos, yPos, id){
    $('.context').css({top:yPos, left:xPos});
    $('.context').toggle();
    $('.delete').one('click', function(e){
      console.log(id);
      displayModal(id);
    })
  }

  function displayModal(id){
    $('.confirmation').html(confirmationTemplate({id:id}));
    $('.confirmation').toggle();
    $('.modal').toggle();
  }



  var $todos = $('#todos');
  $('#todos').html(todosTemplate({todos: todo_items}));

  $('.todo').on('contextmenu', function(e){
    e.preventDefault();
    var id = $(this).data('id');

    toggleContextMenu(e.pageX, e.pageY, id);
  })

  $('.remove').on('click', function(e){
    console.log('inner');
    e.preventDefault();
    var id = $(this).parent().data('id');
    displayModal(id);
  });


  $('.confirmation').on('click', 'a', function(e){
    e.preventDefault();
    var id = $(this).parent().parent().data('id');
    if ($(this).hasClass('yes')){
      deleteTodo(id);
    }
    hideModal();
  });

  $(document.body).on('click', function(e){
    e.preventDefault();
    console.log('test');
    $('.context').hide();
  })

});
