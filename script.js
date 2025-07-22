// ===== CONFIGURAÇÕES E DADOS =====
const QUIZ_CONFIG = {
    totalQuestions: 10,
    maxScore: 5,
    timerDuration: 15 * 60, // 15 minutos em segundos
};

const WHEEL_CONFIG = {
    segments: 8,
    colors: [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', 
        '#5f27cd', '#00d2d3', '#ff9ff3', '#54a0ff'
    ],
    prizes: [10, 20, 15, 30, 10, 25, 15, 50],
    labels: ['10%', '20%', '15%', '30%', '10%', '25%', '15%', '50%']
};

// Perguntas do Quiz
const questions = [
    {
        question: "Como você se sente em relação ao dinheiro atualmente?",
        answers: [
            { text: "Completamente confortável e no controle das minhas finanças", score: 5 },
            { text: "Confiante na maioria das situações financeiras", score: 4 },
            { text: "Neutro, sem grandes preocupações ou entusiasmo", score: 3 },
            { text: "Ansioso e preocupado frequentemente com dinheiro", score: 2 },
            { text: "Muito estressado e sobrecarregado financeiramente", score: 1 }
        ]
    },
    {
        question: "Qual sua principal crença sobre ganhar dinheiro?",
        answers: [
            { text: "Dinheiro vem naturalmente quando agrego valor ao mundo", score: 5 },
            { text: "Trabalho duro e inteligente sempre resulta em recompensa", score: 4 },
            { text: "É uma mistura equilibrada de sorte e esforço", score: 3 },
            { text: "É muito difícil ganhar dinheiro de forma honesta", score: 2 },
            { text: "Pessoas como eu não foram feitas para ser ricas", score: 1 }
        ]
    },
    {
        question: "Como você lida com oportunidades de investimento?",
        answers: [
            { text: "Analiso cuidadosamente e aproveito as boas oportunidades", score: 5 },
            { text: "Sou cauteloso mas tomo decisões calculadas", score: 4 },
            { text: "Prefiro manter meu dinheiro seguro como está", score: 3 },
            { text: "Tenho muito medo de tomar qualquer risco financeiro", score: 2 },
            { text: "Evito completamente investimentos ou riscos", score: 1 }
        ]
    },
    {
        question: "Quando alguém próximo tem sucesso financeiro, você:",
        answers: [
            { text: "Fico genuinamente feliz e me inspiro no exemplo", score: 5 },
            { text: "Parabenizo sinceramente e vejo como modelo", score: 4 },
            { text: "Sinto felicidade misturada com um pouco de inveja", score: 3 },
            { text: "Sinto mais inveja e comparação do que felicidade", score: 2 },
            { text: "Me sinto inferior e desanimado com minha situação", score: 1 }
        ]
    },
    {
        question: "Qual sua relação atual com poupança e investimentos?",
        answers: [
            { text: "Invisto regularmente e tenho uma estratégia clara", score: 5 },
            { text: "Poupo consistentemente e estudo sobre investimentos", score: 4 },
            { text: "Poupo quando possível, mas invisto muito pouco", score: 3 },
            { text: "Raramente consigo poupar ou pensar em investir", score: 2 },
            { text: "Não consigo poupar e investir parece impossível", score: 1 }
        ]
    },
    {
        question: "Como você vê seu potencial de crescimento financeiro?",
        answers: [
            { text: "Tenho potencial ilimitado para crescer financeiramente", score: 5 },
            { text: "Posso crescer significativamente com esforço e estratégia", score: 4 },
            { text: "Tenho um potencial moderado de crescimento", score: 3 },
            { text: "Meu potencial é limitado pelas minhas circunstâncias", score: 2 },
            { text: "Não acredito que posso mudar minha situação atual", score: 1 }
        ]
    },
    {
        question: "Qual sua atitude em relação ao aprendizado financeiro?",
        answers: [
            { text: "Estudo constantemente sobre finanças e investimentos", score: 5 },
            { text: "Leio regularmente sobre educação financeira", score: 4 },
            { text: "Aprendo ocasionalmente quando tenho tempo", score: 3 },
            { text: "Raramente busco conhecimento sobre finanças", score: 2 },
            { text: "Evito pensar ou aprender sobre questões financeiras", score: 1 }
        ]
    },
    {
        question: "Como você planeja seu futuro financeiro?",
        answers: [
            { text: "Tenho metas claras e planos detalhados para alcançá-las", score: 5 },
            { text: "Tenho objetivos definidos e trabalho para alcançá-los", score: 4 },
            { text: "Penso no futuro mas sem planos muito específicos", score: 3 },
            { text: "Prefiro viver um dia de cada vez sem muito planejamento", score: 2 },
            { text: "Não consigo ou não sei como planejar o futuro", score: 1 }
        ]
    },
    {
        question: "Como você reage a contratempos financeiros?",
        answers: [
            { text: "Vejo como oportunidades de aprendizado e crescimento", score: 5 },
            { text: "Mantenho a calma e busco soluções práticas", score: 4 },
            { text: "Fico preocupado mas consigo me recuperar", score: 3 },
            { text: "Fico muito estressado e demoro para me recuperar", score: 2 },
            { text: "Entro em pânico e me sinto completamente perdido", score: 1 }
        ]
    },
    {
        question: "Qual sua visão sobre abundância e riqueza?",
        answers: [
            { text: "Abundância é meu direito natural e está disponível para todos", score: 5 },
            { text: "Riqueza é possível para quem se dedica e se prepara", score: 4 },
            { text: "Algumas pessoas nascem com sorte para ser ricas", score: 3 },
            { text: "Riqueza é para poucos e requer sacrifícios extremos", score: 2 },
            { text: "Dinheiro é a raiz de todos os males e corrompe", score: 1 }
        ]
    }
];

