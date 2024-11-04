/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Chỉ định các file có thể chứa class của TailwindCSS
      "./public/index.html" // Nếu bạn có file HTML nào khác, hãy thêm vào đây
    ],
    theme: {
      extend: {}, // Bạn có thể mở rộng chủ đề mặc định của Tailwind ở đây
    },
    plugins: [],
  }
  