/* =========================================
   TERMINAL UI FRAMEWORK - JS CORE v1.2.1
   -----------------------------------------
   [CHANGE LOG]
   v1.2.1: - Splash screen query selector changed to class (.t-splash) 
             for better flexibility across different HTML IDs.
           - Added custom delay parameter for splash.close()
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
    },

    // 6. Sistem Splash Screen (Booting Sequence)
    splash: {
        // Parameter delay sekarang bisa diatur (default 800ms)
        close: function(customDelay = 800) {
            // Menggunakan querySelector berdasarkan class agar universal
            const splashEl = document.querySelector('.t-splash');
            if (splashEl) {
                setTimeout(() => {
                    splashEl.classList.add('hidden');
                    setTimeout(() => splashEl.remove(), 500); // Tunggu animasi CSS selesai
                }, customDelay); 
            }
        }
    }
};

// Global Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Tutup splash screen otomatis jika ada di halaman
    Terminal.splash.close();
});

document.addEventListener('click', function(event) {
    // Tutup modal jika klik di luar area konten
    if (event.target.classList.contains('t-modal')) {
        event.target.classList.remove('is-open');
    }
});