const wrap = (value, range) => ((value % range) + range) % range;

function initCanvasAeroShards() {
  const host = document.querySelector('.aurora');
  if (!host) return undefined;

  const canvas = document.createElement('canvas');
  canvas.className = 'aero-shards';
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  const context = canvas.getContext('2d');
  if (!context) {
    canvas.remove();
    console.error('Could not initialize the Aero Shards background canvas.');
    return undefined;
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const shards = [];
  let width = 0;
  let height = 0;
  let hue = 290;
  let frame = 0;

  const seed = value => {
    const result = Math.sin(value * 127.1 + width * 0.013 + height * 0.017) * 43758.5453;
    return result - Math.floor(result);
  };

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

    const count = width < 600 ? 12 : 20;
    shards.length = 0;

    for (let index = 0; index < count; index++) {
      const depth = 0.25 + seed(index * 7 + 1) * 0.75;
      shards.push({
        x: seed(index * 7 + 2) * width,
        y: seed(index * 7 + 3) * height,
        length: (0.12 + seed(index * 7 + 4) * 0.24) * width,
        thickness: (0.018 + seed(index * 7 + 5) * 0.035) * height,
        angle: (seed(index * 7 + 6) - 0.5) * 0.62,
        phase: seed(index * 7 + 7) * Math.PI * 2,
        speed: (8 + seed(index * 11 + 2) * 18) * depth,
        depth,
        facet: seed(index * 11 + 3) > 0.5
      });
    }

    render(0);
  };

  function drawShard(shard, time, lightMode) {
    const length = shard.length;
    const thickness = shard.thickness;
    const drift = Math.sin(time * 0.00022 + shard.phase) * height * 0.035;
    const x = wrap(shard.x + time * shard.speed / 1000, width + length * 2) - length;
    const y = shard.y + drift;
    const points = [
      [-length * 0.5, -thickness * 0.05],
      [-length * 0.31, -thickness * 0.48],
      [length * 0.27, -thickness * 0.38],
      [length * 0.5, -thickness * 0.08],
      [length * 0.22, thickness * 0.46],
      [-length * 0.36, thickness * 0.34]
    ];
    const alpha = (lightMode ? 0.14 : 0.2) * shard.depth;

    context.save();
    context.translate(x, y);
    context.rotate(shard.angle + Math.sin(time * 0.00016 + shard.phase) * 0.035);
    context.globalAlpha = 1;
    context.shadowColor = `hsla(${hue + 36}, 90%, 72%, ${alpha})`;
    context.shadowBlur = 28 * shard.depth;
    context.beginPath();
    context.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(([pointX, pointY]) => context.lineTo(pointX, pointY));
    context.closePath();

    const glass = context.createLinearGradient(-length * 0.2, -thickness, length * 0.25, thickness);
    glass.addColorStop(0, `hsla(${hue + 5}, 74%, ${lightMode ? 66 : 78}%, ${alpha * 0.25})`);
    glass.addColorStop(0.52, `hsla(${hue + 42}, 82%, ${lightMode ? 72 : 88}%, ${alpha})`);
    glass.addColorStop(1, `hsla(${hue + 110}, 72%, ${lightMode ? 62 : 76}%, ${alpha * 0.35})`);
    context.fillStyle = glass;
    context.fill();
    context.shadowBlur = 0;
    context.strokeStyle = `hsla(${hue + 48}, 92%, ${lightMode ? 42 : 92}%, ${alpha * 1.8})`;
    context.lineWidth = Math.max(0.6, shard.depth * 1.15);
    context.stroke();

    context.beginPath();
    context.moveTo(points[1][0], points[1][1]);
    context.lineTo(points[2][0], points[2][1]);
    context.lineTo(shard.facet ? points[4][0] : points[3][0], shard.facet ? points[4][1] : points[3][1]);
    context.closePath();
    context.fillStyle = `hsla(${hue + 58}, 90%, ${lightMode ? 58 : 96}%, ${alpha * 0.42})`;
    context.fill();
    context.beginPath();
    context.moveTo(points[0][0], points[0][1]);
    context.lineTo(points[1][0], points[1][1]);
    context.lineTo(points[2][0], points[2][1]);
    context.strokeStyle = `hsla(${hue + 55}, 96%, ${lightMode ? 52 : 98}%, ${alpha * 1.25})`;
    context.lineWidth = Math.max(0.7, shard.depth * 1.4);
    context.stroke();
    context.restore();
  }

  function drawMarker(index, time, lightMode) {
    const x = wrap(seed(index * 13 + 19) * width + time * (4 + index % 4) / 1000, width);
    const y = seed(index * 13 + 23) * height;
    const radius = 2 + (index % 3);
    const alpha = lightMode ? 0.13 : 0.3;

    context.save();
    context.strokeStyle = `hsla(${hue + 44}, 78%, ${lightMode ? 42 : 78}%, ${alpha})`;
    context.lineWidth = 0.8;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.moveTo(x - radius * 2.2, y);
    context.lineTo(x + radius * 2.2, y);
    context.moveTo(x, y - radius * 2.2);
    context.lineTo(x, y + radius * 2.2);
    context.stroke();
    context.restore();
  }

  function render(time) {
    context.clearRect(0, 0, width, height);
    const lightMode = document.documentElement.classList.contains('light');
    shards.forEach(shard => drawShard(shard, time, lightMode));
    for (let index = 0; index < 14; index++) drawMarker(index, time, lightMode);
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

export function initAeroShards() {
  const host = document.querySelector('.aurora');
  if (!host) return undefined;
  if (typeof navigator === 'undefined' || !navigator.gpu) {
    return initCanvasAeroShards();
  }

  let disposed = false;
  let reactRoot = null;
  let rootElement = null;
  let fallbackCleanup = null;

  const observer = new MutationObserver(render);

  function useFallback(error) {
    if (disposed || fallbackCleanup) return;
    console.error('ReactBits Aero Shards could not start; using the canvas fallback.', error);
    observer.disconnect();
    reactRoot?.unmount();
    reactRoot = null;
    rootElement?.remove();
    rootElement = null;
    fallbackCleanup = initCanvasAeroShards();
  }

  function render() {
    if (!reactRoot) return;
    const root = document.documentElement;
    const hueValue = Number.parseFloat(getComputedStyle(root).getPropertyValue('--hue'));
    const hue = Number.isFinite(hueValue) ? hueValue : 290;

    reactRoot.render(
      createElement(AeroShards, {
        shardColor: `hsl(${wrap(hue - 30, 360)}, 41%, 57%)`,
        accentColor: `hsl(${wrap(hue - 20, 360)}, 91%, 66%)`,
        placement: 'full',
        material: 'glass',
        markers: 'plus',
        count: 1300,
        depthOfField: 0.75,
        vignette: 0.3,
        mouseInteraction: true,
        pulseOnClick: true,
        holdToGather: true,
        lightMode: root.classList.contains('light'),
        shardSize: 1,
        spread: 1,
        twist: 1,
        billow: 1,
        speed: 1,
        scale: 1,
        glow: 0.35,
        grain: 0.06,
        intro: true,
        mouseStrength: 0.6,
        parallax: 0.5,
        paused: false,
        style: { position: 'absolute', inset: 0, width: '100%', height: '100%' },
        onError: useFallback
      })
    );
  }

  let createElement;
  let createRoot;
  let AeroShards;
  Promise.all([
    import('react'),
    import('react-dom/client'),
    import('./ReactBitsAeroShards.jsx')
  ])
    .then(function (modules) {
      if (disposed) return;
      createElement = modules[0].createElement;
      createRoot = modules[1].createRoot;
      AeroShards = modules[2].default;
      rootElement = document.createElement('div');
      host.appendChild(rootElement);
      reactRoot = createRoot(rootElement);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
      render();
    })
    .catch(useFallback);

  return function cleanup() {
    disposed = true;
    observer.disconnect();
    reactRoot?.unmount();
    rootElement?.remove();
    fallbackCleanup?.();
  };
}
