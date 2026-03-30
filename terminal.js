/* =========================================
   TERMINAL UI FRAMEWORK - JS CORE v1.1
   ========================================= */

const Terminal = {
    // 1. Sistem Modal
    modal: {
        open: function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.add('is-open');
        },
        close: function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.remove('is-open');
        }
    },

    // 2. Sistem Tabs
    tab: function(btnElement, targetId) {
        const wrapper = btnElement.closest('.t-tabs-wrapper');
        if (!wrapper) return;
        
        wrapper.querySelectorAll('.t-tab-btn').forEach(btn => btn.classList.remove('active'));
        wrapper.querySelectorAll('.t-tab-content').forEach(content => content.classList.remove('active'));
        
        btnElement.classList.add('active');
        wrapper.querySelector('#' + targetId).classList.add('active');
    },

    // 3. Sistem Notifikasi (Toast)
    toast: function(message, type = 'normal', duration = 3000) {
        let container = document.querySelector('.t-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 't-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `t-toast ${type === 'danger' ? 'danger' : ''}`;
        toast.innerHTML = `> ${message}`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    // 4. Sistem Accordion
    accordion: function(btnElement) {
        btnElement.classList.toggle('active');
        const content = btnElement.nextElementSibling;
        if (content && content.classList.contains('t-accordion-content')) {
            content.classList.toggle('active');
        }
    },

    // 5. Sistem Input Aksi (Toggle Show/Hide)
    toggleInputAction: function(inputId, btnElement) {
        const input = document.getElementById(inputId);
        if (!input) return;

        if (input.type === "password") {
            input.type = "text";
            btnElement.innerText = "[ HIDE ]";
            btnElement.style.color = "var(--t-green)";
        } else {
            input.type = "password";
            btnElement.innerText = "[ SHOW ]";
            btnElement.style.color = "var(--t-green-dim)";
        }
    }
};

// Global Listener: Tutup modal jika klik di luar area
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('t-modal')) {
        event.target.classList.remove('is-open');
    }
});