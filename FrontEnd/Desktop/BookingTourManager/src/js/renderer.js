// File: renderer.js

// Lấy các phần tử HTML
const tourForm = document.getElementById('addTourForm');
const tourList = document.getElementById('tourList');

// Mảng chứa danh sách tour
let tours = [];

// Xử lý sự kiện khi người dùng thêm tour
tourForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Lấy tên tour từ input
  const tourName = document.getElementById('tourName').value;

  // Kiểm tra nếu tên tour không rỗng
  if (tourName.trim() !== "") {
    // Thêm tour mới vào danh sách
    tours.push(tourName);
    
    // Xóa nội dung input sau khi thêm
    document.getElementById('tourName').value = '';

    // Cập nhật giao diện
    renderTourList();
  }
});

// Hàm hiển thị danh sách tour
function renderTourList() {
  // Xóa danh sách cũ
  tourList.innerHTML = '';

  // Tạo các phần tử li cho từng tour
  tours.forEach((tour, index) => {
    const li = document.createElement('li');
    li.textContent = tour;
    tourList.appendChild(li);
  });
}