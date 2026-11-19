# Hướng dẫn Git & GitHub cơ bản cho người mới

Tài liệu dành cho người mới làm quen với Git và GitHub: từ tạo tài khoản, cài đặt, đến làm việc nhóm và xử lý các tình huống hay gặp. Các lệnh Git chạy trong Terminal của VS Code, Git Bash (Windows), hoặc Terminal (macOS/Linux); những lệnh thao tác thư mục phụ thuộc từng shell sẽ được ghi chú riêng.

## 0. Các khái niệm cần biết trước

- **Git**: phần mềm cài trên máy, ghi lại lịch sử thay đổi của mã nguồn.
- **GitHub**: website lưu repository trên mạng để nhiều người cùng làm việc, review code.
- **Repository (repo)**: thư mục dự án cùng toàn bộ lịch sử thay đổi.
- **Local / Remote**: bản trên máy bạn / bản trên GitHub (remote mặc định tên là `origin`).
- **Commit**: một lần lưu thay đổi kèm lời nhắn mô tả.
- **Branch (nhánh)**: dòng làm việc riêng, không ảnh hưởng nhánh khác.
- **Pull Request (PR)**: đề nghị gộp nhánh của bạn vào nhánh chung để người khác review.

Quy ước trong tài liệu: nhánh chính là `main`, nhánh phát triển chung của nhóm là `dev`, nhánh cá nhân đặt theo dạng `feature/ten-tinh-nang`.

## 1. Tạo tài khoản GitHub

1. Vào github.com, bấm **Sign up**.
2. Nhập email, mật khẩu, **username** (nên đặt nghiêm túc vì sẽ xuất hiện trong CV, link dự án).
3. Giải captcha, nhập mã xác minh gửi về email.
4. Chọn gói **Free** là đủ dùng.
5. Nên bật xác thực 2 bước: Settings → Password and authentication → Two-factor authentication.

## 2. Cài đặt Git, kết nối GitHub và thực hiện lệnh đầu tiên

**Mục tiêu:** Sau phần này, bạn có thể mở Terminal trong VS Code, chạy các lệnh Git, kết nối với GitHub và tải một repository về máy bằng `git clone`. Hướng dẫn chính dành cho **Windows 10/11**; người dùng macOS/Linux xem lưu ý tại mục 2.2.

> **Phân biệt:** Git là công cụ chạy trên máy, GitHub là nơi lưu repository trên mạng, còn VS Code là trình soạn thảo tích hợp Terminal. Cài VS Code không đồng nghĩa với đã cài Git.

### 2.1 Chuẩn bị

1. Có tài khoản GitHub (xem mục 1) và đăng nhập được tại <https://github.com>.
2. Cài **Visual Studio Code** từ <https://code.visualstudio.com/download> nếu máy chưa có.
3. Có kết nối Internet để tải Git, đăng nhập GitHub và clone repository.

### 2.2 Tải, cài đặt Git và mở Terminal trong VS Code

**Trên Windows:**

1. Vào trang tải chính thức: <https://git-scm.com/install/win>.
2. Chọn bản Git for Windows phù hợp (thông thường là **x64 Setup** trên máy Windows 64-bit dùng CPU Intel/AMD), tải file `.exe` và mở bộ cài.
3. Ở phần lớn màn hình, có thể giữ tùy chọn mặc định. Chú ý ba lựa chọn sau nếu bộ cài hiển thị:
   - **Adjusting your PATH environment:** chọn **Git from the command line and also from 3rd-party software** để VS Code/PowerShell nhận được lệnh `git`.
   - **Credential Helper:** chọn **Git Credential Manager** để dễ đăng nhập GitHub bằng HTTPS.
   - **Default editor:** có thể chọn Visual Studio Code nếu tùy chọn này xuất hiện, hoặc giữ mặc định.
4. Nhấn **Install** rồi **Finish**. Nếu VS Code đang mở, hãy đóng và mở lại để nhận cấu hình PATH mới.
5. Trong VS Code, chọn **Terminal → New Terminal**. Trên Windows có thể sử dụng **PowerShell** (không bắt buộc dùng Git Bash).

Kiểm tra Git đã hoạt động:

```bash
git --version
```

Ví dụ kết quả: `git version 2.xx.x.windows.1`. Nếu terminal báo `git is not recognized`, hãy mở lại VS Code; nếu vẫn lỗi, kiểm tra cài đặt Git/PATH.

