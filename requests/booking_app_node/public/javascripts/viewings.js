function createDate(date){
  var li = document.createElement('li');
  li.innerHTML = date;
  li.addEventListener('click', function() {
    if (li.childElementCount === 0){
      var ul = document.createElement('ul');
      li.appendChild(ul);
      var xhr = new XMLHttpRequest();
      console.log(`/api/bookings/${date}`);
      xhr.responseType = 'json';
      xhr.open('GET', `http://localhost:3000/api/bookings/${date}`);

      xhr.addEventListener('load', function() {
        var bookings = xhr.response;
        bookings.forEach(booking => {
          var innerLi = document.createElement('li');
          innerLi.innerHTML = booking.join(' | ');
          ul.appendChild(innerLi);
        })
      })
      xhr.send();
    }
  })
  return li;
}

var schedules;
var dateArr = [];
var dateList = document.querySelector('ul');

(function (){
  var url = "http://localhost:3000/api/schedules";
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';

  request.addEventListener('load', function() {
    switch(request.status){
      case 200:
      schedules = request.response;
      schedules = schedules.filter(schedule => schedule.student_email !== null);
      schedules.forEach(schedule => {
        if (dateArr.indexOf(schedule.date) === -1){
          dateArr.push(schedule.date);
        }
      })
      dateArr.forEach(date => {
        dateList.appendChild(createDate(date));
      })
    }
  });
  request.send();
})();
