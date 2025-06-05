let commentsDetails = [];
tableBody = document.getElementById("table-body");

function loadComments() {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => {
      return response.json();
    })
    .then((commentText) => {
      commentsDetails = commentText;
      function renderComments() {
        commentsDetails.forEach((comment) => {
          const row = `
      <tr>
        <td class='numbers'>${comment.id}</td>
        <td>${comment.name}</td>
        <td>${comment.email}</td>
        <td>${comment.body}</td>
      </tr>
      `;
          tableBody.innerHTML += row;
        });
      }
      renderComments();
    });
}

loadComments();
