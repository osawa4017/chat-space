$(function(){
  function buildHTML(message){
    let html;
    if (message.image) {
      html =
      `
      <div class="message" data-message-id=${message.id}>
        <div class="message__upper-info">
          <p class="message__upper-info__talker">${message.user_name}</p>
          <p class="message__upper-info__date">${message.created_at}</p>
        </div>
        <p class="message__text">${message.text}</p>
        <img class="message__image", src="${message.image}">
      </div>
      `
    }
    else {
      html =
      `
      <div class="message" data-message-id=${message.id}>
        <div class="message__upper-info">
          <p class="message__upper-info__talker">${message.user_name}</p>
          <p class="message__upper-info__date">${message.created_at}</p>
        </div>
        <p class="message__text">${message.text}</p>
      </div>
      `
    }
    
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false);
    });
  });

  let reloadMessages = function() {
    let last_message_id = $('.message:last').data("message-id");
    $.ajax({
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      let insertHTML = '';
      $.each(messages, function(i,message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      alert('error');
    });
  };
});