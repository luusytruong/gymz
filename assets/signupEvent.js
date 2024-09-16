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

const pwconfirm  = document.getElementById('confirm-password');


document.getElementById('signupForm').addEventListener('submit', function(e) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorDiv = document.getElementById('passwordError');
    
    if (password !== confirmPassword) {
        e.preventDefault(); // Ngăn chặn gửi form
        errorDiv.textContent = "Mật khẩu không khớp!";
        errorDiv.style.animation = 'error 1s ease-in-out forwards'; 
        // errorDiv.style.padding = '10px';
        pwconfirm.style.border = '1px red solid';
    } else {
        errorDiv.textContent = ""; // Xóa thông báo lỗi nếu đã khớp
        errorDiv.style.padding = '0';
        pwconfirm.style.border = '0';
        
    }
});