// ===== VARIÁVEIS GLOBAIS =====
let currentQuestion = 0;
let totalScore = 0;
let userAnswers = [];
let countdownInterval;
let wheelSpun = false;
let finalDiscount = 0;
let wheelCanvas, wheelCtx;
let currentRotation = 0;
let isSpinning = false;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeSpaceBackground();
    initializeParticles();
    setupEventListeners();
    initializeAnimations();
    startCounters();
});

function setupEventListeners() {
    const spinButton = document.getElementById('spin-button');
    const emailForm = document.getElementById('email-form');
    
    if (spinButton) {
        spinButton.addEventListener('click', spinWheel);
    }
    
    if (emailForm) {
        emailForm.addEventListener('submit', handleEmailSubmit);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Remover a função initializeTiltEffect e qualquer chamada a ela

    // Corrigir botão mobile: adicionar touchstart
    const startBtn = document.querySelector('.primary-cosmic');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            startQuiz();
        });
        startBtn.addEventListener('touchstart', function() {
            startQuiz();
        }, {passive: true});
    }

    // Scroll animations
    initializeScrollAnimations();
}

// ===== FUNDO ESPACIAL ===== 
function initializeSpaceBackground() {
    const starsCanvas = document.getElementById('stars-canvas');
    if (!starsCanvas) return;
    
    const ctx = starsCanvas.getContext('2d');
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 200;
    
    // Criar estrelas
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            twinkleSpeed: Math.random() * 0.02 + 0.01
        });
    }
    
    function animateStars() {
        ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
        
        stars.forEach(star => {
            // Efeito de piscar
            star.opacity += star.twinkleSpeed;
            if (star.opacity > 1 || star.opacity < 0.2) {
                star.twinkleSpeed *= -1;
            }
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            // Adicionar brilho para estrelas maiores
            if (star.size > 1.5) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${star.opacity * 0.3})`;
                ctx.fill();
            }
        });
        
        requestAnimationFrame(animateStars);
    }
    
    animateStars();
}

function initializeParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.6 + 0.2,
            color: Math.random() > 0.5 ? '#00d4ff' : '#ff6b9d'
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
            
            // Efeito de brilho
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.opacity * 0.3;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

function handleResize() {
    const starsCanvas = document.getElementById('stars-canvas');
    const particlesCanvas = document.getElementById('particles-canvas');
    
    if (starsCanvas) {
        starsCanvas.width = window.innerWidth;
        starsCanvas.height = window.innerHeight;
    }
    
    if (particlesCanvas) {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }
}

// ===== ANIMAÇÕES E EFEITOS =====
function initializeAnimations() {
    // Adicionar classes de animação aos elementos
    const cards = document.querySelectorAll('.cosmic-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function startCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        // Iniciar contador quando elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ===== CONTROLE DO QUIZ =====
function startQuiz() {
    document.getElementById('start-page').classList.remove('active');
    document.getElementById('quiz-page').classList.add('active');
    showQuestion();
    playCosmicSound();
}

function showQuestion() {
    const question = questions[currentQuestion];
    const progressPercentage = ((currentQuestion + 1) / QUIZ_CONFIG.totalQuestions) * 100;
    
    // Atualizar progress
    document.getElementById('progress-text').textContent = `Dimensão ${currentQuestion + 1} de ${QUIZ_CONFIG.totalQuestions}`;
    document.getElementById('progress-percentage').textContent = Math.round(progressPercentage) + '%';
    
    // Animar planeta do progresso
    const progressPlanet = document.getElementById('progress-planet');
    const orbitTrail = document.getElementById('orbit-trail');
    const angle = (progressPercentage / 100) * 360;
    progressPlanet.style.transform = `rotate(${angle}deg) translateX(75px) rotate(-${angle}deg)`;
    orbitTrail.style.transform = `rotate(${angle}deg)`;
    
    // Atualizar pergunta
    document.getElementById('question-number').textContent = String(currentQuestion + 1).padStart(2, '0');
    document.getElementById('question-title').textContent = question.question;
    
    // Criar opções de resposta
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option fade-in';
        answerDiv.style.animationDelay = `${index * 0.1}s`;
        answerDiv.textContent = answer.text;
        answerDiv.onclick = () => selectAnswer(index, answer.score);
        answersContainer.appendChild(answerDiv);
        
        // Trigger animation
        setTimeout(() => {
            answerDiv.classList.add('visible');
        }, index * 100);
    });
}

function selectAnswer(index, score) {
    // Remover seleção anterior
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Adicionar seleção atual
    document.querySelectorAll('.answer-option')[index].classList.add('selected');
    
    // Salvar resposta
    userAnswers[currentQuestion] = { index, score };
    
    // Efeito sonoro
    playCosmicSound();
    
    // Próxima pergunta após delay
    setTimeout(() => {
        totalScore += score;
        currentQuestion++;
        
        if (currentQuestion < QUIZ_CONFIG.totalQuestions) {
            showQuestion();
        } else {
            showResult();
        }
    }, 800);
}

// ===== RESULTADO =====
function showResult() {
    document.getElementById('quiz-page').classList.remove('active');
    document.getElementById('result-page').classList.add('active');
    
    const percentage = Math.round((totalScore / (QUIZ_CONFIG.totalQuestions * QUIZ_CONFIG.maxScore)) * 100);
    
    // Animar pontuação
    animateCosmicScore(percentage);
    
    // Gerar análise
    generateCosmicAnalysis(percentage);
    
    // Mostrar breakdown das áreas
    showDimensionsBreakdown();
    
    // Efeito de partículas
    createScoreParticles();
}

function animateCosmicScore(targetPercentage) {
    const scoreElement = document.getElementById('score-percentage');
    
    let currentScore = 0;
    const increment = targetPercentage / 100;
    const duration = 3000; // 3 segundos
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetPercentage) {
            currentScore = targetPercentage;
            clearInterval(timer);
        }
        
        scoreElement.textContent = Math.round(currentScore);
        
        // Animar anéis da galáxia
        const rings = document.querySelectorAll('.ring');
        rings.forEach((ring, index) => {
            const rotation = (currentScore / 100) * 360 * (index + 1);
            ring.style.transform = `rotate(${rotation}deg)`;
        });
        
    }, stepTime);
}

function generateCosmicAnalysis(percentage) {
    let analysis = '';
    
    if (percentage >= 85) {
        analysis = `
            <h4 style="color: #00ff88;">🌟 Excelente! Mestre Cósmico da Prosperidade</h4>
            <p>Parabéns! Você vibra em uma frequência extremamente elevada de abundância. Sua consciência cósmica está perfeitamente alinhada com as leis universais da prosperidade.</p>
            <p><strong>Seu perfil cósmico:</strong> Você é um canal puro de manifestação financeira. Sua energia atrai naturalmente oportunidades e recursos do universo.</p>
            <p><strong>Próxima dimensão:</strong> Expandir para níveis quânticos de multiplicação de renda e investimentos interdimensionais.</p>
        `;
    } else if (percentage >= 70) {
        analysis = `
            <h4 style="color: #00d4ff;">💫 Muito Bom! Navegador Estelar da Abundância</h4>
            <p>Você já possui uma conexão sólida com as frequências cósmicas da prosperidade! Sua vibração está majoritariamente alinhada, mas alguns ajustes quânticos podem acelerar exponencialmente seus resultados.</p>
            <p><strong>Seu perfil cósmico:</strong> Você está navegando corretamente pelas dimensões da abundância, mas alguns bloqueios energéticos podem estar limitando seu potencial máximo.</p>
            <p><strong>Próxima dimensão:</strong> Recalibrar frequências específicas para ativar portais de prosperidade acelerada.</p>
        `;
    } else if (percentage >= 50) {
        analysis = `
            <h4 style="color: #ffd700;">⚡ Alinhamento Moderado - Portal de Transformação Ativo</h4>
            <p>Você possui algumas conexões positivas com as energias cósmicas, mas há interferências dimensionais que estão bloqueando seu fluxo natural de abundância. A boa notícia é que isso é completamente reprogramável!</p>
            <p><strong>Seu perfil cósmico:</strong> Você oscila entre diferentes frequências vibracionais. Existem padrões energéticos limitantes que precisam ser transmutados.</p>
            <p><strong>Próxima dimensão:</strong> Reprogramação quântica completa dos códigos de abundância e ativação dos chakras financeiros.</p>
        `;
    } else {
        analysis = `
            <h4 style="color: #ff6b9d;">🚨 Frequência Baixa - Transformação Cósmica Urgente</h4>
            <p>Seus resultados indicam um padrão significativo de desalinhamento com as frequências universais da prosperidade. Mas não se preocupe - você deu o primeiro passo mais importante ao fazer este diagnóstico cósmico!</p>
            <p><strong>Seu perfil cósmico:</strong> Você possui bloqueios energéticos profundos que estão criando uma barreira dimensional para sua abundância natural.</p>
            <p><strong>Próxima dimensão:</strong> Ativação urgente e completa dos códigos cósmicos de prosperidade através de um programa de recalibração quântica intensiva.</p>
        `;
    }
    
    document.getElementById('result-message').innerHTML = analysis;
}

function showDimensionsBreakdown() {
    const dimensions = [
        { 
            name: 'Frequência Financeira', 
            score: Math.round(((userAnswers[0]?.score || 1) + (userAnswers[3]?.score || 1)) / 2) 
        },
        { 
            name: 'Códigos de Abundância', 
            score: Math.round(((userAnswers[1]?.score || 1) + (userAnswers[9]?.score || 1)) / 2) 
        },
        { 
            name: 'Portal de Investimentos', 
            score: Math.round(((userAnswers[2]?.score || 1) + (userAnswers[4]?.score || 1)) / 2) 
        },
        { 
            name: 'Consciência Expansiva', 
            score: Math.round(((userAnswers[5]?.score || 1) + (userAnswers[6]?.score || 1)) / 2) 
        },
        { 
            name: 'Resiliência Cósmica', 
            score: Math.round(((userAnswers[7]?.score || 1) + (userAnswers[8]?.score || 1)) / 2) 
        }
    ];
    
    const chartContainer = document.getElementById('areas-chart');
    chartContainer.innerHTML = '';
    
    dimensions.forEach((dimension, index) => {
        const dimensionDiv = document.createElement('div');
        dimensionDiv.className = 'dimension-item fade-in';
        dimensionDiv.innerHTML = `
            <span class="dimension-name">${dimension.name}</span>
            <div class="dimension-bar">
                <div class="dimension-progress" style="width: 0%"></div>
            </div>
            <span class="dimension-score">${dimension.score}/5</span>
        `;
        chartContainer.appendChild(dimensionDiv);
        
        // Animar barra após delay
        setTimeout(() => {
            const progressBar = dimensionDiv.querySelector('.dimension-progress');
            progressBar.style.width = (dimension.score / 5) * 100 + '%';
            dimensionDiv.classList.add('visible');
        }, 500 + (index * 200));
    });
}

function createScoreParticles() {
    const container = document.querySelector('.energy-particles');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#00d4ff';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px #00d4ff';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(particle);
    }
}

// ===== ROLETA CÓSMICA =====
function showWheel() {
    document.getElementById('result-page').classList.remove('active');
    document.getElementById('wheel-page').classList.add('active');
    
    initializeCosmicWheel();
    startCountdown();
    createCelebrationParticles();
}

function initializeCosmicWheel() {
    wheelCanvas = document.getElementById('wheel-canvas');
    wheelCtx = wheelCanvas.getContext('2d');
    
    drawCosmicWheel();
}

function drawCosmicWheel() {
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const segmentAngle = (2 * Math.PI) / WHEEL_CONFIG.segments;
    
    wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    
    // Desenhar segmentos com gradientes cósmicos
    for (let i = 0; i < WHEEL_CONFIG.segments; i++) {
        const startAngle = i * segmentAngle + currentRotation;
        const endAngle = startAngle + segmentAngle;
        
        // Criar gradiente para cada segmento
        const gradient = wheelCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, WHEEL_CONFIG.colors[i]);
        gradient.addColorStop(1, adjustBrightness(WHEEL_CONFIG.colors[i], -30));
        
        // Desenhar segmento
        wheelCtx.beginPath();
        wheelCtx.moveTo(centerX, centerY);
        wheelCtx.arc(centerX, centerY, radius, startAngle, endAngle);
        wheelCtx.closePath();
        wheelCtx.fillStyle = gradient;
        wheelCtx.fill();
        
        // Desenhar borda com brilho
        wheelCtx.strokeStyle = '#ffffff';
        wheelCtx.lineWidth = 3;
        wheelCtx.shadowColor = WHEEL_CONFIG.colors[i];
        wheelCtx.shadowBlur = 10;
        wheelCtx.stroke();
        wheelCtx.shadowBlur = 0;
        
        // Desenhar texto com efeito neon
        const textAngle = startAngle + segmentAngle / 2;
        const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
        const textY = centerY + Math.sin(textAngle) * (radius * 0.7);
        
        wheelCtx.save();
        wheelCtx.translate(textX, textY);
        wheelCtx.rotate(textAngle + Math.PI / 2);
        wheelCtx.fillStyle = '#ffffff';
        wheelCtx.font = 'bold 20px Orbitron';
        wheelCtx.textAlign = 'center';
        wheelCtx.shadowColor = '#ffffff';
        wheelCtx.shadowBlur = 5;
        wheelCtx.fillText(WHEEL_CONFIG.labels[i], 0, 0);
        wheelCtx.restore();
    }
    
    // Desenhar círculo central com efeito cósmico
    const centerGradient = wheelCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
    centerGradient.addColorStop(0, '#ffffff');
    centerGradient.addColorStop(1, '#00d4ff');
    
    wheelCtx.beginPath();
    wheelCtx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    wheelCtx.fillStyle = centerGradient;
    wheelCtx.fill();
    wheelCtx.strokeStyle = '#ffffff';
    wheelCtx.lineWidth = 3;
    wheelCtx.shadowColor = '#00d4ff';
    wheelCtx.shadowBlur = 15;
    wheelCtx.stroke();
    wheelCtx.shadowBlur = 0;
}

function adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function spinWheel() {
    if (isSpinning || wheelSpun) return;
    
    isSpinning = true;
    wheelSpun = true;
    
    const spinButton = document.getElementById('spin-button');
    spinButton.disabled = true;
    spinButton.innerHTML = '<div class="spin-core"><i class="fas fa-spinner fa-spin"></i></div><span class="spin-text">GIRANDO</span>';
    
    // Calcular rotação com mais realismo
    const minSpins = 8;
    const maxSpins = 12;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const finalAngle = Math.random() * 2 * Math.PI;
    const totalRotation = spins * 2 * Math.PI + finalAngle;
    
    // Determinar prêmio
    const segmentAngle = (2 * Math.PI) / WHEEL_CONFIG.segments;
    const normalizedAngle = (2 * Math.PI - (finalAngle % (2 * Math.PI))) % (2 * Math.PI);
    const segmentIndex = Math.floor(normalizedAngle / segmentAngle);
    finalDiscount = WHEEL_CONFIG.prizes[segmentIndex];
    
    // Animar rotação com easing mais suave
    const startTime = Date.now();
    const duration = 5000; // 5 segundos
    const startRotation = currentRotation;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function mais suave (ease-out-cubic)
        const easeOut = 1 - Math.pow(1 - progress, 4);
        
        currentRotation = startRotation + totalRotation * easeOut;
        drawCosmicWheel();
        
        // Adicionar efeito de vibração no final
        if (progress > 0.9) {
            const vibration = Math.sin(elapsed * 0.1) * (1 - progress) * 2;
            wheelCanvas.style.transform = `translate(${vibration}px, ${vibration}px)`;
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Finalizar
            wheelCanvas.style.transform = 'translate(0, 0)';
            isSpinning = false;
            
            // Efeitos de celebração
            setTimeout(() => {
                triggerCosmicConfetti();
                highlightWinningSegment(segmentIndex);
                playCosmicSound();
                
                setTimeout(() => {
                    showEmailPage();
                }, 3000);
            }, 500);
        }
    }
    
    animate();
}

function highlightWinningSegment(segmentIndex) {
    // Adicionar efeito de destaque no segmento vencedor
    const prizes = document.querySelectorAll('.prize-star');
    if (prizes[segmentIndex]) {
        prizes[segmentIndex].style.background = 'linear-gradient(135deg, #ffd700, #ffb347)';
        prizes[segmentIndex].style.transform = 'scale(1.2)';
        prizes[segmentIndex].style.boxShadow = '0 0 30px #ffd700';
    }
}

function createCelebrationParticles() {
    const container = document.querySelector('.celebration-particles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = i % 2 === 0 ? '#ffd700' : '#00d4ff';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 15px ${i % 2 === 0 ? '#ffd700' : '#00d4ff'}`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${2 + Math.random() * 3}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(particle);
    }
}

