const randomBetween = (min, max, seed) => min + (max - min) * seed;

export function initBinaryOrbits() {
  const host = document.querySelector('.aurora');
  if (!host) return undefined;

  const canvas = document.createElement('canvas');
  canvas.className = 'binary-orbits';
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  const context = canvas.getContext('2d');
  if (!context) {
    canvas.remove();
    console.error('Could not initialize the binary-orbits background canvas.');
    return undefined;
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const orbits = [];
  let width = 0;
  let height = 0;
  let hue = 290;
  let frame = 0;

  const updateTheme = () => {
    const parsedHue = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'));
    if (Number.isFinite(parsedHue)) hue = parsedHue;
    render(0);
  };

  const resize = () => {
    width = Math.max(1, host.clientWidth);
    height = Math.max(1, host.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const seed = value => {
      const result = Math.sin(value * 127.1 + width * 0.013 + height * 0.017) * 43758.5453;
      return result - Math.floor(result);
    };
    const count = width < 600 ? 5 : 8;
    orbits.length = 0;

    for (let i = 0; i < count; i++) {
      const centerX = seed(i * 4 + 1) * width;
      const centerY = seed(i * 4 + 2) * height;
      orbits.push({
        x: centerX,
        y: centerY,
        radiusX: Math.max(85, width * (0.12 + seed(i * 4 + 3) * 0.25)),
        radiusY: Math.max(55, height * (0.07 + seed(i * 4 + 4) * 0.16)),
        rotation: (seed(i * 5 + 2) - 0.5) * 1.8,
        phase: seed(i * 9 + 1) * Math.PI * 2,
        speed: (0.00006 + seed(i * 9 + 3) * 0.00008) * (i % 2 ? -1 : 1),
        digits: Array.from({ length: 10 + Math.floor(seed(i * 8 + 5) * 8) }, (_, digit) =>
          randomBetween(0, 1, seed(i * 31 + digit + 6)) > 0.5 ? '1' : '0'
        )
      });
    }

    render(0);
  };

  function render(time) {
    context.clearRect(0, 0, width, height);
    const lightMode = document.documentElement.classList.contains('light');

    orbits.forEach(orbit => {
      context.save();
      context.translate(orbit.x, orbit.y);
      context.rotate(orbit.rotation);
      context.beginPath();
      context.ellipse(0, 0, orbit.radiusX, orbit.radiusY, 0, 0, Math.PI * 2);
      context.strokeStyle = `hsla(${hue}, 85%, 68%, ${lightMode ? 0.1 : 0.15})`;
      context.lineWidth = 1;
      context.stroke();
      context.restore();

      orbit.digits.forEach((digit, index) => {
        const angle = (index / orbit.digits.length) * Math.PI * 2 + orbit.phase + time * orbit.speed;
        const ellipseX = Math.cos(angle) * orbit.radiusX;
        const ellipseY = Math.sin(angle) * orbit.radiusY;
        const x = orbit.x + ellipseX * Math.cos(orbit.rotation) - ellipseY * Math.sin(orbit.rotation);
        const y = orbit.y + ellipseX * Math.sin(orbit.rotation) + ellipseY * Math.cos(orbit.rotation);
        const alpha = lightMode ? 0.16 : 0.34;
        context.fillStyle = `hsla(${hue}, 88%, 72%, ${alpha})`;
        context.font = '600 11px ui-monospace, SFMono-Regular, Consolas, monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(digit, x, y);
      });
    });
  }

  const animate = time => {
    if (!document.hidden && !motionQuery.matches) {
      render(time);
      frame = window.requestAnimationFrame(animate);
    }
  };

  const start = () => {
    window.cancelAnimationFrame(frame);
    render(0);
    if (!document.hidden && !motionQuery.matches) frame = window.requestAnimationFrame(animate);
  };
  const onVisibilityChange = () => {
    if (document.hidden) window.cancelAnimationFrame(frame);
    else start();
  };
  const onMotionChange = () => start();
  const themeObserver = new MutationObserver(updateTheme);

  resize();
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibilityChange);
  motionQuery.addEventListener('change', onMotionChange);
  start();

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    motionQuery.removeEventListener('change', onMotionChange);
    themeObserver.disconnect();
    canvas.remove();
  };
}
