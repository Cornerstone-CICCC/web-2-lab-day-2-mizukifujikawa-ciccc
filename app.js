$(function () {
  let userId = 1;
  let views = 0;
  dataLoad();

  $("header button:last").on("click", function () {
    if (userId === 30) {
      userId = 1;
    } else {
      userId = userId + 1;
    }
    dataLoad();
  });
  $("header button:first").on("click", function () {
    if (userId === 1) {
      userId = 30;
    } else {
      userId = userId - 1;
    }
    dataLoad();
  });

  // your code here
  function dataLoad() {
    fetch(`https://dummyjson.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        $(".info .info__image").children().remove();
        $(".info .info__image").append(`<img src="${data.image}" />`);
        $(".info .info__content").children().remove();
        $(".info .info__content").append(
          `<div class="name">${data.firstName} ${data.lastName}</div>`
        );
        $(".info .info__content").append(
          `<div class="age">Age: ${data.age}</div>`
        );
        $(".info .info__content").append(
          `<div class="email">Email: ${data.email}</div>`
        );
        $(".info .info__content").append(
          `<div class="phone">Phone: ${data.phone}</div>`
        );
        $(".posts h3")[0].innerHTML = `${data.firstName}'s Posts`;
        $(".todos h3")[0].innerHTML = `${data.firstName}'s Posts`;
        console.log(data);
      })
      .catch((error) => console.error(error));

    fetch(`https://dummyjson.com/users/${userId}/posts`)
      .then((res) => res.json())
      .then((data) => {
        $(".posts ul").children().remove();
        if(data.posts.length == 0) {
          $(".posts ul").append('<li><p>User has no posts.</p></li>')
        }
        data.posts.forEach((post) => {
          $(".posts ul").append(
            `<li><h4>${post.title}</h4><p>${post.body}</p></li>`
          );
        });
        console.log(data);
      })
      .catch((error) => console.error(error));

    fetch(`https://dummyjson.com/users/${userId}/todos`)
      .then((res) => res.json())
      .then((data) => {
        $(".todos ul").children().remove();
        if(data.todos.length == 0) {
          $(".todos ul").append('<li><p>User has no todos.</p></li>')
        }
        data.todos.forEach((todo) => {
          $(".todos ul").append(`<li>${todo.todo}</li>`);
        });
        console.log(data);
      })
      .catch((error) => console.error(error));
  }

  $(".posts h3").on('click', function() {
    $('.posts ul').slideToggle();
  })
  $(".todos h3").on('click', function() {
    $('.todos ul').slideToggle();
  })

  $(document).on("click", ".posts ul li h4", function() {
    console.log('click');
    console.log($(this).next('p').html());
    $(".container .overlay").remove();
    $(".container").append("<div class='overlay'></div>");
    $(".overlay").append(`<div class='modal'><div><h4>${$(this).html()}</h4><p>${$(this).next('p').html()}</p></div><button>close</button></div>`);
    $('.modal, .overlay').fadeIn();
  });
  $(document).on("click", ".modal button", function() {
    $('.modal, .overlay').fadeOut();
  });

});