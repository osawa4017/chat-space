$(function(){
  function buildHTML(message){
    if (message.text && message.image) {
      var html =
      `
      <div class="message">
        <div class="message__upper-info">
          <p class="message__upper-info__talker">${message.user_name}</p>
          <p class="message__upper-info__date">${message.created_at}</p>
        </div>
        <p class="message__text">${message.text}</p>
      </div>
      <div class="message>
        <div class="message__upper-info">
          <p class="message__upper-info__talker">${message.user_name}</p>
          <p class="message__upper-info__date">${message.created_at}</p>
        </div>
        <img class="message__image">${message.image}</p>
      </div>
      `
    }
    else if (message.text) {
      var html =
      `
      <div class="message">
        <div class="message__upper-info">
          <p class="message__upper-info__talker">${message.user_name}</p>
          <p class="message__upper-info__date">${message.created_at}</p>
        </div>
        <p class="message__text">${message.text}</p>
      </div>
      `
    }
    else if (message.image) {
      var html =
      `
      <div class="message>
        <div class="message__upper-info">
          <p class="message__upper-info__talker">${message.user_name}</p>
          <p class="message__upper-info__date">${message.created_at}</p>
        </div>
        <img class="message__image">${message.image}</p>
      </div>
      `
    }
    else {
      var html = ``
    }
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
  });
});