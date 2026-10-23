# Trần Huỳnh Giác — Personal Engineering Portfolio

Trang web portfolio cá nhân chuẩn Minimalist & Human-Centric dành cho Software Engineering Intern (Java Backend), được xây dựng bằng Vanilla Web (HTML5, CSS3, ES6+ JavaScript thuần) với mục tiêu: **nhanh, nhẹ, không phụ thuộc thư viện ngoài và tối ưu trải nghiệm đọc của nhà tuyển dụng**.

---

## 1. Cấu trúc thư mục

```text
MyPortfolio/
├── index.html         # Khung HTML5 ngữ nghĩa, hỗ trợ SEO & Accessibility (a11y)
├── style.css          # Giao diện responsive 1 cột, Dark/Light theme, zero-layout-shift navbar
├── content.js         # Từ điển dữ liệu đa ngôn ngữ tách rời (Song ngữ VI / EN)
├── script.js          # Logic Vanilla JS: i18n toggle, theme switch, clipboard copy fallback
├── .gitignore         # Loại bỏ file rác hệ điều hành và IDE
├── images/            # Chứa ảnh cá nhân (avatar.png)
└── README.md          # Tài liệu hướng dẫn sử dụng & triển khai
```

---

## 2. Đặc điểm kỹ thuật nổi bật

1. **Zero Layout Shift (CLS = 0) khi đổi ngôn ngữ:**
   - Header chia theo grid cố định 3 cột: `brand (190px)`, `nav (flex item cố định 96px/mục)`, `controls (190px)`.
   - Chuyển đổi qua lại giữa tiếng Việt và tiếng Anh mà không làm nhảy vị trí của bất kỳ nút hay thành phần nào trên thanh điều hướng.

2. **Chống nháy giao diện (FOUC Prevention):**
   - Đọc và thiết lập thuộc tính `data-theme` trực tiếp ngay trong thẻ `<head>` trước khi DOM render.

3. **Tách rời dữ liệu và giao diện (Separation of Concerns):**
   - Toàn bộ nội dung chữ nằm gọn trong `content.js` với các data attribute `data-i18n`. Khi cần chỉnh sửa nội dung, chỉ cần cập nhật file JavaScript này.

4. **Sao chép thông tin liên hệ an toàn (Fallback Clipboard API):**
   - Hỗ trợ cả `navigator.clipboard.writeText` và fallback `document.execCommand('copy')` chạy tốt ngay cả trên môi trường `file://` hoặc trình duyệt cũ.

5. **Bộ gõ & Font chuẩn Editorial:**
   - Headings dùng `Source Serif 4`, nội dung dùng `Inter`, tương phản màu đạt chuẩn WCAG 2.2 AA.

---

## 3. Hướng dẫn chạy thử (Local Development)

### Cách 1: Sử dụng VS Code Live Server
1. Mở thư mục `MyPortfolio` bằng VS Code.
2. Cài extension **Live Server** (nếu chưa có).
3. Nhấp chuột phải vào `index.html` $\rightarrow$ chọn **Open with Live Server**.

### Cách 2: Sử dụng Python
Mở terminal tại thư mục `MyPortfolio` và gõ:
```bash
python -m http.server 8000
```
Sau đó truy cập: `http://localhost:8000`

### Cách 3: Mở trực tiếp
Mở file `index.html` trực tiếp bằng bất kỳ trình duyệt nào (Chrome, Edge, Firefox).

---

## 4. Chuẩn bị ảnh đại diện

Để ảnh hiển thị hoàn hảo nhất:
1. Tạo thư mục `images` (nếu chưa có).
2. Đặt file ảnh chân dung của bạn vào `images/avatar.png`.

*Ghi chú: Nếu chưa có file `images/avatar.png`, hệ thống tự động fallback về ảnh mặc định ở thư mục cha.*

---

## 5. Hướng dẫn khởi tạo Git & Commit chuẩn

Để biến thư mục này thành Git repository và commit theo chuẩn **Conventional Commits**:

```bash
# 1. Di chuyển vào thư mục MyPortfolio
cd "D:\Workspace\Self_Learning\IT-sensei\build-cv\MyPortfolio"

# 2. Khởi tạo Git
git init

# 3. Thêm toàn bộ file vào staging
git add .

# 4. Commit chuẩn Conventional Commits
git commit -m "feat: initialize personal engineering portfolio website"

# 5. Đổi nhánh mặc định sang main
git branch -M main
```

---

## 6. Hướng dẫn đưa lên GitHub Pages (Miễn phí)

1. Tạo một repository mới trên GitHub (ví dụ: `my-portfolio` hoặc `<username>.github.io`).
2. Liên kết remote và đẩy code:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Truy cập vào **Repository Settings** $\rightarrow$ **Pages**:
   - Source: Chọn `Deploy from a branch`.
   - Branch: Chọn `main` / `/(root)`.
   - Nhấn **Save**.
4. Website của bạn sẽ hoạt động tại: `https://<your-username>.github.io/<repo-name>/`.
