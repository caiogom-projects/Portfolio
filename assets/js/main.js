// ===== Loader =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.classList.add('hidden');
        // Inicia animações após o loader
        initScrollAnimations();
    }, 800);
});

// ===== Toggle de Tema (Dark Mode) =====
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Verifica tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ===== Animações ao Scroll =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => observer.observe(el));
}

// ===== Menu Mobile Toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    
    // Alterna o ícone do menu
    const icon = menuToggle.querySelector('i');
    if (navList.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===== Header com sombra ao rolar =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Sistema de Abas das Habilidades =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active de todos os botões
        tabBtns.forEach(b => b.classList.remove('active'));
        // Adiciona active ao botão clicado
        btn.classList.add('active');
        
        // Esconde todos os painéis
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Mostra o painel correspondente
        const tabId = btn.getAttribute('data-tab');
        const targetPanel = document.getElementById(tabId);
        targetPanel.classList.add('active');
        
        // Anima as barras de progresso do painel ativo
        animateProgressBars(targetPanel);
    });
});

// ===== Animação das barras de habilidades =====
const animateProgressBars = (container = document) => {
    const progressBars = container.querySelectorAll('.skill-progress, .mini-progress');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        if (targetWidth) {
            // Reset para animar
            bar.style.width = '0';
            // Pequeno delay para garantir que o reset seja aplicado
            setTimeout(() => {
                bar.style.width = targetWidth + '%';
            }, 100);
        }
    });
};

// Anima quando a seção de habilidades entra na viewport
let skillsAnimated = false;
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            // Anima apenas o painel ativo inicial
            const activePanel = document.querySelector('.tab-panel.active');
            if (activePanel) {
                animateProgressBars(activePanel);
            }
            skillsAnimated = true;
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.habilidades');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ===== Efeito hover nos cards de habilidade =====
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Animação dos pontos de idioma =====
const animateLanguageDots = () => {
    const langDots = document.querySelectorAll('.lang-dots .dot.active');
    langDots.forEach((dot, index) => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
        setTimeout(() => {
            dot.style.transition = 'all 0.3s ease';
            dot.style.opacity = '1';
            dot.style.transform = 'scale(1)';
        }, index * 150);
    });
};

// Chama a animação quando o painel office está ativo
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.getAttribute('data-tab') === 'office') {
            setTimeout(animateLanguageDots, 300);
        }
    });
});

// ===== Link ativo na navegação =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
});

// ===== Scroll suave para links internos =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
