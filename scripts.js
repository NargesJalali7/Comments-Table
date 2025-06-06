let commentsDetails = [];
const tableBody = document.getElementById("table-body");
const paginationContainer = document.querySelector(".pagination");

const commentsPerPage = 10;
let currentPage = 1;
let currentChunk = 0;

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
  const pagesPerChunk = 5;
  const totalChunks = Math.ceil(pageCount / pagesPerChunk);

  if (pageCount === 0) return;

  const previousBotton = document.createElement("button");
  previousBotton.innerText = "Previous";
  previousBotton.disabled = currentChunk === 0;
  previousBotton.addEventListener("click", () => {
    if (currentChunk > 0) {
      currentChunk--;
      currentPage = currentChunk * pagesPerChunk + 1;
      renderComments();
      renderPaginationButtons();
    }
  });
  paginationContainer.appendChild(previousBotton);

  const startPage = currentChunk * pagesPerChunk + 1;
  const endPage = Math.min(startPage + pagesPerChunk - 1, pageCount);

  for (let i = startPage; i <= endPage; i++) {
    const botton = document.createElement("button");
    botton.innerText = i;
    if (i === currentPage) {
      botton.classList.add("active");
    }
    botton.addEventListener("click", () => {
      currentPage = i;
      renderComments();
      renderPaginationButtons();
    });
    paginationContainer.appendChild(botton);
  }

  const nextBotton = document.createElement("button");
  nextBotton.innerText = "Next";
  nextBotton.disabled = currentChunk >= totalChunks - 1;
  nextBotton.addEventListener("click", () => {
    if (currentChunk < totalChunks - 1) {
      currentChunk++;
      currentPage = currentChunk * pagesPerChunk + 1;
      renderComments();
      renderPaginationButtons();
    }
  });
  paginationContainer.appendChild(nextBotton);
}

loadComments();
