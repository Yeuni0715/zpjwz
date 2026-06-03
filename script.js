// ============ H5移动端交互脚本 ============

document.addEventListener('DOMContentLoaded', function() {
    // 1. 移动端菜单切换
    initMobileMenu();
    
    // 2. 平滑滚动
    initSmoothScroll();
    
    // 3. 触摸滑动手势支持
    initTouchGestures();
    
    // 4. 页面加载完成动画
    initPageLoad();
    
    // 5. 分类筛选功能
    initCategoryFilter();
});

// 移动端菜单切换
function initMobileMenu() {
    var menuToggle = document.getElementById('menuToggle');
    var navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // 点击菜单项关闭菜单
        var links = navLinks.querySelectorAll('a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// 平滑滚动
function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 计算滚动位置（考虑导航栏高度和安全区域）
                var navbarHeight = 56;
                var safeAreaTop = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top')) || 0;
                var offsetTop = targetElement.offsetTop - navbarHeight - safeAreaTop;
                
                // 平滑滚动
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 触摸滑动手势支持
function initTouchGestures() {
    var touchStartY = 0;
    var touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe(touchStartY, touchEndY);
    }, { passive: true });
}

// 处理滑动手势
function handleSwipe(startY, endY) {
    var swipeThreshold = 50;
    var diff = startY - endY;
    
    // 上滑 - 显示导航栏
    if (diff > swipeThreshold) {
        document.querySelector('.navbar')?.classList.remove('navbar-hidden');
    }
    
    // 下滑 - 隐藏导航栏（可选）
    if (diff < -swipeThreshold) {
        // 可以选择是否隐藏导航栏
    }
}

// 页面加载完成动画
function initPageLoad() {
    document.body.classList.add('page-loaded');
    
    // 图片懒加载
    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(function(img) {
        img.addEventListener('load', function() {
            this.classList.add('img-loaded');
        });
    });
}

// 微信内置浏览器特殊处理
function initWeChatHandler() {
    // 检测是否在微信内置浏览器中
    var isWeChat = /MicroMessenger/i.test(navigator.userAgent);
    
    if (isWeChat) {
        // 微信浏览器滚动问题修复
        document.body.addEventListener('touchmove', function(e) {
            // 防止滚动穿透
        }, { passive: false });
    }
}

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时的处理
    } else {
        // 页面显示时的处理
    }
});

// 窗口大小变化处理
window.addEventListener('resize', function() {
    // 响应式布局调整
});

// 安全区域适配
function updateSafeArea() {
    var safeAreaTop = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top')) || 0;
    var safeAreaBottom = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom')) || 0;
    
    document.documentElement.style.setProperty('--safe-area-inset-top', safeAreaTop + 'px');
    document.documentElement.style.setProperty('--safe-area-inset-bottom', safeAreaBottom + 'px');
}

// 初始化安全区域
updateSafeArea();

// 监听窗口变化更新安全区域
window.addEventListener('resize', updateSafeArea);
window.addEventListener('orientationchange', updateSafeArea);

// ============ 分类筛选功能 ============
function initCategoryFilter() {
    var categoryTabs = document.getElementById('categoryTabs');
    var projectsContainer = document.getElementById('projectsContainer');
    
    if (!categoryTabs || !projectsContainer) {
        return;
    }
    
    var tabs = categoryTabs.querySelectorAll('.category-tab');
    var projectItems = projectsContainer.querySelectorAll('.project-item');
    
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // 移除所有标签的active状态
            tabs.forEach(function(t) {
                t.classList.remove('active');
            });
            
            // 添加当前标签的active状态
            this.classList.add('active');
            
            // 获取当前分类
            var category = this.getAttribute('data-category');
            
            // 过滤项目
            filterProjects(category);
        });
    });
    
    // 过滤项目函数
    function filterProjects(category) {
        projectItems.forEach(function(item) {
            var itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                // 显示项目
                item.classList.remove('hidden');
                setTimeout(function() {
                    item.style.height = 'auto';
                }, 10);
            } else {
                // 隐藏项目
                item.classList.add('hidden');
                item.style.height = '0';
            }
        });
    }
}