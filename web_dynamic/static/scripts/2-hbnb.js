$(document).ready(function () {
  const activeAmenities = {};
  $('.popover input:checked').each(function () {
    if (this.checked === true) {
      activeAmenities[this.dataset.id] = this.dataset.name;
    }
    $('.amenities h4').text(Object.values(activeAmenities).join(', '));
  });
  $('.popover input').on('click', function () {
    if (this.checked === true) {
      activeAmenities[this.dataset.id] = this.dataset.name;
    } else {
      delete activeAmenities[this.dataset.id];
    }
    $('.amenities h4').text(Object.values(activeAmenities).join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status', function (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }).fail(function () {
    $('#api_status').removeClass('available');
  });
});