**Trên macOS:** có thể cài bằng `brew install git` (nếu đã có Homebrew), hoặc chạy `git --version` để nhận hướng dẫn cài Xcode Command Line Tools khi cần.

**Trên Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install git
```

Sau đó đều kiểm tra bằng `git --version` trong Terminal.

### 2.3 Khai báo danh tính Git (làm một lần trên mỗi máy)

Trong Terminal VS Code, thay tên/email mẫu bằng thông tin bạn sử dụng:

```bash
git config --global user.name "Ten Cua Ban"
git config --global user.email "email-dang-ky-github@example.com"
git config --global init.defaultBranch main
```

- `user.name`: tên hiển thị với vai trò tác giả commit (không bắt buộc phải trùng GitHub username).
- `user.email`: nên là email đã xác minh trên GitHub, hoặc địa chỉ **GitHub noreply email** nếu muốn giữ riêng tư; GitHub dùng email này để liên kết commit với tài khoản.
- `init.defaultBranch main`: đặt tên nhánh ban đầu là `main` cho **repository mới tạo bằng `git init`**; không đổi tên nhánh của repo đã clone.
- `--global`: áp dụng cho tài khoản người dùng hiện tại trên máy, không chỉ một project.

Kiểm tra:

```bash
git config --global --list
```

**Lưu ý:** Bước này chỉ thiết lập **thông tin tác giả commit**, *chưa phải đăng nhập GitHub*.

### 2.4 Thiết lập cách kết nối GitHub: HTTPS hoặc SSH

Bạn chỉ cần chọn **một** trong hai cách dưới đây. **HTTPS + Git Credential Manager** dễ bắt đầu nhất trên Windows; **SSH** dùng khóa để xác thực và là giao thức được minh họa trong các lệnh từ mục 3 trở đi của tài liệu này.

#### Cách A — HTTPS + Git Credential Manager (khuyên dùng cho người mới trên Windows)

1. Đảm bảo đã chọn **Git Credential Manager** khi cài Git ở mục 2.2.
2. Có thể kiểm tra cấu hình bằng lệnh:

   ```bash
   git config --show-origin --get credential.helper
   ```

   Nếu kết quả có giá trị `manager` thì Git đang dùng Git Credential Manager. Nếu chưa có giá trị và máy đã cài sẵn Git Credential Manager, có thể cấu hình bằng:

   ```bash
   git config --global credential.helper manager
   ```

3. Khi thao tác Git yêu cầu xác thực (ví dụ clone repository **private**, hoặc push), Git Credential Manager sẽ hướng dẫn đăng nhập qua trình duyệt và cấp quyền cho ứng dụng. Làm theo các bước trên màn hình.
4. Bạn **không cần tự tạo Personal Access Token** cho cách đăng nhập qua trình duyệt này. Với repository **public**, `git clone` có thể chạy ngay mà không cần đăng nhập.

Định dạng URL HTTPS:

```text
https://github.com/CHU-REPO/ten-repo.git
```

#### Cách B — SSH (phù hợp nếu muốn dùng đúng các lệnh ở mục 3 và mục 6)

Bước 1. Mở **Git Bash** (được cài cùng Git for Windows) hoặc Terminal có lệnh `ssh-keygen`. Tạo cặp khóa SSH:

```bash
ssh-keygen -t ed25519 -C "email-dang-ky-github@example.com"
```

- Nhấn **Enter** để dùng vị trí lưu khóa mặc định (`~/.ssh/id_ed25519`) nếu chưa có khóa cần giữ lại. Nếu file khóa đã tồn tại, **không ghi đè**; hãy chọn tên file khác hoặc dùng khóa hiện có.
- Bạn có thể đặt passphrase để bảo vệ private key. Khi dùng khóa, máy có thể yêu cầu nhập passphrase này.

Bước 2. Xem **khóa công khai** (đây là khóa được phép đưa lên GitHub):

```bash
cat ~/.ssh/id_ed25519.pub
```

Nếu dùng PowerShell trên Windows, có thể xem nội dung bằng:

```powershell
Get-Content "$HOME\.ssh\id_ed25519.pub"
```

Bước 3. Sao chép **toàn bộ một dòng** khóa công khai (thường bắt đầu bằng `ssh-ed25519`), vào GitHub → **Settings → SSH and GPG keys → New SSH key** → đặt tên thiết bị → dán khóa → **Add SSH key**. Nếu GitHub yêu cầu xác nhận, hãy hoàn tất xác thực tài khoản.

Bước 4. Kiểm tra kết nối:

```bash
ssh -T git@github.com
```

Ở lần đầu kết nối, hãy kiểm tra dấu vân tay khóa máy chủ theo tài liệu chính thức của GitHub trước khi xác nhận. Khi thành công, GitHub thông báo tương tự: `Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.`

**Bảo mật:** Chỉ sao chép file có đuôi `.pub` lên GitHub. **Không chia sẻ** private key `id_ed25519` hoặc passphrase.

Định dạng URL SSH:

```text
git@github.com:CHU-REPO/ten-repo.git
```

> **Đọc các mục tiếp theo:** Mục 3 và mục 6 đang dùng URL **SSH** (`git@github.com:...`). Nếu bạn chọn HTTPS ở Cách A, chỉ cần lấy URL tại tab **HTTPS** trên nút **Code** của GitHub và dùng dạng `https://github.com/CHU-REPO/ten-repo.git` thay cho URL SSH trong các lệnh `git clone`/`git remote add`. Các thao tác `git status`, `git add`, `git commit`, `git fetch`, `git pull`... vẫn như nhau.

