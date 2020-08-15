$(function(){

  var calculator = {
    $entryWindow: $('#entry_window'),
    $operationWindow: $('#operation_window'),
    operationArray: [],
    entryNumString: '0',
    tempMemory: 0,
    previousOperation:'',
    interimResult: false,
    firstEntry: true,


    init:function(){
      $('#buttons').on('click', '.digit', this.digitEntry.bind(this));
      $('#buttons').on('click', '.period', this.periodEntry.bind(this));
      $('#buttons').on('click', '.negative', this.negativeEntry.bind(this));
      $('#buttons').on('click', '.operation', this.operationEntry.bind(this));
      $('#buttons').on('click', '.equals', this.equalsEntry.bind(this));
      $('#buttons').on('click', '.control', this.controlEntry.bind(this));
    },

    digitEntry: function(e){
      if (this.entryNumString === '0'|| this.interimResult){
        this.entryNumString = $(e.target).html();
        this.interimResult = false;
      } else {
        this.entryNumString =  this.entryNumString + $(e.target).html();
      };
      this.updateEntryWindow();
    },


    periodEntry: function(){
      if (!this.entryNumString.includes('.')){
        this.entryNumString = this.entryNumString + '.';
        this.updateEntryWindow();
      };
    },

    negativeEntry: function(){
      if (this.entryNumString.includes('-')){
        this.entryNumString = this.entryNumString.substring(1);
      } else if (this.entryNumString !== '0'){
        this.entryNumString = '-' + this.entryNumString;
      }

      this.updateEntryWindow();
    },

    operationEntry: function(e){
      this.operationArray.push(this.entryNumString);
      this.previousOperation = $(e.target).html();
      this.operationArray.push(this.previousOperation);

      if (!this.firstEntry){
        switch(this.previousOperation){
          case '+':
            this.tempMemory += Number(this.entryNumString);
            break;
          case '-':
            this.tempMemory -= Number(this.entryNumString);
            break;
          case 'x':
            this.tempMemory *= Number(this.entryNumString);
            break;
          case '/':
            this.tempMemory /= Number(this.entryNumString);
            break;
          case '%':
            this.tempMemory %= Number(this.entryNumString);
            break;
        }
        this.entryNumString = String(this.tempMemory);


      } else {
        this.tempMemory = Number(this.entryNumString);
        this.firstEntry = false;
      }


      this.interimResult = true;
      this.updateEntryWindow();
      this.updateOperationWindow();

    },

    equalsEntry: function(){
      switch(this.previousOperation){
        case '+':
          this.tempMemory += Number(this.entryNumString);
          break;
        case '-':
          this.tempMemory -= Number(this.entryNumString);
          break;
        case 'x':
          this.tempMemory *= Number(this.entryNumString);
          break;
        case '/':
          this.tempMemory /= Number(this.entryNumString);
          break;
        case '%':
          this.tempMemory %= Number(this.entryNumString);
          break;
      };
      this.operationArray = [];
      this.firstEntry = true;
      this.interimResult = true;
      this.entryNumString = String(this.tempMemory);
      this.updateEntryWindow();
      this.updateOperationWindow();

    },

    controlEntry: function(e){
      var key = $(e.target).html();
      switch(key){
        case('CE'):
          this.entryNumString = '0';
          break;
        case('C'):
          this.entryNumString = '0';
          this.operationArray = [];
          this.tempMemory = 0;
          this.previousOperation = '';
          this.interimResult = false;
          this.firstEntry = true;
          break;
      }

      this.updateEntryWindow();
      this.updateOperationWindow();

    },

    updateEntryWindow: function(){
      this.$entryWindow.html(this.entryNumString);
    },

    updateOperationWindow: function(){
      this.$operationWindow.html(this.operationArray.join(' '));
    }

  }

  calculator.init();
});
