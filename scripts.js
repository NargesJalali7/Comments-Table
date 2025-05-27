function loadComments() {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => {
      return response.json();
    })
    .then((commentText) => {
      console.log(commentText);
    });
}

loadComments();
