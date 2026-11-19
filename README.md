# Git Workshop · Góc thành viên

Bảng React chạy local cho buổi thực hành Git và GitHub. Mỗi người làm một thẻ giới thiệu trong thư mục riêng rồi mở pull request vào `main`. Ứng dụng tự tìm các thẻ khi chạy và khi build.

## Chạy trên máy

Cần Node.js 20 trở lên và Git. Mở terminal ở thư mục dự án và chạy hai lệnh sau.

```bash
npm ci
npm run dev
```

Mở [http://127.0.0.1:5173](http://127.0.0.1:5173). Nút **Tạo thẻ của bạn** mở hướng dẫn và tải file mẫu.

Để đổi tài khoản người tổ chức hoặc liên kết GitHub, sao chép `.env.example` thành `.env` rồi chỉnh giá trị và khởi động lại ứng dụng. Ứng dụng dùng cấu hình mặc định nếu chưa có `.env`. Git bỏ qua `.env`. Các biến `VITE_*` xuất hiện trong mã gửi đến trình duyệt, vì vậy chỉ đặt cấu hình công khai ở đó. Ứng dụng hiện không cần mật khẩu hay token.

## Bài thực hành cho thành viên

1. Clone repo, sau đó tạo nhánh riêng từ `main`. Thay `ten-github` bằng username GitHub viết thường của bạn trong tất cả các lệnh bên dưới.

   ```bash
   git clone https://github.com/leanhxuan-se/github-training.git
   cd github-training
   git switch -c card/ten-github main
   ```

2. Tạo `members/ten-github/` và sao chép [templates/card.json](templates/card.json) vào đó. Bạn có thể làm trong trình quản lý tệp hoặc dùng các lệnh sau trong PowerShell hay Git Bash.

   ```bash
   mkdir members/ten-github
   cp templates/card.json members/ten-github/card.json
   ```

3. Sửa `members/ten-github/card.json` rồi chạy ứng dụng để xem kết quả. Để thêm ảnh đại diện, đặt ảnh vào `members/ten-github/img/` và điền tên ảnh trong `card.json`, ví dụ `"avatar": "img/anh-cua-minh.jpg"`. Giữ nguyên chữ hoa và chữ thường trong tên tệp.

   | Trường hoặc tệp | Cách sử dụng |
   | --- | --- |
   | `name`, `role`, `bio` | Tên hiển thị, vai trò và phần tự giới thiệu. `name` là trường bắt buộc. |
   | `tags` | Danh sách sở thích, kỹ năng hoặc điều bạn muốn học, ví dụ `["React", "Cà phê"]`. |
   | `initials` | Chữ hoặc ký hiệu ngắn trên avatar. Có thể xóa để ứng dụng lấy chữ cái từ tên. |
   | `theme` | Tùy chọn. Chọn `mint`, `lavender`, `peach`, `blue`, `yellow` hoặc `rose`. Để trống để ứng dụng tự gán màu. |
   | `pattern` | `orbit`, `arches`, `grid`, `steps`, `petals`, `waves` hoặc `none`. |
   | `avatar` | Đường dẫn ảnh đại diện tính từ `card.json`. Hỗ trợ `.webp`, `.png`, `.jpg`, `.jpeg` và `.avif` trong `img/`. Khi để trống, ứng dụng tự tìm `img/avatar.webp`, `img/avatar.png`, `img/avatar.jpg` hoặc `img/avatar.jpeg`. |
   | `cover` | Đường dẫn ảnh bìa trong `img/`, ví dụ `"cover": "img/anh-bia.jpg"`. Hỗ trợ cùng định dạng với `avatar`. Khi để trống, ứng dụng tự tìm `img/cover.webp`, `img/cover.png`, `img/cover.jpg` hoặc `img/cover.jpeg`. Nếu chưa có ảnh, thẻ dùng họa tiết trên nền trung tính. |

   Khi `theme` để trống, ứng dụng tự gán màu trang trí thẻ dựa trên username GitHub. Màu tự gán giữ nguyên khi tải lại hoặc thêm thành viên mới.

4. Commit thư mục của bạn rồi push nhánh riêng.

   ```bash
   git status
   git add members/ten-github/
   git commit -m "Add member card for ten-github"
   git push -u origin card/ten-github
   ```

5. Mở pull request trên GitHub với **base** là `leanhxuan-se/github-training:main` và **compare** là `card/ten-github`. Nếu bạn chưa có quyền push vào repo, hãy fork repo, clone bản fork và dùng nhánh `card/ten-github` trên fork làm **compare**.

## Dành cho người tổ chức

- Cập nhật thông tin của bạn ở [members/leanhxuan-se/card.json](members/leanhxuan-se/card.json). Có thể chỉnh [thẻ mẫu](templates/card.json) trước khi mời mọi người tham gia.
- Bảng hiển thị các thẻ trong `members/`. Mỗi thư mục tương ứng với một người.
- Sau khi merge các pull request, chạy `git switch main`, `git pull --ff-only` rồi `npm run dev`. Nếu máy chưa cài thư viện hoặc lockfile vừa đổi, chạy `npm ci` trước.
- Chọn **Trình chiếu** để mở bảng toàn màn hình. Cuộn nếu có nhiều thẻ và nhấn `Esc` để quay lại.
- Có thể kiểm tra bản build bằng `npm run build` và `npm run preview`, sau đó mở [http://127.0.0.1:4173](http://127.0.0.1:4173).
