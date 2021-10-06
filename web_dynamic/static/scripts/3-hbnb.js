$(document).ready(function () {
  const activeAmenities = {};

  // fill the activeAmenities dict and the h4 tag when user load the page
  $('.popover input:checked').each(function () {
    if (this.checked === true) {
      activeAmenities[this.dataset.id] = this.dataset.name;
    }
    $('.amenities h4').text(Object.values(activeAmenities).join(', '));
  });

  // fill the activeAmenities dict and the h4 tag when a new input is checked
  $('.popover input').on('click', function () {
    if (this.checked === true) {
      activeAmenities[this.dataset.id] = this.dataset.name;
    } else {
      delete activeAmenities[this.dataset.id];
    }
    $('.amenities h4').text(Object.values(activeAmenities).join(', '));
  });

  // check the api status
  $.get('http://0.0.0.0:5001/api/v1/status', function (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }).fail(function () {
    $('#api_status').removeClass('available');
  });

  // fetch places
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    success: function (data) {
      data.forEach(place => {
        $('.places').append(
`<article>
  <div class="title_box">
    <h2 id="place_name">${place.name}</h2>
    <div class="price_by_night">${place.price_by_night}</div>
  </div>
  <div class="information">
    <div class="max_guest">${place.max_guest}</div>
    <div class="number_rooms">${place.number_rooms}</div>
    <div class="number_bathrooms">${place.number_bathrooms}</div>
  </div>
  <div class="user">
  </div>
  <div class="description">${place.description}</div>
</article>`
        );
      });
    },
    contentType: 'application/json'
  });
});
