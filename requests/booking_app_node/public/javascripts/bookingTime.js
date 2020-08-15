function addScheduleChoice(selectNode, schedule, staff){
  var option = document.createElement('option');
  var teacher = getTeacherNameFromId(schedule.staff_id, staff);
  var innerString = teacher + ' | ' + schedule.date + ' | ' + schedule.time;
  option.setAttribute('value', schedule.id);
  option.innerHTML = innerString;
  selectNode.appendChild(option);
}

function getTeacherNameFromId(id, staff){
  return staff.filter(staffMember => staffMember.id === id)[0].name;
}

function generateMoreInfo(email, sequence){
  var div = document.createElement('div');
  div.classList.add('newInput');
  var h1 = document.createElement('h1');
  h1.innerHTML = 'Please provide new student details';
  div.appendChild(h1);
  var additionalForm = document.createElement('form');
  additionalForm.setAttribute('id', 'additionalForm');
  additionalForm.setAttribute('method', 'POST');
  additionalForm.setAttribute('action', '/api/students');
  div.appendChild(additionalForm);

  var dl = document.createElement('dl');
  additionalForm.appendChild(dl);

  var emailDt = document.createElement('dt');
  dl.appendChild(emailDt);
  var emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', `email`);
  emailLabel.innerHTML = 'Email';
  emailDt.appendChild(emailLabel);

  var emailDd = document.createElement('dd');
  dl.appendChild(emailDd);
  var emailInput = document.createElement('input');
  emailInput.setAttribute('type', 'text');
  emailInput.setAttribute('name', `email`);
  emailInput.setAttribute('id', `email`);
  emailInput.setAttribute('value', email);
  emailDd.appendChild(emailInput);

  var nameDt = document.createElement('dt');
  dl.appendChild(nameDt);
  var nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', `name`);
  nameLabel.innerHTML = 'Name';
  nameDt.appendChild(nameLabel);

  var nameDd = document.createElement('dd');
  dl.appendChild(nameDd);
  var nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', `name`);
  nameInput.setAttribute('id', `name`);
  nameDd.appendChild(nameInput);

  var sequenceDt = document.createElement('dt');
  dl.appendChild(sequenceDt);
  var sequeneceLabel = document.createElement('label');
  sequeneceLabel.setAttribute('for', `booking_sequence`);
  sequeneceLabel.innerHTML = 'Booking Sequence';
  sequenceDt.appendChild(sequeneceLabel);

  var sequenceDd = document.createElement('dd');
  dl.appendChild(sequenceDd);
  var sequenceInput = document.createElement('input');
  sequenceInput.setAttribute('type', 'text');
  sequenceInput.setAttribute('name', `booking_sequence`);
  sequenceInput.setAttribute('id', `booking_sequence`);
  sequenceInput.setAttribute('value', sequence);
  sequenceDd.appendChild(sequenceInput);

  var additionalSubmit = document.createElement('input');
  additionalSubmit.setAttribute('type', 'submit');
  additionalSubmit.setAttribute('id', 'additionalsubmit');
  additionalForm.appendChild(additionalSubmit);

  return div;
}

var form = document.getElementById('bookingform');
var schedules;
var select = document.querySelector('select');

(function (){
  var url = "http://localhost:3000/api/schedules";
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';

  request.addEventListener('load', function() {
    switch(request.status){
      case 200:
      schedules = request.response;
      schedules = schedules.filter(schedule => schedule.student_email === null);

      (function (){
        var url = "http://localhost:3000/api/staff_members";
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.addEventListener('load', function() {
          switch(request.status){
            case 200:
            staff = request.response;
            schedules.forEach(schedule => {
              addScheduleChoice(select, schedule, staff);
            })
          }
        });
        request.send();
      })();
    }
  });
  request.send();
})();


form.addEventListener('submit', event => {
  event.preventDefault();
  var data = new FormData(form);
  var xhr = new XMLHttpRequest();

  xhr.open('POST', form.action);
  xhr.addEventListener('load', function(){
    if (xhr.status === 204){
      console.log('Schedule was booked successfully!')
      form.reset();
    } else {
      var sequenceId = xhr.responseText.split(' ').reverse()[0];

      document.body.appendChild(generateMoreInfo(form['student_email'].value, sequenceId));
      var secondForm = document.getElementById('additionalForm');

      secondForm.addEventListener('submit', event2 => {
        event2.preventDefault();

        var secondData = new FormData(secondForm);
        var secondXhr = new XMLHttpRequest();

        secondXhr.open('POST', secondForm.action);

        secondXhr.addEventListener('load', function() {
          switch(secondXhr.status){
            case 201:
              console.log('Student added successfully to the database');
              secondForm.reset();
              data.set('student_email', secondData.get('email'));
              form.dispatchEvent(new Event('submit', { cancelable: true }));
          }
        })
        secondXhr.send(secondData);
      })
    }

  })

  xhr.send(data);

})