### 2.5 Thực hành: `git clone` ngay trong Terminal của VS Code

**Bước 1.** Trên GitHub, mở repository muốn tải → nhấn **Code** → chọn **HTTPS** (Cách A) hoặc **SSH** (Cách B) → nhấn nút sao chép URL.

**Bước 2.** Trong VS Code, mở **Terminal → New Terminal**. Ví dụ dưới đây dùng **PowerShell trên Windows**. Chọn thư mục chứa project (nếu `GitProjects` đã tồn tại, bỏ qua lệnh `mkdir`):

```powershell
cd $HOME
mkdir GitProjects
cd GitProjects
```

**Bước 3.** Chạy **một trong hai lệnh** sau, thay URL mẫu bằng URL bạn vừa sao chép từ GitHub:

```bash
# HTTPS (Cách A)
git clone https://github.com/CHU-REPO/ten-repo.git
```

hoặc:

```bash
# SSH (Cách B)
git clone git@github.com:CHU-REPO/ten-repo.git
```

Nếu dùng HTTPS với repository private và được yêu cầu đăng nhập, hãy làm theo cửa sổ Git Credential Manager. Tài khoản phải có quyền truy cập repository đó.

**Bước 4.** Vào thư mục vừa clone, kiểm tra kết quả và mở bằng VS Code:

```bash
cd ten-repo
git status
git remote -v
code .
```

- `git status`: xem nhánh và trạng thái thay đổi của repository.
- `git remote -v`: xem các URL remote; remote chính thường tên `origin`.
- `code .`: mở thư mục hiện tại trong VS Code. Nếu lệnh `code` chưa hoạt động, dùng **File → Open Folder** trong VS Code.

**Kết quả mong đợi:** Thư mục `GitProjects/ten-repo` chứa mã nguồn tải từ GitHub và thư mục ẩn `.git`. Lệnh `git status` không báo `not a git repository`.

### 2.6 Lệnh Git đầu tiên: tự tạo repository trên máy và commit

Đây là **bài thực hành riêng**, khác với thao tác `git clone` ở mục 2.5. `git init` tạo repository mới từ một thư mục chưa có Git, còn `git clone` tải một repository đã có sẵn.

Mở Terminal trong **một thư mục thực hành khác**, rồi chạy từng lệnh:

```bash
mkdir hello-git
cd hello-git
git init                      # tạo repository Git trong thư mục hiện tại
echo "# Hello Git" > README.md
git status                    # kiểm tra file mới chưa được theo dõi
git add README.md             # đưa file vào staging
git commit -m "docs: add README"
git log --oneline             # xem lịch sử commit
```

Nếu bạn đang dùng PowerShell, hãy chạy `mkdir` và `cd` **trên hai dòng riêng** như ví dụ để tương thích với cả phiên bản PowerShell cũ.

Luồng cơ bản: **sửa file → `git add` (chọn thay đổi) → `git commit` (lưu vào lịch sử local) → `git push` (đẩy commit lên remote, khi đã cấu hình remote và có quyền ghi)**.