// ===== COUNTDOWN TIMER =====
function startCountdown() {
    let timeLeft = QUIZ_CONFIG.timerDuration;
    
    countdownInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const timer1 = document.getElementById('countdown-display');
        const timer2 = document.getElementById('countdown-display-2');
        
        if (timer1) timer1.textContent = timeString;
        if (timer2) timer2.textContent = timeString;
        
        // Adicionar urgência visual quando tempo está acabando
        if (timeLeft < 300) { // Últimos 5 minutos
            const timers = document.querySelectorAll('.cosmic-timer');
            timers.forEach(timer => {
                timer.style.background = 'linear-gradient(135deg, #ff4757, #ff3838)';
                timer.style.animation = 'pulse-glow 1s ease-in-out infinite';
            });
        }
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            // Aqui você pode adicionar lógica para quando o tempo acabar
        }
    }, 1000);
}

// ===== EMAIL PAGE =====
function showEmailPage() {
    document.getElementById('wheel-page').classList.remove('active');
    document.getElementById('email-page').classList.add('active');
    document.getElementById('final-discount').textContent = `${finalDiscount}%`;
    
    // Animar badge de desconto
    animateDiscountBadge();
    createVictoryParticles();
}

function animateDiscountBadge() {
    const badge = document.querySelector('.badge-galaxy');
    if (badge) {
        badge.style.animation = 'pulsing 2s ease-in-out infinite';
    }
}

