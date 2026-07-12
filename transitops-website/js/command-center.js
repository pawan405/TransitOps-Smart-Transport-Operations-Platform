(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function createAmbient() {
    if (document.querySelector('.ops-ambient')) return;
    const ambient = document.createElement('div');
    ambient.className = 'ops-ambient';
    ambient.setAttribute('aria-hidden', 'true');
    ambient.innerHTML = '<div class="ops-fog"></div><div class="ops-beam"></div><div class="ops-radar"></div><div class="ops-highway" aria-hidden="true"></div>';
    const highway = ambient.querySelector('.ops-highway');
    for (let lane = 0; lane < 4; lane += 1) {
      const laneEl = document.createElement('div');
      laneEl.className = 'ops-lane';
      highway.appendChild(laneEl);
      const truckCount = lane === 1 ? 4 : 3;
      for (let i = 0; i < truckCount; i += 1) {
        const truck = document.createElement('div');
        truck.className = 'ops-truck';
        truck.style.top = `${lane * 20 + 5 + (i % 2) * 4}%`;
        truck.style.animationDuration = `${10 + lane * 2.6 + i * 1.8}s`;
        truck.style.animationDelay = `${-(i * 3.1 + lane * 1.7)}s`;
        truck.style.opacity = `${0.52 + lane * 0.08}`;
        truck.innerHTML = '<span class="ops-dust"></span><span class="ops-wheel"></span><span class="ops-wheel"></span>';
        highway.appendChild(truck);
      }
    }
    for (let i = 0; i < 48; i += 1) {
      const particle = document.createElement('span');
      particle.className = 'ops-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${12 + Math.random() * 18}s`;
      particle.style.animationDelay = `${-Math.random() * 22}s`;
      particle.style.opacity = `${0.22 + Math.random() * 0.6}`;
      ambient.appendChild(particle);
    }
    document.body.prepend(ambient);
  }

  function enhanceCards() {
    const selector = '.glass-panel, .glass, [class*="bg-surface-container-lowest"][class*="border"], [class*="bg-surface-container-low"][class*="border"]';
    document.querySelectorAll(selector).forEach((card) => {
      if (card.dataset.opsEnhanced === 'true') return;
      card.dataset.opsEnhanced = 'true';
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  function enhanceButtons() {
    document.querySelectorAll('button').forEach((button) => {
      if (button.dataset.opsButton === 'true') return;
      button.dataset.opsButton = 'true';
      button.addEventListener('click', (event) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ops-ripple';
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        button.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 700);
        const route = button.dataset.route;
        if (route) {
          event.preventDefault();
          const transition = document.querySelector('.ops-transition');
          if (transition) transition.classList.add('is-active');
          window.setTimeout(() => { window.location.href = route; }, 320);
        }
      });
    });
  }

  function parseMetric(text) {
    const match = text.trim().match(/^([^0-9+-]*)([+-]?\d+(?:\.\d+)?)(.*)$/);
    if (!match) return null;
    return { prefix: match[1], value: Number(match[2]), suffix: match[3] };
  }

  function formatMetric(metric, value) {
    const decimals = Number.isInteger(metric.value) ? 0 : 1;
    return `${metric.prefix}${value.toFixed(decimals)}${metric.suffix}`;
  }

  function animateTextNumber(element, from, to, metric, duration) {
    if (prefersReduced) {
      element.textContent = formatMetric(metric, to);
      return;
    }
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const value = from + (to - from) * ease(t);
      element.textContent = formatMetric(metric, value);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initLiveMetrics() {
    const candidates = Array.from(document.querySelectorAll('.font-data-lg, .text-data-lg, [class*="text-[48px]"], [class*="headline-xl"]'));
    const liveElements = candidates
      .map((element) => ({ element, metric: parseMetric(element.textContent || '') }))
      .filter((item) => item.metric && Math.abs(item.metric.value) < 100000);

    liveElements.forEach(({ element, metric }) => {
      if (element.dataset.opsLive === 'true') return;
      element.dataset.opsLive = 'true';
      element.dataset.opsValue = String(metric.value);
      animateTextNumber(element, 0, metric.value, metric, 900);
    });

    if (window.__opsMetricTimer) return;
    window.__opsMetricTimer = window.setInterval(() => {
      const live = Array.from(document.querySelectorAll('[data-ops-live="true"]'));
      if (!live.length) return;
      const element = live[Math.floor(Math.random() * live.length)];
      const currentMetric = parseMetric(element.textContent || '');
      if (!currentMetric) return;
      const current = Number(element.dataset.opsValue || currentMetric.value);
      const spread = Math.max(1, Math.abs(current) * 0.035);
      const next = Math.max(0, current + (Math.random() - 0.42) * spread);
      element.dataset.opsValue = String(next);
      element.classList.remove('ops-live-flash');
      void element.offsetWidth;
      element.classList.add('ops-live-flash');
      animateTextNumber(element, current, next, currentMetric, 720);
    }, 3600);
  }

  const notifications = [
    ['DISPATCH UPDATE', 'UNIT-442 rerouted through Corridor 7'],
    ['FUEL SYNC', 'Fleet charge telemetry refreshed'],
    ['MAINTENANCE WATCH', 'UNIT-088 diagnostic window opened'],
    ['ROUTE MESH', 'North depot latency dropped to 12ms'],
    ['SECURE LINK', 'Operator session integrity confirmed'],
    ['ALERT QUEUE', 'Two weather deviations under review']
  ];

  function initToasts() {
    if (document.querySelector('.ops-toast-stack')) return;
    const stack = document.createElement('div');
    stack.className = 'ops-toast-stack';
    document.body.appendChild(stack);
    const pushToast = () => {
      const [title, body] = notifications[Math.floor(Math.random() * notifications.length)];
      const toast = document.createElement('div');
      toast.className = 'ops-toast';
      toast.innerHTML = `<strong>${title}</strong>${body}`;
      stack.appendChild(toast);
      window.setTimeout(() => toast.remove(), 5400);
    };
    window.setTimeout(pushToast, 1000);
    if (!window.__opsToastTimer) window.__opsToastTimer = window.setInterval(pushToast, 6800);
  }

  function initTransitions() {
    if (document.querySelector('.ops-transition')) return;
    const transition = document.createElement('div');
    transition.className = 'ops-transition';
    document.body.appendChild(transition);
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || link.target) return;
      event.preventDefault();
      transition.classList.add('is-active');
      window.setTimeout(() => { window.location.href = href; }, 360);
    });
    requestAnimationFrame(() => {
      transition.classList.add('is-active');
      window.setTimeout(() => transition.classList.remove('is-active'), 180);
    });
  }

  function initAudioCue() {
    document.addEventListener('click', (event) => {
      if (!event.target.closest('button, a')) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const context = window.__opsAudio || new AudioContext();
        window.__opsAudio = context;
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.type = 'sine';
        osc.frequency.value = 740;
        gain.gain.setValueAtTime(0.0001, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.018, context.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(context.destination);
        osc.start();
        osc.stop(context.currentTime + 0.1);
      } catch (_error) {}
    }, { passive: true });
  }

  function boot() {
    createAmbient();
    enhanceCards();
    enhanceButtons();
    initLiveMetrics();
    initToasts();
    initTransitions();
    initAudioCue();
    document.body.classList.add('ops-command-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