### 2.7 Xử lý lỗi thường gặp lúc cài đặt và clone

| Hiện tượng | Cách kiểm tra / xử lý |
| --- | --- |
| `git is not recognized` | Đóng/mở lại VS Code; kiểm tra Git đã được cài và được thêm vào PATH. |
| `Repository not found` | Kiểm tra URL, repo có tồn tại không, bạn có được cấp quyền truy cập repo private không. |
| `Authentication failed` khi dùng HTTPS | Kiểm tra đăng nhập GitHub/Git Credential Manager và quyền của tài khoản. |
| `Permission denied (publickey)` | Bạn đang dùng SSH nhưng khóa SSH chưa được thêm/nhận đúng; kiểm tra mục 2.4 Cách B, hoặc sử dụng URL HTTPS. |
| `destination path already exists and is not an empty directory` | Thư mục đích đã tồn tại và không rỗng; chọn tên thư mục khác hoặc dùng thư mục đã clone từ trước. |
| `fatal: not a git repository` | Terminal đang ở ngoài thư mục repository; dùng `cd ten-repo` để vào đúng project. |

**Sau khi hoàn thành mục 2**, bạn đã có Git trên máy, đã khai báo danh tính commit, đã chọn được cách kết nối GitHub và thực hiện được `git clone` trong Terminal VS Code. Từ mục 3, tài liệu sẽ giới thiệu thêm tạo repo, fork, nhánh và quy trình làm việc nhóm.

## 3. Tìm kiếm, tạo repository, fork và clone

### 3.1 Tìm kiếm repository

- Dùng ô tìm kiếm trên cùng của GitHub, gõ từ khoá rồi chọn tab **Repositories**.
- Lọc thêm bằng bộ lọc bên trái (Language, ...) hoặc cú pháp như `language:python stars:>1000`.
- Khi xem một repo, đọc **README**, mục **Issues** và **Contributing** để hiểu dự án.

### 3.2 Tạo repository mới trên GitHub

1. Bấm dấu **+** góc trên phải → **New repository**.
2. Đặt tên (không dấu, nối bằng dấu gạch ngang), chọn **Public** hoặc **Private**.
3. Có thể tick **Add a README**, chọn **.gitignore** theo ngôn ngữ và **License**.
4. Bấm **Create repository**.

Nếu đã có thư mục dự án trên máy (như bài 2.4) thì nối với repo vừa tạo:

```bash
git remote add origin git@github.com:TEN-BAN/hello-git.git
git push -u origin main
```

### 3.3 Fork và clone

- **Fork**: tạo một bản sao của repo người khác về tài khoản của bạn (nút **Fork** góc trên phải). Dùng khi bạn không có quyền ghi vào repo gốc.
- **Clone**: tải repo từ GitHub về máy.

```bash
# Bấm nút Code trên GitHub, chọn SSH, sao chép đường dẫn
git clone git@github.com:TEN-BAN/ten-repo.git
cd ten-repo
```

Nếu clone từ bản fork, hãy thêm repo gốc làm remote tên `upstream` để cập nhật code mới:

```bash
git remote add upstream git@github.com:CHU-REPO-GOC/ten-repo.git
git remote -v
```

## 4. Cấu hình repository nhiều người tham gia (dành cho chủ repo)

1. **Thêm thành viên**: Settings → Collaborators (hoặc Teams nếu là Organization) → Add people → chọn quyền (Write cho người code, Admin cho người quản lý).
2. **Tạo nhánh `dev`** từ `main` và đặt làm nhánh mặc định nếu nhóm làm việc chính trên `dev`: Settings → General → Default branch.
3. **Bảo vệ nhánh**: Settings → Branches → Add branch protection rule (hoặc Rulesets) cho `main` và `dev`:
   - Require a pull request before merging (không cho push thẳng).
   - Require approvals: ít nhất 1 người duyệt.
   - Require conversation resolution before merging.
   - Require status checks to pass (nếu có CI chạy test).
   - Block force pushes.
4. **Bật tự xoá nhánh sau khi merge**: Settings → General → Pull Requests → Automatically delete head branches.
5. **Thêm các file nền tảng vào repo**:
   - `README.md`: giới thiệu, cách chạy dự án.
   - `.gitignore`: loại file không đưa lên (thư mục build, file cấu hình riêng, mật khẩu...).
   - `CONTRIBUTING.md`: quy ước đặt tên nhánh, cách viết commit, quy trình PR.
   - `.github/pull_request_template.md`: mẫu mô tả PR để mọi người điền đủ thông tin.
