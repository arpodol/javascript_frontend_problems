function cancelSchedule(scheduleId){
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', `http://localhost:3000/api/schedules/${scheduleId}`);

  console.log(`http://localhost:3000/api/schedules/${scheduleId}`);
  xhr.addEventListener('load', function(){
    if (xhr.status === 204) {
      alert('Schedule deleted.');
    } else {
      alert('Deleting failed: ' + xhr.responseText);
    }
  })
  xhr.send();

}

function cancelBooking(bookingId){
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', `http://localhost:3000/api/bookings/${bookingId}`);
  console.log(`http://localhost:3000/api/bookings/${bookingId}`);
  xhr.addEventListener('load', function(){
    if (xhr.status === 204) {
      alert('Booking cancelled.');
    } else {
      alert('Canceling failed: ' + xhr.responseText);
    }
  })
  xhr.send();

}

var scheduleForm = document.getElementById('schedule');

scheduleForm.addEventListener('submit', event => {
  event.preventDefault();
  cancelSchedule(scheduleForm['id'].value);
});

var bookingForm = document.getElementById('booking');
bookingForm.addEventListener('submit', event => {
  event.preventDefault();
  cancelBooking(bookingForm['id'].value);
});
