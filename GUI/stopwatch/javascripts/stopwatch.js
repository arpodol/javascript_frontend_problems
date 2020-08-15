$(function(){

  var app = {
    $hours: $('#hours'),
    $minutes: $('#minutes'),
    $seconds: $('#seconds'),
    $centiseconds: $('#centiseconds'),
    totalTime: 0,

    init:function(){
      $('#actions').on('click','#toggle', this.startTimer.bind(this));
      $('#actions').on('click','#reset', this.resetTimer.bind(this));
    },

    startTimer: function(){
      var app = this;
      if ($('#toggle').html() === 'Start'){
        $('#toggle').html('Stop');
        console.log(this);
        this.timerId = setInterval(function() {
          app.totalTime += 1;
          app.renderTime();
        }, 10);
      } else {
        $('#toggle').html('Start');
        clearInterval(this.timerId);
      }
    },

    resetTimer: function(){
      clearInterval(this.timerId);
      this.totalTime = 0;
      this.renderTime();
      $('#toggle').html('Start');
    },

    renderTime: function(){
      var hours = this.padZeroes(Math.floor(this.totalTime / 36000));
      var minutes = this.padZeroes(Math.floor((this.totalTime - (hours * 36000)) / 6000));
      var seconds = this.padZeroes(Math.floor((this.totalTime - (hours * 36000) - (minutes * 6000)) / 100));
      var centiseconds = this.padZeroes(Math.floor((this.totalTime - (hours * 36000) - (minutes * 6000) - seconds * 100)));

      this.$hours.html(hours);
      this.$minutes.html(minutes);
      this.$seconds.html(seconds);
      this.$centiseconds.html(centiseconds);
    },

    padZeroes: function(int){
      var s = String(int);
      while(s.length < 2) {s = '0' + s};
      return s;
    }




  }

  app.init();
});