6. **Không bao giờ commit** mật khẩu, khoá API, file `.env`. Nếu lỡ đẩy lên, phải đổi khoá ngay chứ không chỉ xoá file.

## 5. Tham gia một dự án có nhiều người làm (dành cho thành viên)

**Trường hợp A: được mời làm collaborator**

1. Chấp nhận lời mời trong email hoặc trang github.com/notifications.
2. Clone trực tiếp repo của dự án.
3. Làm việc trên nhánh riêng, đẩy nhánh đó lên repo chung rồi tạo PR.

**Trường hợp B: không có quyền ghi (dự án mã nguồn mở)**

1. Fork repo về tài khoản của bạn, clone bản fork.
2. Thêm remote `upstream` như mục 3.3.
3. Làm việc trên nhánh riêng, đẩy lên bản fork, tạo PR từ fork vào repo gốc.

Trước khi code, đọc README và CONTRIBUTING, và hỏi chủ repo nếu chưa rõ nhánh nào là nhánh chính của nhóm.

## 6. Quy trình chuẩn để bắt đầu code trong dự án nhiều người

```bash
# 1. Lần đầu: tải dự án về
git clone git@github.com:ORG/ten-repo.git
cd ten-repo

# 2. Mỗi lần bắt đầu việc mới: cập nhật nhánh dev
git switch dev
git pull origin dev

# 3. Tạo nhánh riêng từ dev
git switch -c feature/dang-nhap

# 4. Code, rồi kiểm tra và lưu từng phần nhỏ
git status
git add .
git commit -m "feat: add login form"

# 5. Trước khi đẩy: kéo code mới nhất của dev về nhánh mình
git fetch origin
git merge origin/dev          # có conflict thì xử lý theo mục 8

# 6. Đẩy nhánh lên GitHub
git push -u origin feature/dang-nhap

# 7. Lên GitHub bấm Compare & pull request, chọn base là dev
```

Sau đó:

- Mô tả rõ PR làm gì, chọn người review.
- Sửa theo góp ý bằng cách commit thêm và push lên cùng nhánh, PR tự cập nhật.
- Khi PR được duyệt và merge, xoá nhánh, rồi quay lại bước 2 cho công việc tiếp theo.

**Nguyên tắc vàng**: mỗi việc một nhánh, không code trực tiếp trên `main` hay `dev`, và luôn kéo `dev` mới nhất trước khi tạo nhánh.

## 7. Tạo nhánh và xoá nhánh ở local

```bash
git branch                         # liệt kê nhánh local (dấu * là nhánh đang đứng)
git branch -a                      # gồm cả nhánh remote
git switch -c feature/ten-moi      # tạo nhánh mới từ nhánh hiện tại và chuyển sang
git switch dev                     # chuyển nhánh
git branch -d feature/ten-cu       # xoá nhánh đã merge xong
git branch -D feature/ten-cu       # ép xoá nhánh (mất commit chưa merge, cẩn thận)
git push origin --delete feature/ten-cu   # xoá nhánh trên GitHub
git fetch --prune                  # dọn tham chiếu nhánh remote đã bị xoá
```

Lưu ý: không xoá được nhánh đang đứng, hãy `git switch` sang nhánh khác trước. (Lệnh `git checkout` cũng chuyển nhánh được, `git switch` là cách mới và dễ hiểu hơn.)

## 8. Viết commit và xử lý conflict

### 8.1 Cách viết commit tốt

- Mỗi commit chỉ làm **một việc**, commit thường xuyên với phần nhỏ.
- Dòng đầu ngắn gọn (khoảng 50-70 ký tự), viết ở thể mệnh lệnh, nêu **làm gì**.
- Có thể thêm tiền tố theo quy ước phổ biến:

| Tiền tố | Ý nghĩa |
| --- | --- |
| `feat:` | thêm tính năng |
| `fix:` | sửa lỗi |
| `docs:` | sửa tài liệu |
| `refactor:` | viết lại code, không đổi chức năng |
| `test:` | thêm hoặc sửa test |
| `chore:` | việc lặt vặt (cấu hình, thư viện) |

```bash
git commit -m "fix: handle empty password on login"
```

