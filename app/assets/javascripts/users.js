$(function() {
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax( {
      type: 'GET',
      url: '/users/index',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {

    })
    .fail(function() {

    });
  });
});