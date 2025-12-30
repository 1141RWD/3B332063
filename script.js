// =====================
// 分頁切換
// =====================
function showContent(contentId) {
    document.querySelectorAll('.tab-content').forEach(sec => {
        sec.style.display = 'none';
    });
    const target = document.getElementById(contentId);
    if (target) target.style.display = 'block';
}

function showYear(year) {
    document.querySelectorAll('.year-content').forEach(sec => {
        sec.style.display = 'none';
    });
    const target = document.getElementById(`cabinet-${year}`);
    if (target) target.style.display = 'block';
}

function showActivity(year) {
    document.querySelectorAll('.activity-content').forEach(sec => {
        sec.style.display = 'none';
    });
    const target = document.getElementById(`activity-${year}`);
    if (target) target.style.display = 'block';
}

// =====================
// 初始化
// =====================
document.addEventListener('DOMContentLoaded', () => {
    showContent('intro');
    showYear('114');
    showActivity('114');
    initSliders(document);
    initModal();
});

// =====================
// Slider（多組＋手機滑動）
// =====================
function initSliders(scope) {
    scope.querySelectorAll('.slider').forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        if (!slides.length) return;

        let index = 0;

        const show = i => {
            slides.forEach(s => s.classList.remove('active'));
            slides[i].classList.add('active');
        };

        show(index);

        slider.querySelector('.next')?.addEventListener('click', e => {
            e.stopPropagation();
            index = (index + 1) % slides.length;
            show(index);
        });

        slider.querySelector('.prev')?.addEventListener('click', e => {
            e.stopPropagation();
            index = (index - 1 + slides.length) % slides.length;
            show(index);
        });

        // 點圖片 → 開燈箱
       

        // 手機滑動
        let startX = 0;
        slider.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });
        slider.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].clientX - startX;
            if (Math.abs(diff) > 50) {
                index = diff < 0
                    ? (index + 1) % slides.length
                    : (index - 1 + slides.length) % slides.length;
                show(index);
            }
        });
    });
}

// =====================
// Modal（活動燈箱）
// =====================
function initModal() {
    const modal = document.getElementById('activity-modal');
    const closeBtn = modal.querySelector('.close-btn');

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });
}

function openModal(imgSrc) {
    const modal = document.getElementById('activity-modal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `<img src="${imgSrc}" style="width:100%;border-radius:10px;">`;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('activity-modal').style.display = 'none';
}
