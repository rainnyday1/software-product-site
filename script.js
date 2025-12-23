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
const animateCSS = `
.animate-in {
    opacity: 1 !important;
transform: translateY(0) !important;
}
`;

const style = document.createElement('style');
style.textContent = animateCSS;
document.head.appendChild(style);
});