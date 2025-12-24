// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    if (window.scrollY > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        backToTop.classList.add('visible');
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        backToTop.classList.remove('visible');
    }
});

// 移动端菜单切换
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');

        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 关闭移动端菜单当点击链接
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// 回到顶部功能
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 动画效果 - 滚动时显示元素
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
    }
});
}, observerOptions);

// 观察需要动画的元素
const animatedElements = document.querySelectorAll('.feature-card, .service-item, .testimonial-card, .pricing-card');
animatedElements.forEach(el => {
    observer.observe(el);
});

// 简单表单验证增强
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        // 添加焦点效果
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
        // 基本验证
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#f72585';
        } else {
            this.style.borderColor = '';
        }
    });
});
}

// 新闻订阅表单处理
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email && validateEmail(email)) {
            // 这里可以添加实际的订阅逻辑
            alert('感谢订阅！您将收到我们的最新资讯。');
            emailInput.value = '';
        } else {
            alert('请输入有效的邮箱地址');
        }
    });
}
<script>
// 鼠标跟随效果
document.addEventListener('DOMContentLoaded', function() {
    const floatingBtn = document.querySelector('.floating-solution-btn');
    if (!floatingBtn) return;

    // 平滑滚动函数（复用之前的）
    function smoothScrollToContact(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const contact = document.getElementById('contact');
        if (contact) {
            // 添加点击反馈
            const btn = event?.target || document.querySelector('.floating-btn-action');
            if (btn) {
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
            }, 200);
        }

        // 平滑滚动
        contact.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // 高亮效果
        contact.style.transition = 'all 0.5s ease';
        contact.style.boxShadow = '0 0 30px rgba(52, 152, 219, 0.8)';
        setTimeout(() => {
            contact.style.boxShadow = '';
    }, 2000);

    return false;
}

return false;
}

// 鼠标跟随效果
let mouseX = 0;
let mouseY = 0;
let btnX = 0;
let btnY = 0;

// 跟踪鼠标位置
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // 计算与按钮中心的距离
    const btnRect = floatingBtn.getBoundingClientRect();
    btnX = btnRect.left + btnRect.width / 2;
    btnY = btnRect.top + btnRect.height / 2;

    // 计算相对位置
    const relativeX = (mouseX - btnX) / 10; // 除以10降低敏感度
    const relativeY = (mouseY - btnY) / 10;

    // 限制最大偏移量
    const limitedX = Math.max(-20, Math.min(20, relativeX));
    const limitedY = Math.max(-20, Math.min(20, relativeY));

    // 应用变换
    floatingBtn.style.setProperty('--mouse-x', limitedX);
    floatingBtn.style.setProperty('--mouse-y', limitedY);
});

// 触摸设备支持
document.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    if (touch) {
        mouseX = touch.clientX;
        mouseY = touch.clientY;

        const btnRect = floatingBtn.getBoundingClientRect();
        btnX = btnRect.left + btnRect.width / 2;
        btnY = btnRect.top + btnRect.height / 2;

        const relativeX = (mouseX - btnX) / 15; // 触摸设备更低的敏感度
        const relativeY = (mouseY - btnY) / 15;

        const limitedX = Math.max(-15, Math.min(15, relativeX));
        const limitedY = Math.max(-15, Math.min(15, relativeY));

        floatingBtn.style.setProperty('--mouse-x', limitedX);
        floatingBtn.style.setProperty('--mouse-y', limitedY);
    }
});

// 鼠标离开窗口时重置位置
document.addEventListener('mouseleave', function() {
    floatingBtn.style.setProperty('--mouse-x', '0');
    floatingBtn.style.setProperty('--mouse-y', '0');
});

// 滚动时微调位置
let scrollTimeout;
window.addEventListener('scroll', function() {
    // 滚动时暂时取消鼠标跟随效果
    floatingBtn.style.transition = 'transform 0.2s ease';
    floatingBtn.style.setProperty('--mouse-x', '0');
    floatingBtn.style.setProperty('--mouse-y', '0');

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        floatingBtn.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
}, 200);
});

// 为按钮添加点击事件
const actionBtn = document.querySelector('.floating-btn-action');
if (actionBtn) {
    actionBtn.addEventListener('click', smoothScrollToContact);
}

// 导出到全局（以防HTML中使用onclick）
window.smoothScrollToContact = smoothScrollToContact;
});

// 滚动显示/隐藏动画
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const floatingBtn = document.querySelector('.floating-solution-btn');
    if (!floatingBtn) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 向下滚动时隐藏，向上滚动时显示
    if (scrollTop > lastScrollTop && scrollTop > 300) {
        // 向下滚动超过300px时隐藏
        floatingBtn.style.opacity = '0';
        floatingBtn.style.transform = 'translateY(100px)';
        floatingBtn.style.pointerEvents = 'none';
    } else {
        // 向上滚动或顶部时显示
        floatingBtn.style.opacity = '1';
        floatingBtn.style.transform = '';
        floatingBtn.style.pointerEvents = 'auto';
    }

    // 在页面底部始终显示
    if ((window.innerHeight + scrollTop) >= document.body.offsetHeight - 100) {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.transform = '';
        floatingBtn.style.pointerEvents = 'auto';
    }

    lastScrollTop = scrollTop;
});

// 初始动画：页面加载后淡入
window.addEventListener('load', function() {
    const floatingBtn = document.querySelector('.floating-solution-btn');
    if (floatingBtn) {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.transform = 'translateY(50px) scale(0.9)';

        setTimeout(() => {
            floatingBtn.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        floatingBtn.style.opacity = '1';
        floatingBtn.style.transform = '';
    }, 1000);
}
});
</script>

// 邮箱验证函数
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// 添加一些简单的CSS动画类
document.addEventListener('DOMContentLoaded', function() {
    // 为元素添加初始状态
    const animatedElements = document.querySelectorAll('.feature-card, .service-item, .testimonial-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// 添加动画类
const animateCSS =
.animate-in {
    opacity: 1 !important;
transform: translateY(0) !important;
};

const style = document.createElement('style');
style.textContent = animateCSS;
document.head.appendChild(style);
});