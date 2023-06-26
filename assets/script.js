$(function () {
  var currentHour = dayjs().hour(); 

  // Function to generate the time blocks dynamically
  function generateTimeBlocks() {
    var container = $('.container-lg');
    var workHours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
    var count = 0;

    for (var i = 9; i < 18; i++) {
      var timeBlock = $('<div>')
        .attr('id', 'hour-' + i)
        .addClass('row time-block')
        .addClass(getTimeBlockClass(i));

      var hourCol = $('<div>')
        .addClass('col-2 col-md-1 hour text-center py-3')
        .text(getDisplayHour(workHours[count]));

      var descriptionTextarea = $('<textarea>')
        .addClass('col-8 col-md-10 description')
        .attr('rows', '3')
        .val(getStoredEvent(workHours[count]));

      var saveBtn = $('<button>')
        .addClass('btn saveBtn col-2 col-md-1')
        .attr('aria-label', 'save')
        .html('<i class="fas fa-save" aria-hidden="true"></i>');

      timeBlock.append(hourCol, descriptionTextarea, saveBtn);
      container.append(timeBlock);
      count++
    }
  }

  // Function to get the appropriate class for a time block based on the current hour
  function getTimeBlockClass(hour) {
    console.log (currentHour)
    if (hour < currentHour) {
      return 'past';
    } else if (hour == currentHour) {
      return 'present';
    } else {
      return 'future';
    }
  }

  // Function to get the display hour in AM/PM format
  function getDisplayHour(hour) {
    return [9,10,11].includes(hour) ?`${hour}AM` : `${hour}PM`
  }  

  // Function to get the stored event from local storage for a specific hour
  function getStoredEvent(hour) {
    var storedEvent = localStorage.getItem('event-' + hour);
    return storedEvent ? storedEvent : '';
  }

  // Function to save the event text to local storage for a specific hour
  function saveEvent(hour, eventText) {
    localStorage.setItem('event-' + hour, eventText);
  }

  // Event listener for save button click
  $('.container-lg').on('click', '.saveBtn', function () {
    var hour = $(this).parent().attr('id').replace('hour-', '');
    var eventText = $(this).siblings('.description').val();
    saveEvent(hour, eventText);
  });

  // Generate time blocks and display current date
  generateTimeBlocks();
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});

  