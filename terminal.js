/* =========================================
   TERMINAL UI FRAMEWORK - JS CORE
   -----------------------------------------
   Continuous Improvement Edition
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
        
        let typeClass = '';
        if (type === 'danger') typeClass = 'danger';
        if (type === 'warning') typeClass = 'warning';
        
        toast.className = `t-toast ${typeClass}`;
        toast.innerHTML = `> ${message}`;
        toast.style.transition = 'all 0.3s ease'; 
        container.appendChild(toast);

        setTimeout(() => {
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

    dropdown: function(btnElement) {
        const menu = btnElement.nextElementSibling;
        // Tutup semua dropdown lain agar tidak tumpang tindih
        document.querySelectorAll('.t-dropdown-menu').forEach(m => {
            if (m !== menu) m.classList.remove('show');
        });
        menu.classList.toggle('show');
    },

    treeToggle: function(folderElement) {
        folderElement.classList.toggle('open');
        const childUl = folderElement.nextElementSibling;
        if (childUl && childUl.tagName === 'UL') {
            childUl.classList.toggle('active');
        }
    },

    typewrite: function(elementId, text, speed = 30, callback = null) {
        const el = document.getElementById(elementId);
        if (!el) return;
        el.innerHTML = '';
        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 't-typewriter-cursor';
        
        function type() {
            if (i < text.length) {
                const charNode = document.createTextNode(text.charAt(i));
                el.appendChild(charNode);
                i++;
                el.appendChild(cursor);
                setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        }
        type();
    },

    splash: {
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

        close: function(customDelay = 1800) {
            const splashEl = document.querySelector('.t-splash');
            if (splashEl) {
                setTimeout(() => {
                    splashEl.classList.add('hidden');
                }, customDelay);
            }
        }
    },

    lightbox: {
        open: function(imgSrc) {
            let box = document.getElementById('t-lightbox-container');
            if (!box) {
                box = document.createElement('div');
                box.id = 't-lightbox-container';
                box.className = 't-lightbox';
                // Tutup jika area luar diklik
                box.onclick = function(e) { if(e.target === box) Terminal.lightbox.close(); };
                box.innerHTML = '<span class="t-lightbox-close" onclick="Terminal.lightbox.close()">[ X ]</span><img id="t-lightbox-img" src="">';
                document.body.appendChild(box);
            }
            document.getElementById('t-lightbox-img').src = imgSrc;
            box.classList.add('active');
        },
        close: function() {
            const box = document.getElementById('t-lightbox-container');
            if (box) box.classList.remove('active');
        }
    },

    fileInput: function(inputId, labelId) {
        const input = document.getElementById(inputId);
        const label = document.getElementById(labelId);
        if (input && label) {
            input.addEventListener('change', function(e) {
                let fileName = e.target.files[0] ? e.target.files[0].name : '[ NO_MEDIA ]';
                // Potong nama file jika terlalu panjang
                if (fileName.length > 20) fileName = fileName.substring(0, 17) + '...';
                label.innerText = '> ' + fileName;
            });
        }
    }
};

// --- GLOBAL LISTENERS --- //

document.addEventListener('DOMContentLoaded', function() {
    Terminal.splash.close();
});

document.addEventListener('click', function(event) {
    // 1. Tutup modal jika area luar (backdrop) diklik
    if (event.target.classList.contains('t-modal')) {
        event.target.classList.remove('is-open');
    }
    
    // 2. Tutup dropdown menu jika user mengklik area lain di layar
    if (!event.target.matches('.t-dropdown-btn') && !event.target.closest('.t-dropdown-btn')) {
        document.querySelectorAll('.t-dropdown-menu').forEach(menu => {
            if (menu.classList.contains('show')) menu.classList.remove('show');
        });
    }
});

document.addEventListener('keydown', function(event) {
    // 3. Tutup modal jika tombol "Escape" (ESC) ditekan pada keyboard
    if (event.key === "Escape") {
        document.querySelectorAll('.t-modal.is-open').forEach(modal => {
            modal.classList.remove('is-open');
        });
    }
});