Tránh các lời nhắn như `update`, `fix bug`, `abc`, vì vài tháng sau không ai hiểu đã làm gì. Nếu muốn viết dài, chạy `git commit` không có `-m` để mở trình soạn thảo.

### 8.2 Conflict là gì?

Conflict (xung đột) xảy ra khi Git không tự gộp được vì **hai nhánh cùng sửa cùng một chỗ trong cùng một file** (hoặc một người sửa file, người kia xoá file). Git dừng lại và nhờ bạn quyết định giữ phần nào. Đây là chuyện bình thường khi làm nhóm, không phải lỗi hỏng gì cả.

Khi conflict, `git status` báo `both modified`, và file bị đánh dấu như sau:

```text
<<<<<<< HEAD
phần code của nhánh bạn đang đứng
=======
phần code đến từ nhánh được gộp vào
>>>>>>> origin/dev
```

### 8.3 Cách xử lý conflict

1. Chạy `git status` để biết file nào đang conflict.
2. Mở từng file, tìm các dấu `<<<<<<<`, `=======`, `>>>>>>>`.
3. Quyết định giữ phần của bạn, phần của người kia, hoặc kết hợp cả hai. Xoá hết các dòng dấu đánh dấu. Nếu chưa rõ ý nghĩa đoạn code kia, hãy hỏi người đã viết nó.
4. Chạy thử dự án để chắc code vẫn hoạt động.
5. Đánh dấu đã xử lý xong và hoàn tất:

```bash
git add ten-file-da-sua
git commit                      # với merge, Git tự gợi ý sẵn lời nhắn
```

Nếu giữa chừng muốn bỏ và làm lại từ đầu:

```bash
git merge --abort
```

Mẹo: các editor như VS Code có nút **Accept Current / Accept Incoming / Accept Both** ngay trên đoạn conflict. Để ít conflict hơn, hãy kéo `dev` về thường xuyên và chia việc để mỗi người sửa các file khác nhau.

## 9. Các tình huống thường gặp và cách xử lý

### 9.1 Đã push nhánh, tạo PR xong, đến lúc review thì báo conflict không merge được

**Nguyên nhân**: sau khi bạn tạo nhánh, `dev` đã có thêm commit của người khác sửa cùng chỗ với bạn.

**Cách xử lý**: giải quyết conflict **trên máy bạn** rồi push lại, PR sẽ tự hết báo lỗi.

```bash
git switch feature/dang-nhap
git fetch origin
git merge origin/dev            # Git báo conflict ở một số file

# Mở các file conflict, sửa tay như mục 8.3
git add .
git commit                      # chốt merge
git push                        # đẩy lên cùng nhánh, PR tự cập nhật
```

Sau đó kiểm tra lại PR trên GitHub: nút Merge sáng lên là xong. Báo người review để họ xem lại phần bạn vừa sửa.

Ghi chú: GitHub cũng có nút **Resolve conflicts** ngay trên PR cho trường hợp đơn giản, nhưng xử lý trên máy vẫn an toàn hơn vì bạn chạy thử được code.

### 9.2 Commit xong mới nhớ ra nhánh `dev` đã thay đổi, mà chưa kéo về nhánh của mình

Không cần làm lại gì cả. Commit của bạn vẫn nguyên, chỉ cần gộp `dev` mới nhất vào nhánh mình:

```bash
git fetch origin
git merge origin/dev
# Nếu có conflict thì xử lý theo mục 8.3, rồi chạy thử code
git push
```

Điều này đúng cả khi bạn đã push hoặc chưa push. Sau khi merge sẽ có thể màn hình vim thông báo, chỉ cần exit nếu không có thay đổi. Muốn lịch sử gọn hơn và nhánh chưa ai dùng chung, có thể dùng `git rebase origin/dev`, nhưng người mới nên ưu tiên `merge` vì không phải push ép.

### 9.3 Commit nhầm nhánh (ví dụ commit thẳng vào `dev` thay vì nhánh của mình)

Xử lý khi **chưa push**. Giả sử bạn đang đứng ở `dev` và vừa commit nhầm:

```bash
git log --oneline -3                  # xem mã commit nhầm, ví dụ a1b2c3d
git switch -c feature/dang-nhap       # tạo nhánh đúng NGAY tại đây, commit nhầm đi theo sang
git switch dev
git reset --hard origin/dev           # đưa dev về giống GitHub, commit nhầm biến mất khỏi dev
git switch feature/dang-nhap          # quay lại làm việc
```

