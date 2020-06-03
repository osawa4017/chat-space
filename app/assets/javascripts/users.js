$(function() {
  function dispResult(user) {
    let html =
        `
        <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
          <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
        </div>
        `;
    $("#user-search-result").append(html);
  }

  function noResult() {
    let html = 
        `
        <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">ユーザーが見つかりません</p>
        </div>
        `;
        $("#user-search-result").append(html);
  }

  function addToMemberList(name, id) {
    let html =
        `
        <div class="chat-group-user clearfix" id="${id}">
          <p class="chat-group-user__name">${name}</p>
          <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
        </div>
        `;
    $(".js-add-user").append(html);
  }

  function manageMemberInfo(id) {
    let html =
        `
        <input value="${id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${id}" />
        `;
    $(`#${id}`).append(html);
  }

  function addToResult(name, id) {
    let html =
        `
        <div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${name}</p>
          <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${id}" data-user-name="${name}">追加</div>
        </div>
        `;
    $("#user-search-result").append(html);
  }

  function incrementalSearch() {
    let input = $("#user-search-field").val();
    const member_id = $('.chat-group-user__btn--remove').attr("data-user-id");
    $.ajax( {
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      let noResultflg = true;
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          if (user.id != member_id) {
            dispResult(user);
            noResultflg = false;
          }
          else {
            ;
          }
        });
      }
      else if (input.length == 0) {
        return false;
      }
      else {
        ;
      }

      if (noResultflg) {
        noResult();
      }
      else {
        ;
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  }

  $("#user-search-field").on("keyup", function() {
    incrementalSearch();
  });

  $(document).on('click', '.chat-group-user__btn--add', function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addToMemberList(userName, userId);
    manageMemberInfo(userId);
  });

  $(document).on('click', '.chat-group-user__btn--remove', function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addToResult(userName, userId);
  });
});