function createVictoryParticles() {
    const container = document.querySelector('.explosion-particles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = ['#ffd700', '#ff6b9d', '#00d4ff', '#00ff88'][Math.floor(Math.random() * 4)];
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 20px ${particle.style.background}`;
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.animation = `explode ${1 + Math.random() * 2}s ease-out forwards`;
        particle.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(particle);
    }
}

function handleEmailSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('user-name').value.trim();
    const whatsapp = document.getElementById('user-whatsapp').value.trim();
    const email = document.getElementById('user-email').value.trim();
    
    if (!name) {
        showCosmicAlert('Por favor, insira seu nome cósmico.');
        return;
    }
    if (!whatsapp || !isValidWhatsapp(whatsapp)) {
        showCosmicAlert('Por favor, insira um WhatsApp válido.');
        return;
    }
    if (!email || !isValidEmail(email)) {
        showCosmicAlert('Por favor, insira coordenadas cósmicas válidas (email).');
        return;
    }
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<div class="btn-content"><i class="fas fa-rocket fa-spin"></i><span>Ativando Teletransporte...</span></div>';
    submitBtn.disabled = true;
    
    // Simular processamento com efeitos visuais
    createTeleportEffect();
    
    setTimeout(() => {
        // Aqui você faria a integração real com seu sistema
        console.log('Nome capturado:', name);
        console.log('WhatsApp capturado:', whatsapp);
        console.log('Email capturado:', email);
        console.log('Desconto aplicado:', finalDiscount + '%');
        
        // Redirecionar para página de pagamento
        // window.location.href = `https://checkout.exemplo.com?email=${encodeURIComponent(email)}&discount=${finalDiscount}`;
        
        showCosmicAlert(`Teletransporte ativado! Redirecionando para o portal quântico com ${finalDiscount}% de desconto...`);
        
        // Restaurar botão
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    }, 3000);
}

