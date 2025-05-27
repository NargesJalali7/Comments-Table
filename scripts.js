const pageButtons = document.querySelectorAll(button);

let commentsDetails = [];

function loadComments() {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => {
      return response.json();
    })
    .then((commentText) => {
      commentsDetails = commentText;
    });
}

loadComments();
