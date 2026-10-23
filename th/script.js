/**
 * ==============================================================================
 * PORTFÓLIO PESSOAL — MATHEUS ISMÉRIO DA SILVA
 * Estudante do 2º ano do Ensino Médio Técnico em Desenvolvimento de Sistemas
 * Script JavaScript Puro (Vanilla JS)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. ANO ATUAL NO RODAPÉ
     ========================================================================== */
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     2. BARRA DE PROGRESSO DE ROLAGEM, CABEÇALHO SCROLLED E VOLTAR AO TOPO
     ========================================================================== */
  const progressBar = document.getElementById('scroll-progress-bar');
  const siteHeader = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('btn-back-to-top');

  const handleScrollEffects = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Atualiza barra de progresso
    if (progressBar && docHeight > 0) {
      const progressPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      progressBar.style.width = `${progressPercent}%`;
    }

    // Adiciona classe ao cabeçalho quando rolar a página
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Mostra/oculta botão Voltar ao Topo
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     3. MENU MOBILE ACESSÍVEL
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('open');
    });

    // Fecha o menu mobile ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Fecha ao clicar fora do menu
    document.addEventListener('click', (event) => {
      if (mainNav.classList.contains('open') && 
          !mainNav.contains(event.target) && 
          !mobileToggle.contains(event.target)) {
        mainNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     4. DESTAQUE DO LINK ATIVO NA NAVEGAÇÃO AO ROLAR (INTERSECTION OBSERVER)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  /* ==========================================================================
     5. ANIMAÇÕES SUAVES AO ROLAR (.scroll-reveal)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores antigos
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ==========================================================================
     6. DETALHES DAS TECNOLOGIAS (MODAL / CLIQUE NOS CARTÕES)
     ========================================================================== */
  const techData = {
    'html': {
      title: 'HTML (HyperText Markup Language)',
      badgeClass: 'icon-html',
      iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      description: 'O HTML é a espinha dorsal de qualquer site na internet. Ele define o esqueleto, títulos, parágrafos, botões, tabelas e links de uma página por meio de tags semânticas organizadas.',
      learning: 'No curso técnico, comecei aprendendo a estrutura das páginas, a importância da acessibilidade e como organizar cada elemento de forma clara para que os navegadores interpretem o conteúdo perfeitamente.'
    },
    'css': {
      title: 'CSS (Cascading Style Sheets)',
      badgeClass: 'icon-css',
      iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>',
      description: 'O CSS é o que torna uma página agradável e profissional. Ele controla cores, tipografia, espaçamentos, sombras, gradientes, alinhamentos e adapta o site para qualquer tela (design responsivo).',
      learning: 'Estou aprendendo a usar propriedades modernas como Flexbox e Grid, além de criar transições suaves e layouts responsivos para celulares, tablets e computadores, como fiz neste portfólio.'
    },
    'javascript': {
      title: 'JavaScript',
      badgeClass: 'icon-js',
      iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
      description: 'O JavaScript é a linguagem fundamental para dar vida e interatividade à web. Com ele é possível responder a cliques, modificar textos em tempo real, validar formulários e controlar dados.',
      learning: 'É a linguagem que estou praticando com entusiasmo no curso: aprendendo a manipular o DOM, capturar eventos, criar funções e construir elementos interativos como o terminal e este próprio modal.'
    },
    'logica': {
      title: 'Lógica de Programação',
      badgeClass: 'icon-logica',
      iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
      description: 'A lógica de programação é a base de todo o pensamento computacional. É a habilidade de quebrar um problema grande em passos simples, ordenados e compreensíveis para o computador.',
      learning: 'Estudo conceitos essenciais como variáveis, operadores, estruturas condicionais (if/else) e laços de repetição (for/while). Essa base me ajuda a pensar antes de sair escrevendo código.'
    },
    'banco-dados': {
      title: 'Banco de Dados',
      badgeClass: 'icon-db',
      iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
      description: 'Bancos de dados são sistemas dedicados a armazenar, consultar, atualizar e proteger informações digitais de maneira estruturada e segura, como cadastros e produtos.',
      learning: 'Estou tendo os primeiros contatos com modelos de dados, tabelas, chaves primárias e conceitos básicos de SQL, entendendo como os dados das aplicações são guardados.'
    },
    'informatica': {
      title: 'Informática e Fundamentos',
      badgeClass: 'icon-info',
      iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
      description: 'Envolve a base essencial de como funcionam computadores, hardware, sistemas operacionais, redes de computadores, segurança e ferramentas de produtividade.',
      learning: 'Essa matéria me dá uma visão completa sobre o funcionamento da máquina por trás do código, permitindo diagnosticar problemas e compreender melhor o ambiente digital.'
    },
    'desenvolvimento': {
      title: 'Desenvolvimento de Sistemas',
      badgeClass: 'icon-dev',
      iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="12" y1="2" x2="12" y2="22"></line></svg>',
      description: 'A área que une todas as matérias técnicas: entender as etapas de criação de um software, desde o planejamento dos requisitos até a implementação e os testes.',
      learning: 'É o foco do meu curso técnico. Aprendo que programar não é só digitar linhas de código, mas sim planejar soluções organizadas que resolvam problemas reais.'
    }
  };

  const knowledgeCards = document.querySelectorAll('.knowledge-card');
  const knowledgeModal = document.getElementById('knowledge-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalActionBtn = document.getElementById('modal-action-btn');
  const modalTitle = document.getElementById('modal-tech-title');
  const modalIcon = document.getElementById('modal-tech-icon');
  const modalDescription = document.getElementById('modal-tech-description');
  const modalLearning = document.getElementById('modal-tech-learning');
  let lastActiveElement = null;

  const openTechModal = (techKey, triggerElement) => {
    const data = techData[techKey];
    if (!data || !knowledgeModal) return;

    lastActiveElement = triggerElement;

    modalTitle.textContent = data.title;
    modalIcon.className = `modal-icon-badge ${data.badgeClass}`;
    modalIcon.innerHTML = data.iconSvg;
    modalDescription.textContent = data.description;
    modalLearning.textContent = data.learning;

    knowledgeModal.classList.add('active');
    knowledgeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Foco no botão de fechar para acessibilidade
    setTimeout(() => {
      if (modalCloseBtn) modalCloseBtn.focus();
    }, 100);
  };

  const closeTechModal = () => {
    if (!knowledgeModal) return;
    knowledgeModal.classList.remove('active');
    knowledgeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Restaura o foco para o cartão acionador
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  knowledgeCards.forEach(card => {
    const techKey = card.getAttribute('data-tech');

    // Clique com o mouse
    card.addEventListener('click', () => {
      openTechModal(techKey, card);
    });

    // Acessibilidade via teclado (Enter ou Barra de Espaço)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openTechModal(techKey, card);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeTechModal);
  if (modalActionBtn) modalActionBtn.addEventListener('click', closeTechModal);

  // Fecha modal ao clicar fora do cartão
  if (knowledgeModal) {
    knowledgeModal.addEventListener('click', (e) => {
      if (e.target === knowledgeModal) {
        closeTechModal();
      }
    });
  }

  // Tecla Escape para fechar modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && knowledgeModal && knowledgeModal.classList.contains('active')) {
      closeTechModal();
    }
  });

  /* ==========================================================================
     7. TERMINAL INTERATIVO COM COMANDOS SEGUROS
     ========================================================================== */
  const terminalOutput = document.getElementById('terminal-output');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const terminalChips = document.querySelectorAll('.terminal-chip');
  const clearTerminalBtn = document.getElementById('btn-clear-terminal');

  // Respostas oficiais e autênticas para cada comando
  const terminalResponses = {
    'sobre-mim': 'Sou estudante de Desenvolvimento de Sistemas e gosto de aprender sobre tecnologia e programação.',
    'interesses': 'Meus principais interesses são desenvolvimento web, lógica de programação, funcionamento de sistemas operacionais e criação de interfaces modernas e funcionais.',
    'estudos': 'Estudo no 2º ano do Ensino Médio Técnico em Desenvolvimento de Sistemas em Campinas, SP. Atualmente estudando HTML, CSS, JavaScript, Banco de Dados e Lógica de Programação.',
    'objetivos': 'Aprofundar meus conhecimentos na área de tecnologia, praticar nas aulas, criar meus próprios projetos e descobrir qual área da tecnologia combina mais comigo.',
    'ajuda': 'Comandos disponíveis no terminal:\n  • sobre-mim   : Breve apresentação pessoal\n  • interesses  : Meus interesses na área de informática\n  • estudos     : Minha rotina escolar e matérias atuais\n  • objetivos   : Minhas metas e planos como estudante\n  • limpar      : Limpa o histórico de comandos\n  • ajuda       : Exibe esta lista de comandos'
  };

  /**
   * Adiciona um registro formatado no terminal
   */
  const appendTerminalEntry = (commandText, responseText) => {
    if (!terminalOutput) return;

    const entryDiv = document.createElement('div');
    entryDiv.className = 'terminal-log-entry';

    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-command-line';
    cmdLine.innerHTML = `<span class="term-user">Matheus</span>@<span class="term-host">portfolio</span>:~$ <span class="term-cmd">${escapeHtml(commandText)}</span>`;

    const outText = document.createElement('div');
    outText.className = 'term-output-text';
    outText.textContent = responseText;

    entryDiv.appendChild(cmdLine);
    entryDiv.appendChild(outText);
    terminalOutput.appendChild(entryDiv);

    // Rola para o fim automaticamente
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  };

  /**
   * Processa a execução do comando
   */
  const processTerminalCommand = (rawCommand) => {
    const cmd = rawCommand.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'limpar' || cmd === 'clear') {
      clearTerminal();
      return;
    }

    if (terminalResponses.hasOwnProperty(cmd)) {
      appendTerminalEntry(cmd, terminalResponses[cmd]);
    } else {
      const errorMsg = `Comando não reconhecido: "${cmd}". Digite "ajuda" para ver os comandos disponíveis.`;
      appendTerminalEntry(cmd, errorMsg);
    }
  };

  const clearTerminal = () => {
    if (!terminalOutput) return;
    terminalOutput.innerHTML = `
      <div class="terminal-welcome">
        <p class="term-dim">Terminal limpo. Digite um comando ou use os atalhos acima.</p>
        <p class="term-dim">Dica: digite <span class="term-hl">ajuda</span> para ver todos os comandos.</p>
        <br>
      </div>
    `;
  };

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      if (val.trim()) {
        processTerminalCommand(val);
        terminalInput.value = '';
      }
    });
  }

  // Comandos rápidos pelos botões (chips)
  terminalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-command');
      if (cmd) {
        processTerminalCommand(cmd);
        if (terminalInput) {
          terminalInput.focus();
        }
      }
    });
  });

  if (clearTerminalBtn) {
    clearTerminalBtn.addEventListener('click', clearTerminal);
  }

  /* ==========================================================================
     8. COMPUTADOR ILUSTRADO INTERATIVO (ALTERAR MENSAGENS)
     ========================================================================== */
  const pcQuotes = [
    'Todo conhecimento começa com curiosidade.',
    'Um passo de cada vez também é evolução.',
    'Aprender, praticar e melhorar.',
    'O próximo projeto pode começar com uma ideia simples.',
    'Constância e dedicação superam qualquer dificuldade.',
    'Errar na programação faz parte do processo de aprender a acertar.'
  ];

  let currentPcQuoteIndex = 0;
  const pcScreen = document.getElementById('pc-screen');
  const interactivePc = document.getElementById('interactive-pc');
  const pcMessageText = document.getElementById('pc-message-text');
  const btnNextPcQuote = document.getElementById('btn-next-pc-quote');

  const advancePcQuote = () => {
    if (!pcMessageText) return;
    currentPcQuoteIndex = (currentPcQuoteIndex + 1) % pcQuotes.length;

    // Transição suave de opacidade
    pcMessageText.style.opacity = '0';
    setTimeout(() => {
      pcMessageText.textContent = pcQuotes[currentPcQuoteIndex];
      pcMessageText.style.opacity = '1';
    }, 200);
  };

  if (interactivePc) {
    interactivePc.addEventListener('click', advancePcQuote);
    interactivePc.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        advancePcQuote();
      }
    });
  }

  if (btnNextPcQuote) {
    btnNextPcQuote.addEventListener('click', advancePcQuote);
  }

  /* ==========================================================================
     9. BOTÃO DE INSPIRAÇÃO: "UMA IDEIA PARA HOJE"
     ========================================================================== */
  const inspirationQuotes = [
    'Aprender a programar é como aprender um novo idioma: a prática diária constrói a fluência.',
    'Cada linha de código que você escreve é um degrau a mais no seu conhecimento.',
    'Grandes sistemas nasceram de pequenos testes e muita curiosidade.',
    'Entender a lógica por trás de um problema é metade da solução.',
    'A tecnologia se transforma rápido, mas a vontade de aprender é o que nos mantém em evolução.',
    'Não tenha medo de começar do zero; todo especialista já foi um iniciante.',
    'O código mais limpo é aquele construído com clareza, paciência e bons fundamentos.'
  ];

  let currentInspirationIndex = 0;
  const inspirationText = document.getElementById('inspiration-text');
  const btnNewInspiration = document.getElementById('btn-new-inspiration');

  const getNextInspiration = () => {
    if (!inspirationText) return;

    // Seleciona uma frase diferente da atual
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * inspirationQuotes.length);
    } while (nextIndex === currentInspirationIndex && inspirationQuotes.length > 1);

    currentInspirationIndex = nextIndex;

    inspirationText.style.opacity = '0';
    setTimeout(() => {
      inspirationText.textContent = inspirationQuotes[currentInspirationIndex];
      inspirationText.style.opacity = '1';
    }, 250);
  };

  if (btnNewInspiration) {
    btnNewInspiration.addEventListener('click', getNextInspiration);
  }

  /* ==========================================================================
     10. UTILITÁRIOS
     ========================================================================== */
  function escapeHtml(string) {
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