function isValidWhatsapp(whatsapp) {
    // Aceita números, espaços, parênteses, traços e +, mínimo 8 dígitos
    const cleaned = whatsapp.replace(/\D/g, '');
    return cleaned.length >= 8 && cleaned.length <= 20;
}

function createTeleportEffect() {
    const form = document.querySelector('.cosmic-form');
    if (form) {
        form.style.filter = 'blur(2px)';
        form.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            form.style.filter = 'none';
            form.style.transform = 'scale(1)';
        }, 2000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showCosmicAlert(message) {
    // Criar alert customizado com tema cósmico
    const alert = document.createElement('div');
    alert.style.position = 'fixed';
    alert.style.top = '50%';
    alert.style.left = '50%';
    alert.style.transform = 'translate(-50%, -50%)';
    alert.style.background = 'rgba(26, 26, 46, 0.95)';
    alert.style.color = '#ffffff';
    alert.style.padding = '2rem';
    alert.style.borderRadius = '20px';
    alert.style.border = '2px solid #00d4ff';
    alert.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.5)';
    alert.style.zIndex = '10000';
    alert.style.fontFamily = 'Exo 2, sans-serif';
    alert.style.textAlign = 'center';
    alert.style.maxWidth = '400px';
    alert.innerHTML = `
        <div style="margin-bottom: 1rem; font-size: 2rem;">🌟</div>
        <p>${message}</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border: none;
            border-radius: 25px;
            color: white;
            cursor: pointer;
            font-weight: 600;
        ">OK</button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// ===== CONFETTI CÓSMICO =====
function triggerCosmicConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const colors = ['#ffd700', '#ff6b9d', '#00d4ff', '#00ff88', '#ff6b6b', '#4ecdc4'];
    const confettiCount = 200;
    
    // Criar confetti cósmico
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            vx: (Math.random() - 0.5) * 10,
            vy: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 12 + 6,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 15,
            gravity: 0.3,
            bounce: 0.7,
            glow: Math.random() > 0.5
        });
    }
    
    function animateCosmicConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach((piece, index) => {
            piece.x += piece.vx;
            piece.y += piece.vy;
            piece.vy += piece.gravity;
            piece.rotation += piece.rotationSpeed;
            
            // Bounce effect
            if (piece.y > canvas.height - piece.size) {
                piece.y = canvas.height - piece.size;
                piece.vy *= -piece.bounce;
                piece.vx *= 0.9;
            }
            
            if (piece.x < 0 || piece.x > canvas.width) {
                piece.vx *= -piece.bounce;
            }
            
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            
            if (piece.glow) {
                ctx.shadowColor = piece.color;
                ctx.shadowBlur = 15;
            }
            
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size/2, -piece.size/2, piece.size, piece.size);
            ctx.restore();
            
            // Remover confetti que parou de se mover
            if (Math.abs(piece.vy) < 0.1 && Math.abs(piece.vx) < 0.1) {
                confetti.splice(index, 1);
            }
        });
        
        if (confetti.length > 0) {
            requestAnimationFrame(animateCosmicConfetti);
        }
    }
    
    animateCosmicConfetti();
}

// ===== EFEITOS SONOROS =====
function playCosmicSound() {
    // Criar som sintético usando Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// ===== CSS DINÂMICO =====
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes explode {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) translate(${Math.random() * 400 - 200}px, ${Math.random() * 400 - 200}px) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar estilos dinâmicos
addDynamicStyles();