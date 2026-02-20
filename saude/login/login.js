const AuthManager = {
    init() {
        this.form = document.getElementById('loginForm');
        this.toastEl = document.getElementById('loginToast');
        this.toastBootstrap = bootstrap.Toast.getOrCreateInstance(this.toastEl);
        this.bindEvents();
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleLogin(e));
    },

    handleLogin(e) {
        e.preventDefault();

        if (!this.form.checkValidity()) {
            e.stopPropagation();
            this.form.classList.add('was-validated');
            return;
        }

        this.processAuthentication();
    },

    processAuthentication() {
        const username = document.getElementById('username').value;
        const userRole = document.getElementById('userRole').value;
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Autenticando...';

        setTimeout(() => {
            this.showFeedback('Acesso concedido! Redirecionando...', 'success');
            
            setTimeout(() => {
                window.location.href = '../medico/medico.html';
            }, 1500);
        }, 1200);
    },

    showFeedback(message, type = 'success') {
        const icon = document.getElementById('toastIcon');
        const msgSpan = document.getElementById('toastMessage');
        
        this.toastEl.classList.remove('bg-success', 'bg-danger');
        this.toastEl.classList.add(type === 'success' ? 'bg-success' : 'bg-danger');
        
        icon.className = type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-triangle-fill';
        msgSpan.textContent = message;
        
        this.toastBootstrap.show();
    }
};

document.addEventListener('DOMContentLoaded', () => AuthManager.init());