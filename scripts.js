let commentsDetails = [];
const tableBody = document.getElementById("table-body");

function loadComments() {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => {
      return response.json();
    })
    .then((commentText) => {
      commentsDetails = commentText;
      renderComments();
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function renderComments() {
  // Clear existing content
  tableBody.innerHTML = '';
  
  commentsDetails.forEach((comment) => {
    const row = `
      <tr>
        <td>${comment.id}</td>
        <td>${comment.name}</td>
        <td>${comment.email}</td>
        <td>${comment.body}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Load comments when the page loads
document.addEventListener('DOMContentLoaded', loadComments);