let commentsDetails = [];
const tableBody = document.getElementById("table-body");
const paginationContainer = document.querySelector(".pagination");

const commentsPerPage = 10;
let currentPage = 1;

function loadComments() {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((commentText) => {
      commentsDetails = commentText;
      renderComments();
      renderPaginationButtons();
    });
}

function renderComments() {
  tableBody.innerHTML = "";
  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const currentComments = commentsDetails.slice(startIndex, endIndex);
  let rows = "";
  currentComments.forEach((comment) => {
    rows += `
      <tr>
        <td class='numbers'>${comment.id}</td>
        <td>${comment.name}</td>
        <td>${comment.email}</td>
        <td>${comment.body}</td>
      </tr>
    `;
  });

  tableBody.innerHTML = rows;
}

function renderPaginationButtons() {
  paginationContainer.innerHTML = "";

  const pageCount = Math.ceil(commentsDetails.length / commentsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    if (i === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      renderComments();
      renderPaginationButtons();
    });

    paginationContainer.appendChild(btn);
  }
}

loadComments();