Nếu nhánh đúng **đã tồn tại sẵn**, dùng cherry-pick để chép commit sang:

```bash
git switch feature/dang-nhap
git cherry-pick a1b2c3d
git switch dev
git reset --hard origin/dev
```

Cảnh báo:

- `git reset --hard` xoá thay đổi chưa commit ở nhánh đang đứng. Hãy chắc commit đã nằm an toàn ở nhánh đúng trước khi chạy.
- Nếu commit nhầm **đã push** lên nhánh dùng chung (`dev`, `main`), đừng tự xoá lịch sử. Hãy báo người quản lý repo và dùng `git revert a1b2c3d` để tạo commit hoàn tác.

### 9.4 Đang viết dở thì nhận ra mình đang đứng nhầm nhánh (chưa tạo nhánh riêng, chưa kéo code mới)

Ví dụ bạn mới mở dự án, sửa code ngay trên `dev` hoặc trên nhánh của việc khác, chưa commit. Có hai cách.

**Cách 1: tạo nhánh mới ngay tại chỗ** (nhanh nhất khi đang đứng ở `dev`). Thay đổi chưa commit sẽ đi theo sang nhánh mới:

```bash
git switch -c feature/dang-nhap
git add .
git commit -m "feat: add login form"
git fetch origin
git merge origin/dev          # kéo code mới nhất về nhánh mình
```

**Cách 2: cất tạm bằng stash** (dùng khi cần cập nhật `dev` trước hoặc đang ở nhánh của việc khác):

```bash
git stash push -u -m "code dang viet do"   # cất thay đổi, thư mục sạch trở lại
git switch dev
git pull origin dev                        # cập nhật dev mới nhất
git switch -c feature/dang-nhap            # tạo nhánh đúng từ dev mới
git stash pop                              # lấy code đang viết dở ra lại
```

Nếu `stash pop` báo conflict, xử lý như mục 8.3 (Git vẫn giữ stash cho đến khi bạn xử lý xong). Xem danh sách stash bằng `git stash list`.

## 10. Bảng tra cứu nhanh

| Việc cần làm | Lệnh |
| --- | --- |
| Xem trạng thái | `git status` |
| Xem lịch sử gọn | `git log --oneline` |
| Xem thay đổi chưa add | `git diff` |
| Đưa file vào staging | `git add ten-file` hoặc `git add .` |
| Lưu thay đổi | `git commit -m "feat: ..."` |
| Tải repo về | `git clone <url>` |
| Lấy thông tin mới (chưa gộp) | `git fetch origin` |
| Lấy và gộp nhánh từ remote | `git pull origin dev` |
| Đẩy nhánh lên GitHub | `git push -u origin ten-nhanh` (lần đầu), `git push` (các lần sau) |
| Tạo nhánh và chuyển sang | `git switch -c ten-nhanh` |
| Chuyển nhánh | `git switch ten-nhanh` |
| Gộp nhánh khác vào nhánh hiện tại | `git merge origin/dev` |
| Huỷ gộp khi đang conflict | `git merge --abort` |
| Cất tạm / lấy lại | `git stash push -u` / `git stash pop` |
| Chép một commit sang nhánh khác | `git cherry-pick <ma-commit>` |
| Hoàn tác commit đã push | `git revert <ma-commit>` |
| Xoá nhánh local | `git branch -d ten-nhanh` |

## 11. Những lỗi người mới hay gặp

- Quên `git pull` trước khi bắt đầu việc mới, dẫn đến conflict to về sau.
- Dùng `git add .` mà không xem `git status`, vô tình đưa cả file bí mật hoặc file rác lên repo.
- Dùng `git push --force` tuỳ tiện, có thể xoá mất commit của đồng đội. Nếu buộc phải dùng, hãy dùng `--force-with-lease` và chỉ trên nhánh của riêng mình.
- Dùng `git reset --hard` khi chưa chắc, làm mất code chưa commit.
- Gom quá nhiều thay đổi vào một commit hoặc một PR, khiến người review khó đọc.

Lời khuyên cuối: khi không chắc, hãy chạy `git status` và `git log --oneline` trước. Khi sắp làm điều mạo hiểm, tạo một nhánh sao lưu bằng `git branch backup-ten-nhanh` để luôn có đường quay lại.
