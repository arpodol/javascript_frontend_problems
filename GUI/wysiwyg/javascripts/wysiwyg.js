$(function(){

  var wordEditor = {

    init:function(){
      $('button').on('click', this.bindButtons.bind(this));
      document.addEventListener('selectionchange', this.bindToggleCheck.bind(this));
    },

    bindButtons: function(e){
      e.preventDefault();
      var button = $(e.target).html();
      $(e.target).toggleClass('selected');

      switch(button){
        case 'B':
          document.execCommand('bold', false, null);
          break;
        case 'I':
          document.execCommand('italic', false, null);
          break;
        case 'U':
          document.execCommand('underline', false, null);
          break;
        case 'S':
          document.execCommand('strikeThrough', false, null);
          break;
        case 'H':
          var link = prompt('Please enter the link');
          document.execCommand('createLink', false, link);
          break;
        case 'UL':
          console.log('test');
          console.log(document.execCommand('insertUnorderedList', false, null));
          break;
        case 'OL':
          document.execCommand('insertOrderedList', false, null);
          break;
        case 'LJ':
          document.execCommand('justifyLeft', false, null);
          break;
        case 'RJ':
          document.execCommand('justifyRight', false, null);
          break;
        case 'CJ':
          document.execCommand('justifyCenter', false, null);
          break;
        case 'FJ':
          document.execCommand('justifyFull', false, null);
          break;
      }
    },

    bindToggleCheck(e){
      $('#bold').toggleClass('selected', document.queryCommandState('bold'));
      $('#italic').toggleClass('selected', document.queryCommandState('italic'));
      $('#underline').toggleClass('selected', document.queryCommandState('underline'));
      $('#strikethrough').toggleClass('selected', document.queryCommandState('strikethrough'));
      $('#hyperlink').toggleClass('selected', document.queryCommandState('createLink'));
      $('#unordered_list').toggleClass('selected', document.queryCommandState('insertUnorderedList'));
      $('#ordered_list').toggleClass('selected', document.queryCommandState('insertOrderedList'));
      $('#leftjustify').toggleClass('selected', document.queryCommandState('justifyLeft'));
      $('#rightjustify').toggleClass('selected', document.queryCommandState('justifyRight'));
      $('#centerjustify').toggleClass('selected', document.queryCommandState('justifyCenter'));
      $('#fulljustify').toggleClass('selected', document.queryCommandState('justifyFull'));

    },
  }
  wordEditor.init();
});
