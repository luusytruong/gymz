const btnShowPasswords = document.querySelectorAll('.show-password');

btnShowPasswords.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const passwordInput = this.previousElementSibling;
        const eyeIcon = this.querySelector('.show-password i');

        // Lưu trạng thái hiện tại của mật khẩu
        const isPasswordShown = passwordInput.type === 'text';

        // Thay đổi type của password
        passwordInput.type = isPasswordShown ? 'password' : 'text';

        // Thêm hoặc xóa class "active" cho icon
        if (isPasswordShown) {
            eyeIcon.classList.remove('active');
        } else {
            eyeIcon.classList.add('active');
        }
    });
});
