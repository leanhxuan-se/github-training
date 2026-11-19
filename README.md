# Git Workshop · Góc thành viên

Bảng React chạy local cho buổi thực hành Git và GitHub. Mỗi người làm một thẻ giới thiệu trong thư mục riêng rồi mở pull request vào `main`. Ứng dụng tự tìm các thẻ khi chạy và khi build.

## Chạy trên máy

Cần Node.js 20 trở lên và Git. Mở terminal ở thư mục dự án và chạy hai lệnh sau.

```bash
npm ci
npm run dev
```

Mở [http://127.0.0.1:5173](http://127.0.0.1:5173). Nút **Tạo thẻ của bạn** mở hướng dẫn và tải file mẫu.

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

3. Sửa `members/ten-github/card.json` rồi chạy ứng dụng để xem kết quả. Bạn có thể sửa nội dung, đổi màu, chọn họa tiết hoặc lưu ảnh riêng trong cùng thư mục.

   | Trường hoặc tệp | Cách sử dụng |
   | --- | --- |
   | `name`, `role`, `bio` | Tên hiển thị, vai trò và phần tự giới thiệu. `name` là trường bắt buộc. |
   | `tags` | Danh sách sở thích, kỹ năng hoặc điều bạn muốn học, ví dụ `["React", "Cà phê"]`. |
   | `initials` | Chữ hoặc ký hiệu ngắn trên avatar. Có thể xóa để ứng dụng lấy chữ cái từ tên. |
   | `theme` | `mint`, `lavender`, `peach`, `blue`, `yellow` hoặc `rose`. |
   | `pattern` | `orbit`, `arches`, `grid`, `steps`, `petals`, `waves` hoặc `none`. |
   | `avatar.webp`, `cover.webp` | Tùy chọn. Ảnh đại diện và nền tự thiết kế. Có thể dùng `.png`, `.jpg` hoặc `.jpeg` với cùng tên gốc. |

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
- Khi có thẻ thành viên đầu tiên, bảng sẽ tự ẩn năm thẻ minh họa. Mỗi thư mục trong `members/` tương ứng với một người.
- Sau khi merge các pull request, chạy `git switch main`, `git pull --ff-only` rồi `npm run dev`. Nếu máy chưa cài thư viện hoặc lockfile vừa đổi, chạy `npm ci` trước.
- Chọn **Trình chiếu** để mở bảng toàn màn hình. Cuộn nếu có nhiều thẻ và nhấn `Esc` để quay lại.
- Có thể kiểm tra bản build bằng `npm run build` và `npm run preview`, sau đó mở [http://127.0.0.1:4173](http://127.0.0.1:4173).
