/* =========================================
   TERMINAL UI FRAMEWORK - JS CORE v1.3.0
   -----------------------------------------
   [CHANGE LOG]
   v1.2.4: - Increased default splash screen delay by 1 second (1800ms)
   v1.3.0: - Added Terminal.splash.show() method for dynamic loading.
           - Added 'warning' type to Terminal.toast().
           - Added ESC key listener to safely close modals.
           - Improved toast exit transition logic.
   ========================================= */

const Terminal = {
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

    tab: function(btnElement, targetId) {
        const wrapper = btnElement.closest('.t-tabs-wrapper');
        if (!wrapper) return;
        
        wrapper.querySelectorAll('.t-tab-btn').forEach(btn => btn.classList.remove('active'));
        wrapper.querySelectorAll('.t-tab-content').forEach(content => content.classList.remove('active'));
        
        btnElement.classList.add('active');
        wrapper.querySelector('#' + targetId).classList.add('active');
    },

    toast: function(message, type = 'normal', duration = 3000) {
        let container = document.querySelector('.t-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 't-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        
        // Memastikan class yang ditambahkan sesuai (danger atau warning)
        let typeClass = '';
        if (type === 'danger') typeClass = 'danger';
        if (type === 'warning') typeClass = 'warning';
        
        toast.className = `t-toast ${typeClass}`;
        toast.innerHTML = `> ${message}`;
        toast.style.transition = 'all 0.3s ease'; // Persiapan animasi keluar
        container.appendChild(toast);

        setTimeout(() => {
            // Animasi geser dan menghilang yang mulus (tanpa butuh keyframe CSS)
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    accordion: function(btnElement) {
        btnElement.classList.toggle('active');
        const content = btnElement.nextElementSibling;
        if (content && content.classList.contains('t-accordion-content')) {
            content.classList.toggle('active');
        }
    },

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

    splash: {
        // NEW: Fungsi untuk memunculkan layar loading secara dinamis
        show: function(customText = null) {
            const splashEl = document.querySelector('.t-splash');
            if (splashEl) {
                if (customText) {
                    const textEl = document.getElementById('splash-text');
                    if (textEl) textEl.innerHTML = `${customText}<span class="t-loading-dots"></span>`;
                }
                splashEl.classList.remove('hidden');
            }
        },

        // Delay default dipertahankan di 1800ms
        close: function(customDelay = 1800) {
            const splashEl = document.querySelector('.t-splash');
            if (splashEl) {
                setTimeout(() => {
                    splashEl.classList.add('hidden');
                    // Elemen tidak dihapus dari DOM agar bisa dipanggil lagi dengan Terminal.splash.show()
                }, customDelay);
            }
        }
    }
};

// --- GLOBAL LISTENERS --- //

document.addEventListener('DOMContentLoaded', function() {
    Terminal.splash.close();
});

// Menutup modal dengan klik area luar (background)
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('t-modal')) {
        event.target.classList.remove('is-open');
    }
});

// NEW: Menutup modal dengan menekan tombol ESC di keyboard
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        document.querySelectorAll('.t-modal.is-open').forEach(modal => {
            modal.classList.remove('is-open');
        });
    }
});