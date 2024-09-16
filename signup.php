<?php
include_once "./part/header.php";
?>

<body>
    <div class="container">
        <div class="container-wrapper">
            <form action="#" method="POST" id="signupForm" class="form-signup">
                <h2>Đăng ký</h2>
                <div class="form-group">
                    <label for="fullname">Họ tên</label>
                    <input type="text" id="fullname" name="fullname" placeholder="Họ và tên" required>
                </div>
                <div class="form-group">
                    <label for="date">Ngày sinh</label>
                    <input type="date" id="date" name="date" placeholder=" " >
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder=" example@gmail.com " >
                </div>
                <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input type="text" id="phone" name="phone" placeholder="03xx.xxx.xxx " required>
                </div>
                <div class="form-group">
                    <label for="password">Mật Khẩu</label>
                    <div class="password-wrapper">
                        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required>
                        <button class="show-password">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Nhập lại mật Khẩu</label>
                    <div class="password-wrapper">
                        <input type="password" id="confirm-password" name="password" placeholder="Nhập lại mật khẩu" >
                        <button class="show-password">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div id="passwordError"></div>
                <input type="submit" value="Đăng ký">
                <div class="have-account">
                    Bạn đã có tài khoản?
                    <a href="login.php">
                        Đăng nhập
                    </a>
                </div>
            </form>
        </div>
    </div>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <script src="./assets/signupEvent.js"></script>
    <script src="./assets/processSignUp.js"></script>
</body>