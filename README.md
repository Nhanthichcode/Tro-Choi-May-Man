# 🎉 TRANG WEB TRÒ CHƠI QUAY SỐ MAY MẮN 🎉

Chào mừng bạn đến với công cụ **Quay Số May Mắn**! Đây là một ứng dụng web tiện lợi, giao diện trực quan, giúp bạn dễ dàng tổ chức các chương trình bốc thăm trúng thưởng, mini-game hoặc chọn ngẫu nhiên một người may mắn từ danh sách có sẵn.

👉 **[THỬ NGAY TẠI ĐÂY](https://nhanthichcode.github.io/Tro-Choi-May-Man/)** 👈

---

## ✨ Tính Năng Nổi Bật

* **Tích hợp File Excel:** Không cần nhập tay thủ công! Chỉ cần tải lên file Excel đúng chuẩn, hệ thống sẽ tự động đọc dữ liệu.
* **Quay Số Ngẫu Nhiên & Minh Bạch:** Thuật toán chọn lọc ngẫu nhiên đảm bảo tính công bằng tuyệt đối cho mọi người chơi.
* **Giao Diện Thân Thiện:** Dễ sử dụng trên cả máy tính lẫn điện thoại, mượt mà và không cần cài đặt phần mềm.
* **Hoàn Toàn Miễn Phí:** Sử dụng ngay trên trình duyệt mà không tốn bất kỳ chi phí nào.

---

## 📊 Yêu Cầu Cấu Trúc File Excel

Để hệ thống đọc dữ liệu chính xác nhất, file Excel chứa danh sách của bạn **bắt buộc** phải tuân theo thứ tự 4 cột đầu tiên từ trái sang phải như bảng mẫu dưới đây:

| Cột A (`STT`) | Cột B (`MSSV`) | Cột C (`Họ Lót`) | Cột D (`Tên`) |
| :--- | :--- | :--- | :--- |
| 1 | 2200001 | Nguyễn Văn | A |
| 2 | 2200002 | Trần Thị | B |
| 3 | 2200003 | Lê Hoàng | C |
| 4 | 2200004 | Phạm | D |

**⚠️ Lưu ý quan trọng khi chuẩn bị file:**
* **Tuyệt đối giữ đúng thứ tự cột:** STT -> MSSV -> Họ Lót -> Tên. 
* **Bỏ dòng tiêu đề:** Nên xóa dòng tiêu đề (chứa chữ STT, MSSV, Họ Lót, Tên) ra khỏi file trước khi tải lên web để vòng quay không bốc trúng dòng này. File tải lên chỉ nên chứa các dòng dữ liệu.
* **Định dạng MSSV:** Nếu mã số sinh viên (MSSV) của bạn có số `0` đứng đầu, hãy bôi đen cột B trong Excel và chuyển định dạng (Format) sang **Text (Văn bản)** để tránh bị mất số.

---

## 🚀 Hướng Dẫn Sử Dụng

Chỉ với 3 bước đơn giản để tìm ra người may mắn:

1.  **Chuẩn bị dữ liệu:** Tạo một file Excel theo đúng cấu trúc mẫu ở trên.
2.  **Tải file lên:** Truy cập vào [Trang web Quay Số](https://nhanthichcode.github.io/Tro-Choi-May-Man/) và nhấn nút tải file Excel của bạn lên.
3.  **Bắt đầu quay:** Nhấn nút quay thưởng và hồi hộp chờ đợi cái tên may mắn nhất xuất hiện trên màn hình!
* Lưu Ý: để dễ quan sát, nên chỉnh thanh tốc độ và thời gian sóng lên khoản 70%

---

## 💻 Về Dự Án Này

Dự án này được phát triển nhằm mục đích cung cấp một công cụ bốc thăm nhanh gọn, tiện lợi cho các buổi tiệc, sự kiện hoặc livestream.

* **Tác giả:** [nhanthichcode](https://github.com/nhanthichcode)
* **Nền tảng:** Web (HTML, CSS, JavaScript)

> **Bảo mật dữ liệu:** Mọi dữ liệu từ file Excel của bạn chỉ được xử lý tạm thời ngay trên trình duyệt của bạn (Local). Không có bất kỳ thông tin nào được tải lên hay lưu lại trên máy chủ, đảm bảo an toàn tuyệt đối.

---
⭐ *Nếu bạn thấy công cụ này hữu ích, đừng quên thả sao (star) cho repository và chia sẻ cho bạn bè nhé!*
