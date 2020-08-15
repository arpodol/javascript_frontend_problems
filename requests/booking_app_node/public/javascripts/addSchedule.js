function retrieveSchedules() {
  var scheduleTally = {};

  var url = "http://localhost:3000/api/schedules";
  var request = new XMLHttpRequest();
  request.timeout = 9000;
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

function scheduleTemplate(scheduleNum, staffJson){
  var dl = document.createElement('dl');

  var staffDt = document.createElement('dt');
  dl.appendChild(staffDt);
  var staffLabel = document.createElement('label');
  staffLabel.setAttribute('for', `staff_id_${scheduleNum}`);
  staffLabel.innerHTML = 'Staff Name';
  staffDt.appendChild(staffLabel);

  var staffDd = document.createElement('dd');
  dl.appendChild(staffDd);
  var staffSelect = document.createElement('select');
  staffSelect.setAttribute('name', `staff_id_${scheduleNum}`);
  staffSelect.setAttribute('id', `staff_id_${scheduleNum}`);
  staffDd.appendChild(staffSelect);

  staffJson.forEach(staffMember => {
    var option = document.createElement('option');
    option.setAttribute('value', staffMember.id);
    option.innerHTML = staffMember.name;
    staffSelect.appendChild(option);
  })

  var dateDt = document.createElement('dt');
  dl.appendChild(dateDt);
  var dateLabel = document.createElement('label');
  dateLabel.setAttribute('for', `date_${scheduleNum}`);
  dateLabel.innerHTML = 'Date';
  dateDt.appendChild(dateLabel);

  var dateDd = document.createElement('dd');
  dl.appendChild(dateDd);
  var dateInput = document.createElement('input');
  dateInput.setAttribute('type', 'date');
  dateInput.setAttribute('name', `date_${scheduleNum}`);
  dateInput.setAttribute('id', `date_${scheduleNum}`);
  dateDd.appendChild(dateInput);

  var timeDt = document.createElement('dt');
  dl.appendChild(timeDt);
  var timeLabel = document.createElement('label');
  timeLabel.setAttribute('for', `time_${scheduleNum}`);
  timeLabel.innerHTML = 'Time';
  timeDt.appendChild(timeLabel);

  var timeDd = document.createElement('dd');
  dl.appendChild(timeDd);
  var timeInput = document.createElement('input');
  timeInput.setAttribute('type', 'time');
  timeInput.setAttribute('name', `time_${scheduleNum}`);
  timeInput.setAttribute('id', `time_${scheduleNum}`);
  timeDd.appendChild(timeInput);


  return dl;
}

document.addEventListener('DOMContentLoaded', function() {
  var addButton = document.getElementById('addInput');
  var retrieveSchedulesButton = document.getElementById('retrieveSchedules');
  var form = document.getElementById('scheduleform');
  var submit = document.getElementById('schedulesubmit');
  var staff = [];
  var scheduleCount = 0;

  (function (){
    var url = "http://localhost:3000/api/staff_members";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';

    request.addEventListener('load', function() {
      switch(request.status){
        case 200:
        staff = request.response;
      }
    });

    request.send();
  })();


  addButton.addEventListener('click', function(){
    event.preventDefault();
    form.insertBefore(scheduleTemplate(scheduleCount + 1, staff), submit);
    scheduleCount += 1;
  })

  retrieveSchedulesButton.addEventListener('click', function() {
    event.preventDefault();
    retrieveSchedules();
  })



  form.addEventListener('submit', event => {
    event.preventDefault();
    var jsonInputArray = [];
    for (var i = 0; i < scheduleCount; i += 1){
      var scheduleObj = {};
      scheduleObj['staff_id'] = form[`staff_id_${i + 1}`].value;
      scheduleObj['date'] = form[`date_${i + 1}`].value;
      scheduleObj['time'] = form[`time_${i + 1}`].value;
      jsonInputArray.push(scheduleObj);
    }

    var xhr = new XMLHttpRequest();
    var json = JSON.stringify({schedules: jsonInputArray});
    xhr.open('POST', form.action);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', function(){
      if (xhr.status === 201){
        console.log(xhr.responseText)
        form.reset();
      } else {
        console.log(xhr.responseText);
      }

    })

    xhr.send(json);

  })
})
