let currentPage = 1;
const commentsPerPage = 10;
const tableBody = document.getElementById("table-body");
const paginationContainer = document.querySelector(".pagination");

function loadComments(page = 1) {
  fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${commentsPerPage}`)
      .then(response => {
        const totalComments = parseInt(response.headers.get('x-total-count'), 10);
        return response.json().then(data => ({ data, totalComments }));
      })
      .then(({ data, totalComments }) => {
        renderComments(data);
        renderPagination(totalComments);
      })
      .catch(error => console.error('Error loading comments:', error));
}

function renderComments(comments) {
  let rows = '';
  comments.forEach(comment => {
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

function renderPagination(totalComments) {
  const totalPages = Math.ceil(totalComments / commentsPerPage);

  let paginationHTML = '';

  paginationHTML += `
    <button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
      Previous
    </button>
  `;

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    paginationHTML += `<button class="pagination-btn" onclick="changePage(1)">1</button>`;
    if (startPage > 2) paginationHTML += `<span class="pagination-dots">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
        ${i}
      </button>
    `;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) paginationHTML += `<span class="pagination-dots">...</span>`;
    paginationHTML += `<button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
  }

  paginationHTML += `
    <button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
      Next
    </button>
  `;

  paginationContainer.innerHTML = paginationHTML;
}

function changePage(newPage) {
  if (newPage < 1 || newPage > Math.ceil(500 / commentsPerPage)) return; // 500 is total comments in this API
  currentPage = newPage;
  loadComments(currentPage);
}

loadComments(currentPage);