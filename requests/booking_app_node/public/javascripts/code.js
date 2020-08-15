function retrieveSchedules() {
  var scheduleTally = {};

  var url = "http://localhost:3000/api/schedules";
  var request = new XMLHttpRequest();
  request.timeout = 5000;
  request.responseType = 'json';
  request.open('GET', url);

  request.addEventListener('load', function() {

    var data = request.response;

    if (data.length > 0){
      data.forEach(schedule => {
        scheduleTally[schedule.staff_id] = (scheduleTally[schedule.staff_id] + 1) || 1;
      })
      console.log(Object.keys(scheduleTally).map(id => {
        return `Staff ${id}: ${scheduleTally[id]}`
      }).join("\n"));

    } else {
      console.log('There are no available schedules!');
    };
  });

  request.addEventListener('timeout', function(){
    console.log('Server is too busy! Try again later!')
  })

  request.send();
}

document.addEventListener('DOMContentLoaded', function() {
  var form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    var data = new FormData(form);
    var request = new XMLHttpRequest();
    request.open('POST', '/api/staff_members');

    request.addEventListener('load', function() {
      switch (request.status){
        case 201:
          console.log('The teacher was added to the database:' + request.responseText);
          break;
        case 400:
          console.log(request.responseText);
          break;
      }
    });

    request.send(data);
  })
})
