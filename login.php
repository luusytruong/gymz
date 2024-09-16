<?php
include_once "./part/header.php";
?>

<body>
    <div class="container">
        <div class="container-wrapper">
            <form action="#" method="POST" class="form-login">
                <h2>Đăng nhập</h2>
                <div class="form-group">
                    <label for="email">Tài khoản</label>
                    <input type="email" id="email" name="username" placeholder="Nhập email của bạn" required>
                </div>
                <div class="form-group">
                    <label for="password">Mật khẩu</label>
                    <div class="password-wrapper">
                        <input type="password" id="password" name="password" placeholder="Nhập mật khẩu" required>
                        <button class="show-password">
                            <!-- <ion-icon name="eye-outline"></ion-icon> -->
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <input type="submit" value="Đăng Nhập">
                <div class="not-have-account">
                    Bạn chưa có tài khoản?
                    <a id="confirm-password" href="signup.php">
                        Đăng ký
                    </a>
                </div>
            </form>
        </div>
    </div>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <script src="./assets/loginEvent.js"></script>
    <script src="./js/processLogin.js"></script>
</body>