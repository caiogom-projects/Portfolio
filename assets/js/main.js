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

// ===== Gerador de Currículo =====
function gerarCurriculo() {
    // Dados do currículo - PERSONALIZE AQUI
    const dados = {
        nome: 'Caio Mendes',
        titulo: 'Analista de Suporte Jr. | Desenvolvedor Web Jr. | Assistente de Marketing',
        email: 'caio.gom@outlook.com',
        telefone: '(16) 99778-8061',
        localizacao: 'Sertãozinho - SP',
        portfolio: 'https://caiogom-projects.github.io/Portfolio/',
        
        objetivo: 'Busco oportunidade na área de Marketing Digital, onde possa aplicar meus conhecimentos em criação de conteúdo, design gráfico e estratégias digitais. Tenho experiência com ferramentas como Canva, Figma e edição de imagens, além de estar me especializando em SEO, redes sociais e análise de métricas para contribuir com o crescimento da presença digital da empresa.',
        
        experiencia: [
            {
                cargo: 'Analista de Suporte Técnico Jr.',
                empresa: 'Oliverio S/A - Sertãozinho',
                periodo: 'fev/2025 - jul/2025',
                descricao: 'Atendimento técnico ao cliente, resolução e organização de chamados, suporte técnico e alterações cadastrais, testes de automação, suporte em hardware e software.'
            },
            {
                cargo: 'Estagiário - Analista de Suporte Técnico',
                empresa: 'Oliverio S/A - Sertãozinho',
                periodo: 'set/2024 - fev/2025',
                descricao: 'Atendimento técnico ao cliente, resolução de chamados e manutenção de equipamentos. Suporte básico em hardware, software e redes.'
            },
            {
                cargo: 'Jovem Aprendiz - Mecânico de Usinagem',
                empresa: 'Nova Smar S/A - Sertãozinho',
                periodo: 'nov/2022 - dez/2023',
                descricao: 'Atuação em processos de produção industrial, operação de máquinas CNC e controle de qualidade.'
            }
        ],
        
        formacao: [
            {
                curso: 'Tecnólogo em Gestão Empresarial',
                instituicao: 'Fatec - Dep. Waldyr Alceu Trigo',
                periodo: '2º semestre (trancado)'
            }
        ],
        
        cursosTecnicos: [
            {
                curso: 'Mecânico de Usinagem',
                instituicao: 'SENAI - Ettore Zanini',
                periodo: 'fev/2022 - dez/2023'
            },
            {
                curso: 'Auxiliar de Produção',
                instituicao: 'SENAI - Ettore Zanini',
                periodo: 'fev/2020 - dez/2020'
            }
        ],
        
        cursosComplementares: [
            'JavaScript & TypeScript - Udemy (Cursando)',
            'Marketing Digital (Cursando)',
            'Inglês (Cursando)'
        ],
        
        habilidades: {
            desenvolvimento: ['HTML5', 'CSS3', 'JavaScript', 'Git/GitHub', 'Responsividade'],
            design: ['Figma', 'Canva', 'Paint.NET', 'Krita'],
            suporte: ['Suporte Técnico', 'Help Desk', 'Hardware', 'Software', 'Redes'],
            ferramentas: ['VS Code', 'Pacote Office', 'Windows'],
            idiomas: ['Português - Nativo', 'Inglês - Básico (Leitura Técnica)']
        }
    };

    const curriculoHTML = `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>CV - ${dados.nome}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #333;
            background: #fff;
            max-width: 21cm;
            margin: 0 auto;
            padding: 1.5cm;
        }
        .header {
            border-bottom: 2px solid #6c5ce7;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .header h1 {
            font-size: 24pt;
            color: #6c5ce7;
            font-weight: 700;
            margin-bottom: 3px;
        }
        .header .titulo {
            font-size: 12pt;
            color: #666;
            margin-bottom: 10px;
        }
        .header .contato {
            font-size: 10pt;
            color: #555;
        }
        .header .contato span {
            margin-right: 20px;
        }
        .section {
            margin-bottom: 18px;
        }
        .section h2 {
            font-size: 12pt;
            color: #6c5ce7;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
        .section p {
            color: #444;
            text-align: justify;
        }
        .item {
            margin-bottom: 12px;
        }
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
        .item h3 {
            font-size: 11pt;
            color: #333;
            font-weight: 600;
        }
        .item .periodo {
            font-size: 10pt;
            color: #888;
        }
        .item .subtitulo {
            font-size: 10pt;
            color: #666;
            font-style: italic;
        }
        .item .descricao {
            font-size: 10pt;
            color: #555;
            margin-top: 3px;
        }
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .skills span {
            background: #f0f0f0;
            color: #333;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 9pt;
            border: 1px solid #ddd;
        }
        .two-columns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .item-compact {
            font-size: 10pt;
            color: #444;
            margin-bottom: 6px;
        }
        .item-compact strong {
            color: #333;
        }
        .periodo-inline {
            color: #888;
            font-size: 9pt;
        }
        .cursos-list {
            list-style: none;
        }
        .cursos-list li {
            padding: 3px 0;
            padding-left: 15px;
            position: relative;
            font-size: 10pt;
            color: #555;
        }
        .cursos-list li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #6c5ce7;
        }
        @media print {
            body { padding: 0.5cm; }
            .section { margin-bottom: 12px; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${dados.nome}</h1>
        <div class="titulo">${dados.titulo}</div>
        <div class="contato">
            <span>${dados.telefone}</span>
            <span>${dados.email}</span>
            <span>${dados.localizacao}</span>
        </div>
        <div class="contato" style="margin-top: 5px;">
            <span><a href="${dados.portfolio}" style="color: #6c5ce7; text-decoration: none;">Site - Portfólio: caiogom-projects.github.io/Portfolio</a></span>
        </div>
    </div>
    
    <div class="section">
        <h2>Objetivo</h2>
        <p>${dados.objetivo}</p>
    </div>
    
    <div class="section">
        <h2>Experiência Profissional</h2>
        ${dados.experiencia.map(exp => `
        <div class="item">
            <div class="item-header">
                <h3>${exp.cargo}</h3>
                <span class="periodo">${exp.periodo}</span>
            </div>
            <div class="subtitulo">${exp.empresa}</div>
            <div class="descricao">${exp.descricao}</div>
        </div>
        `).join('')}
    </div>
    
    <div class="section">
        <h2>Formação Acadêmica</h2>
        ${dados.formacao.map(form => `
        <div class="item">
            <div class="item-header">
                <h3>${form.curso}</h3>
                <span class="periodo">${form.periodo}</span>
            </div>
            <div class="subtitulo">${form.instituicao}</div>
        </div>
        `).join('')}
    </div>
    
    <div class="two-columns">
        <div class="section">
            <h2>Cursos Técnicos</h2>
            ${dados.cursosTecnicos.map(curso => `
            <div class="item-compact">
                <strong>${curso.curso}</strong> 
                <p> ${curso.instituicao} <span class="periodo-inline">(${curso.periodo})</span> </p>
            </div>
            `).join('')}
        </div>
        
        <div class="section">
            <h2>Cursos Complementares</h2>
            <ul class="cursos-list">
                ${dados.cursosComplementares.map(curso => `<li>${curso}</li>`).join('')}
            </ul>
        </div>
    </div>
    
    <div class="two-columns">
        <div class="section">
            <h2>Desenvolvimento Web</h2>
            <div class="skills">
                ${dados.habilidades.desenvolvimento.map(skill => `<span>${skill}</span>`).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2>Design & Ferramentas</h2>
            <div class="skills">
                ${dados.habilidades.design.map(skill => `<span>${skill}</span>`).join('')}
            </div>
        </div>
    </div>
    
    <div class="two-columns">
        <div class="section">
            <h2>Suporte Técnico</h2>
            <div class="skills">
                ${dados.habilidades.suporte.map(skill => `<span>${skill}</span>`).join('')}
            </div>
        </div>
        
        <div class="section">
            <h2>Office & Sistemas</h2>
            <div class="skills">
                ${dados.habilidades.ferramentas.map(skill => `<span>${skill}</span>`).join('')}
            </div>
        </div>
    </div>
    
    <div class="section">
        <h2>Idiomas</h2>
        <div class="skills">
            ${dados.habilidades.idiomas.map(skill => `<span>${skill}</span>`).join('')}
        </div>
    </div>
</body>
</html>`;

    const janela = window.open('', '_blank');
    janela.document.write(curriculoHTML);
    janela.document.close();
    setTimeout(() => { janela.print(); }, 300);
}
