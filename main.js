// Datasets (read-only constants)
// Shared Tableau 10 palette
const tableau10 = [
  '#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F',
  '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC'
];
const pubs_per_year_rows = [
  {year:2005,n_papers:1},{year:2006,n_papers:3},{year:2007,n_papers:1},{year:2008,n_papers:3},{year:2009,n_papers:2},{year:2010,n_papers:2},{year:2011,n_papers:3},{year:2012,n_papers:6},{year:2013,n_papers:3},{year:2014,n_papers:7},{year:2015,n_papers:4},{year:2016,n_papers:7},{year:2017,n_papers:8},{year:2018,n_papers:6},{year:2019,n_papers:5},{year:2020,n_papers:8},{year:2021,n_papers:8},{year:2022,n_papers:13},{year:2023,n_papers:14},{year:2024,n_papers:20},
];
const media_type_rows = [
  {media_type:"Traditional", n:82, percent:59.4},
  {media_type:"Social Media", n:38, percent:27.5},
  {media_type:"Other", n:18, percent:13.0},
];
const social_platforms_main_rows = [
  {platform:"Twitter", n:19, percent:31.7},
  {platform:"Instagram", n:16, percent:26.7},
  {platform:"YouTube", n:9, percent:15.0},
  {platform:"Facebook", n:6, percent:10.0},
  {platform:"Reddit", n:1, percent:1.7},
  {platform:"TikTok", n:1, percent:1.7},
];
const methods_rows = [
  {approach:"Qualitative", n:60, percent:48.8},
  {approach:"Mixed", n:40, percent:32.2},
  {approach:"Quantitative", n:24, percent:24.0},
  {approach:"Automated_Image_Classification", n:5, percent:2.8},
];
const modality_rows_hier = [
  {group:"Unimodal", subcategory:"Images", n:53, percent:42.7},
  {group:"Unimodal", subcategory:"Videos", n:12, percent:9.7},
  {group:"Multimodal", subcategory:"Images + Text", n:51, percent:41.1},
  {group:"Multimodal", subcategory:"Images + Videos", n:5, percent:4.0},
  {group:"Multimodal", subcategory:"Images + Videos + Audio", n:1, percent:0.8},
  {group:"Multimodal", subcategory:"Images + Videos + Text", n:1, percent:0.8},
  {group:"Multimodal", subcategory:"Videos + Text", n:1, percent:0.8},
];
const modality_rows_leaf = [
  {modality:"Images", n:53, percent:42.7},
  {modality:"Videos", n:12, percent:9.7},
  {modality:"Images + Text", n:51, percent:41.1},
  {modality:"Images + Videos", n:5, percent:4.0},
  {modality:"Images + Videos + Audio", n:1, percent:0.8},
  {modality:"Images + Videos + Text", n:1, percent:0.8},
  {modality:"Videos + Text", n:1, percent:0.8},
];
const country_rows = [
  {country:"United States", n:38, percent:17.4},{country:"United Kingdom", n:30, percent:13.8},{country:"Germany", n:21, percent:9.6},{country:"Australia", n:11, percent:5.0},{country:"India", n:10, percent:4.6},{country:"South Africa", n:9, percent:4.1},{country:"Brazil", n:8, percent:3.7},{country:"Netherlands", n:8, percent:3.7},{country:"Canada", n:7, percent:3.2},{country:"China", n:5, percent:2.3},{country:"France", n:5, percent:2.3},{country:"Spain", n:4, percent:1.8},{country:"Sweden", n:4, percent:1.8},{country:"Bangladesh", n:3, percent:1.4},{country:"Chile", n:3, percent:1.4},{country:"Ireland", n:3, percent:1.4},{country:"Russia", n:3, percent:1.4},{country:"Turkey", n:3, percent:1.4},{country:"Argentina", n:2, percent:0.9},{country:"Belgium", n:2, percent:0.9},{country:"Denmark", n:2, percent:0.9},{country:"Finland", n:2, percent:0.9},{country:"Indonesia", n:2, percent:0.9},{country:"Israel", n:2, percent:0.9},{country:"Italy", n:2, percent:0.9},{country:"Mexico", n:2, percent:0.9},{country:"Norway", n:2, percent:0.9},{country:"Poland", n:2, percent:0.9},{country:"Qatar", n:2, percent:0.9},{country:"Singapore", n:2, percent:0.9},{country:"Switzerland", n:2, percent:0.9},{country:"Austria", n:1, percent:0.5},{country:"Colombia", n:1, percent:0.5},{country:"Egypt", n:1, percent:0.5},{country:"Fiji", n:1, percent:0.5},{country:"Hong Kong", n:1, percent:0.5},{country:"Hungary", n:1, percent:0.5},{country:"Japan", n:1, percent:0.5},{country:"Kenya", n:1, percent:0.5},{country:"Lebanon", n:1, percent:0.5},{country:"New Zealand", n:1, percent:0.5},{country:"Nigeria", n:1, percent:0.5},{country:"Peru", n:1, percent:0.5},{country:"Portugal", n:1, percent:0.5},{country:"Thailand", n:1, percent:0.5},{country:"United Arab Emirates", n:1, percent:0.5},{country:"Vanuatu", n:1, percent:0.5},{country:"Vietnam", n:1, percent:0.5},
];

// Theme toggle (light / dark / auto) — resilient & accessible
(() => {
  const root = document.documentElement;
  const storageKey = 'theme';
  const btn = document.getElementById('themeToggle'); // may be null
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const safeSet = (el, attr, val) => { if (el) el.setAttribute(attr, val); };

  const getStored = () => {
    try { return localStorage.getItem(storageKey) || 'auto'; }
    catch { return 'auto'; }
  };

  const setStored = (mode) => {
    try { localStorage.setItem(storageKey, mode); } catch {}
  };

  // Apply chosen mode to the document
  const apply = (mode, {fromStorage=false} = {}) => {
    if (mode === 'auto') {
      // Remove explicit theme; let media query drive it
      root.removeAttribute('data-theme');
      // Hint to UA for form controls, etc.
      root.style.colorScheme = media.matches ? 'dark' : 'light';
      safeSet(btn, 'aria-pressed', 'mixed');
      safeSet(btn, 'data-mode', 'auto');
      safeSet(btn, 'title', 'Theme: Auto');
    } else {
      root.setAttribute('data-theme', mode);         // 'light' or 'dark'
      root.style.colorScheme = mode;
      safeSet(btn, 'aria-pressed', String(mode === 'dark'));
      safeSet(btn, 'data-mode', mode);
      safeSet(btn, 'title', `Theme: ${mode[0].toUpperCase()+mode.slice(1)}`);
    }
    if (!fromStorage) setStored(mode);
  };

  // React to OS theme changes when in auto
  media.addEventListener?.('change', () => {
    if (getStored() === 'auto') apply('auto', {fromStorage:true});
  });

  // Initial paint
  apply(getStored(), {fromStorage:true});

  // Click to cycle: auto → light → dark → auto
  btn?.addEventListener('click', () => {
    const current = getStored();
    const next = current === 'auto' ? 'light' : current === 'light' ? 'dark' : 'auto';
    apply(next);
  });
})();


// Resize observer utility
function onResize(element, callback){
  const ro = new ResizeObserver(() => callback());
  ro.observe(element);
  return () => ro.disconnect();
}

// Intersection/scroll orchestration
const steps = Array.from(document.querySelectorAll('.step'));
const stepCallbacks = new Map();
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const fn = stepCallbacks.get(entry.target.id);
      fn && fn('enter', entry);
    } else {
      const fn = stepCallbacks.get(entry.target.id);
      fn && fn('exit', entry);
    }
  });
}, { root: null, threshold: 0.35 });
steps.forEach(s => io.observe(s));

// Hero collage (fade stripes -> photos)
function initHero(){
  const container = document.querySelector('#hero .hero-visual');
  const images = [
    'images/stripes.jpg', 'images/flood.jpg', 'images/wildfire.jpg'  ];
  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src; img.loading = 'lazy'; img.alt = '';
    if(idx === 0) img.classList.add('active');
    container?.appendChild(img);
  });
  let current = 0; const imgs = container?.querySelectorAll('img') || [];
  function advance(){
    if(!imgs.length) return;
    imgs[current].classList.remove('active');
    current = (current + 1) % imgs.length;
    imgs[current].classList.add('active');
  }
  let timer; 
  stepCallbacks.set('hero', (state) => {
    if(state === 'enter'){
      const caps = document.querySelectorAll('#hero .hero-captions p');
      const texts = document.querySelectorAll('#hero .hero-caption-texts p');
      let ix = 0; caps.forEach(c=>c.classList.remove('active'));
      texts.forEach(t=>t.style.display = 'none');
      const spin = () => {
        caps.forEach(c=>c.classList.remove('active'));
        texts.forEach(t=>t.style.display = 'none');
        if(caps.length && texts.length){
          caps[ix%caps.length].classList.add('active');
          texts[ix%texts.length].style.display = 'block';
          ix++;
        }
      };
      spin();
      timer = setInterval(()=>{ advance(); spin(); }, 4200);
    } else {
      clearInterval(timer);
    }
  });
}

// Publications ridge/area chart (single series area with highlight band)
function initPubs(){
  const el = document.getElementById('pubs-chart');
  const margin = {top:20,right:16,bottom:28,left:36};
  const svg = d3.select(el).append('svg');
  const g = svg.append('g');

  // Highlight band
  const band = g.append('rect')
    .attr('fill','rgba(56,189,248,0.22)')
    .attr('opacity', 0);

  // Area path (revealed via clip)
  const path = g.append('path')
    .attr('fill','url(#grad)')
    .attr('stroke','var(--accent)')
    .attr('stroke-width',1.5);

  const xAxisG = g.append('g');
  const yAxisG = g.append('g');

  const defs = svg.append('defs');
  const grad = defs.append('linearGradient')
    .attr('id','grad').attr('x1',0).attr('x2',0).attr('y1',0).attr('y2',1);
  grad.append('stop').attr('offset','0%').attr('stop-color','var(--accent)').attr('stop-opacity',0.6);
  grad.append('stop').attr('offset','100%').attr('stop-color','var(--accent)').attr('stop-opacity',0.05);

  // Reveal clip
  const clip = defs.append('clipPath').attr('id','reveal');
  const clipRect = clip.append('rect').attr('x',0).attr('y',0).attr('width',0).attr('height',0);
  path.attr('clip-path', 'url(#reveal)');

  // --- pulse controller flags ---
  let bandActive = false;   // currently visible & pulsing?
  let bandInited = false;   // we’ve already crossed 2020 at least once?

  // Reusable pulse animation
  function pulse(){
    band
      .transition().duration(900).ease(d3.easeCubicInOut).attr('opacity', 0.35)
      .transition().duration(900).ease(d3.easeCubicInOut).attr('opacity', 0.9)
      .on('end', ()=> { if (bandActive) pulse(); });
  }

  function render(progress=1){
    const width = el.clientWidth, height = el.clientHeight;
    svg.attr('width', width).attr('height', height);

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    g.attr('transform', `translate(${margin.left},${margin.top})`);

    const years = pubs_per_year_rows.map(d=>d.year);
    const lastYear = d3.max(years);
    const x = d3.scaleLinear().domain(d3.extent(years)).range([0, innerW]);
    const y = d3.scaleLinear().domain([0, d3.max(pubs_per_year_rows, d=>d.n_papers)]).nice().range([innerH, 0]);

    const area = d3.area()
      .x(d=>x(d.year))
      .y0(innerH)
      .y1(d=>y(d.n_papers))
      .curve(d3.curveMonotoneX);

    path.datum(pubs_per_year_rows).attr('d', area);

    // Update reveal based on progress
    clipRect.attr('height', innerH).attr('width', innerW * Math.max(0, Math.min(1, progress)));

    xAxisG.attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')).ticks(Math.min(8, pubs_per_year_rows.length/2)));
    yAxisG.call(d3.axisLeft(y).ticks(5));

    // Position highlight band (2020 → lastYear)
    const x2020 = x(2020), xEnd = x(lastYear);
    band.attr('x', x2020).attr('y', 0).attr('width', Math.max(0, xEnd - x2020)).attr('height', innerH);

    // Appear exactly when the reveal passes 2020, then pulse
    const revealX = innerW * progress;
    const crossed2020 = revealX >= x2020;

    if (crossed2020 && !bandActive){
      bandActive = true;
      // one-off intro: fade in quickly the first time we cross 2020
      if (!bandInited){
        bandInited = true;
        band.interrupt().attr('opacity', 0)
          .transition().duration(450).ease(d3.easeCubicOut).attr('opacity', 0.9)
          .on('end', pulse); // start breathing
      } else {
        // if re-entering (e.g., on replays), just resume pulse
        band.interrupt().attr('opacity', 0.9);
        pulse();
      }
    } else if (!crossed2020 && bandActive){
      // Went back before 2020 (e.g., reverse progress): stop pulse and hide
      bandActive = false;
      band.interrupt().transition().duration(250).attr('opacity', 0);
    }
  }

  onResize(el, () => render(1));
  render(1);

  // Animate on section enter (unchanged)
  const annotations = document.getElementById('pubs-annotations');
  stepCallbacks.set('pubs', (state)=>{
    if(state==='enter'){
      annotations.innerHTML = '';
      const a = document.createElement('div'); a.className = 'callout'; annotations.appendChild(a);
      const shelf = document.createElement('div'); shelf.className = 'callout'; shelf.style.marginLeft='0.5rem'; annotations.appendChild(shelf);

      let progress = 0;
      const duration = 5200;
      const start = performance.now();

      function animate(now){
        const elapsed = now - start;
        progress = Math.min(1, elapsed / duration);
        render(progress);
        if(progress < 1) requestAnimationFrame(animate);
      }
      render(progress);
      requestAnimationFrame(animate);
    } else {
      annotations.innerHTML = '';
    }
  });
}

// 100% stacked bar + dot plot (basic implementation and separation animation)
function initMedia(){
const stackedEl = document.getElementById('stacked-bar');
  const svg = d3.select(stackedEl).append('svg');
  const g = svg.append('g');
  const margin = {top:16,right:16,bottom:16,left:16};

  const slicesG = g.append('g').attr('class', 'slices');
  const labelsG = g.append('g').attr('class', 'labels'); // groups with rect + text + line + triangle

  const colors = d3.scaleOrdinal()
    .domain(media_type_rows.map(d=>d.media_type))
    .range(tableau10);

  const pie = d3.pie()
    .value(d => d.percent)
    .sort((a,b) => d3.ascending(a.media_type, b.media_type));

  let arc, arcLabel;
  const padX = 8, padY = 5;   // badge padding
  const triLen = 7;           // pointer triangle tip offset from badge center
  const triHalf = 5;          // triangle half-base
  const lineShorten = 12;     // leader line end inset from badge center

  function render(){
    let width = stackedEl.clientWidth, height = stackedEl.clientHeight;
    if (!width || !height) { width = 380; height = 260; }
    svg.attr('width', width).attr('height', height);

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    const radius = Math.max(60, Math.min(innerW, innerH) * 0.45);

    // center group
    g.attr('transform', `translate(${margin.left + innerW/2},${margin.top + innerH/2})`);

    // geometry
    arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);
    const labelRadius = radius * 1.14; // put labels outside
    arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const data = media_type_rows.slice();
    const pieData = pie(data);

    // ---------- SLICES ----------
    const sliceSel = slicesG.selectAll('path.slice')
      .data(pieData, d => d.data.media_type);

    sliceSel.enter()
      .append('path')
      .attr('class', 'slice')
      .attr('fill', d => colors(d.data.media_type))
      .style('opacity', 0.9)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 2)
      .each(function(d){ this._current = {startAngle: d.startAngle, endAngle: d.startAngle}; })
      .attr('d', d => arc({startAngle: d.startAngle, endAngle: d.startAngle}));

    slicesG.selectAll('path.slice')
      .data(pieData, d => d.data.media_type)
      .transition().duration(900).ease(d3.easeCubicInOut)
      .attrTween('d', function(d){
        const i = d3.interpolate(this._current, d);
        this._current = i(0);
        return t => arc(i(t));
      });

    sliceSel.exit()
      .transition().duration(400)
      .attrTween('d', function(d){
        const end = {startAngle: d.endAngle, endAngle: d.endAngle};
        const i = d3.interpolate(d, end);
        return t => arc(i(t));
      })
      .remove();

    // ---------- LABEL GROUPS (rect + text + leader line + triangle) ----------
    const labelSel = labelsG.selectAll('g.slice-label')
      .data(pieData, d => d.data.media_type);

    const labelEnter = labelSel.enter()
      .append('g')
      .attr('class', 'slice-label')
      .style('pointer-events', 'none') // avoid hover flicker
      .attr('opacity', 0);

    // Leader line (behind badge)
    labelEnter.append('line')
      .attr('class', 'callout-line')
      .attr('stroke-width', 1.2)
      .attr('opacity', 0.9);

    // Pointer triangle
    labelEnter.append('path')
      .attr('class', 'callout-tri');

    // Badge background
    labelEnter.append('rect')
      .attr('class', 'badge')
      .attr('rx', 6)
      .attr('ry', 6);

    // Text
    labelEnter.append('text')
      .attr('fill', '#fff')
      .attr('font-weight', 600)
      .attr('dy', '0.32em');

    const labelsMerged = labelEnter.merge(labelSel);

    // Ensure labels draw above slices
    labelsG.raise();

    // Position, color, and size everything
    labelsMerged.each(function(d){
      const grp = d3.select(this);
      const col = colors(d.data.media_type);
      const darker = d3.color(col) ? d3.color(col).darker(0.5) : '#999';

      // set static styles per datum
      grp.select('line.callout-line').attr('stroke', darker);
      grp.select('path.callout-tri')
        .attr('fill', 'rgba(17,24,39,0.9)')
        .attr('stroke', darker)
        .attr('stroke-width', 1)
        .attr('opacity', 0.95);
      grp.select('rect.badge')
        .attr('fill', 'rgba(17,24,39,0.9)')
        .attr('stroke', col)
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', 1);
      grp.select('text')
        .text(`${d.data.media_type} · ${d.data.percent}%`);

      // place at outside centroid
      const pLabel = arcLabel.centroid(d);
      const pSlice = arc.centroid(d);
      grp.attr('transform', `translate(${pLabel[0]},${pLabel[1]})`);

      // size the badge to its text
      const bb = grp.select('text').node().getBBox();
      grp.select('rect.badge')
        .attr('x', bb.x - padX)
        .attr('y', bb.y - padY)
        .attr('width', bb.width + 2*padX)
        .attr('height', bb.height + 2*padY);

      // vector math (group-local coords)
      const sx = pSlice[0] - pLabel[0];
      const sy = pSlice[1] - pLabel[1];
      const len = Math.hypot(sx, sy) || 1;
      const ux = sx / len, uy = sy / len;   // unit vector label->slice
      const px = -uy, py = ux;              // perpendicular

      // leader line: from near slice toward label, ending before badge center
      const x1 = sx * (len - lineShorten) / len;
      const y1 = sy * (len - lineShorten) / len;
      grp.select('line.callout-line')
        .attr('x1', x1).attr('y1', y1)
        .attr('x2', 0).attr('y2', 0);

      // pointer triangle at badge edge pointing toward slice
      const tipX = -ux * triLen, tipY = -uy * triLen;
      const b1x = px * triHalf, b1y = py * triHalf;
      const b2x = -px * triHalf, b2y = -py * triHalf;
      grp.select('path.callout-tri')
        .attr('d', `M ${b1x},${b1y} L ${b2x},${b2y} L ${tipX},${tipY} Z`);
    });

    labelSel.exit().remove();

    // ---------- HOVER (independent per category) ----------
    slicesG.selectAll('path.slice')
      .on('pointerenter', function(e, d){
        // highlight hovered slice
        d3.select(this)
          .interrupt().transition().duration(120)
          .style('opacity', 1)
          .attr('stroke', d3.color(colors(d.data.media_type)).darker(0.8));

        // dim others
        slicesG.selectAll('path.slice')
          .filter(s => s.data.media_type !== d.data.media_type)
          .interrupt().transition().duration(120)
          .style('opacity', 0.35)
          .attr('stroke', 'transparent');

        // show only this label & nudge slightly outward
        const k = 1.04;
        labelsG.selectAll('g.slice-label')
          .interrupt().transition().duration(120)
          .attr('opacity', s => s.data.media_type === d.data.media_type ? 1 : 0)
          .attr('transform', s => {
            const p = arcLabel.centroid(s);
            return s.data.media_type === d.data.media_type
              ? `translate(${p[0]*k},${p[1]*k})`
              : `translate(${p[0]},${p[1]})`;
          });
      })
      .on('pointerleave', function(){
        // reset slices
        slicesG.selectAll('path.slice')
          .interrupt().transition().duration(160)
          .style('opacity', 0.9)
          .attr('stroke', 'transparent');

        // hide labels & reset positions
        labelsG.selectAll('g.slice-label')
          .interrupt().transition().duration(160)
          .attr('opacity', 0)
          .attr('transform', s => {
            const p = arcLabel.centroid(s);
            return `translate(${p[0]},${p[1]})`;
          });
      });
  }

  onResize(stackedEl, render);
  render();


 // Horizontal BAR chart with hover badge/leader line/triangle
// Expects: social_platforms_main_rows = [{ platform: 'X/Twitter', percent: 24, n: 312 }, ...]
function initBarPlot(containerId = 'dot-plot'){
  const el = document.getElementById(containerId);
  const svg = d3.select(el).append('svg');
  const g = svg.append('g');

  const barsG   = g.append('g').attr('class','bars');
  const axesG   = g.append('g').attr('class','axes');
  const labelsG = g.append('g').attr('class','labels'); // hover badges above bars

  const margin = { top: 16, right: 24, bottom: 24, left: 110 };

  // Colors per platform (customize palette as needed)
  const colors = d3.scaleOrdinal()
    .domain(social_platforms_main_rows.map(d => d.platform))
    .range(tableau10);

  // Badge geometry
  const padX = 8, padY = 5;
  const triLen = 7, triHalf = 5;
  const lineShorten = 10;

  function render(){
    let width = el.clientWidth, height = el.clientHeight;
    if (!width || !height) { width = 640; height = 360; }
    svg.attr('width', width).attr('height', height);

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    g.attr('transform', `translate(${margin.left},${margin.top})`);

    // scales
    const y = d3.scaleBand()
      .domain(social_platforms_main_rows.map(d => d.platform))
      .range([0, innerH])
      .padding(0.25);

    const x = d3.scaleLinear()
      .domain([0, d3.max(social_platforms_main_rows, d => d.percent)]).nice()
      .range([0, innerW]);

    // ---- BARS ----
    const barSel = barsG.selectAll('g.row')
      .data(social_platforms_main_rows, d => d.platform);

    const barEnter = barSel.enter()
      .append('g')
      .attr('class', 'row')
      .attr('transform', d => `translate(0,${y(d.platform)})`);

    // baseline background (optional subtle track)
    barEnter.append('rect')
      .attr('class','track')
      .attr('x', 0).attr('y', 0)
      .attr('height', y.bandwidth())
      .attr('width', innerW)
      .attr('fill', 'rgba(255,255,255,0.06)');

    // value bar
    barEnter.append('rect')
      .attr('class','bar')
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', y.bandwidth())
      .attr('width', 0) // animate from 0
      .attr('fill', d => colors(d.platform))
      .style('opacity', 0.9)
      .attr('rx', 6);

    // merge + updates
    const barAll = barEnter.merge(barSel);
    barAll.transition().duration(600)
      .attr('transform', d => `translate(0,${y(d.platform)})`);

    barAll.select('rect.track')
      .attr('width', innerW)
      .attr('height', y.bandwidth());

    barAll.select('rect.bar')
      .transition().duration(900).ease(d3.easeCubicInOut)
      .attr('width', d => x(d.percent))
      .attr('height', y.bandwidth());

    barSel.exit().remove();

    // ---- AXES ----
    // y axis (platform names)
    const yAxis = d3.axisLeft(y).tickSize(0);
    const xAxis = d3.axisBottom(x).ticks(Math.min(8, innerW / 80)).tickFormat(d => d + '%');

    axesG.selectAll('g.y').data([null]).join('g').attr('class','y')
      .attr('transform', `translate(-8,0)`)
      .call(yAxis)
      .call(g => g.selectAll('text').attr('dy','0.32em').attr('font-size', 12))
      .call(g => g.selectAll('path, line').remove());

    axesG.selectAll('g.x').data([null]).join('g').attr('class','x')
      .attr('transform', `translate(0,${innerH})`)
      .call(xAxis)
      .call(g => g.selectAll('path').attr('stroke','rgba(255,255,255,0.2)'));

    // ---- HOVER LABELS (badge + leader + triangle), one per row ----
    const labelSel = labelsG.selectAll('g.row-label')
      .data(social_platforms_main_rows, d => d.platform);

    const labelEnter = labelSel.enter()
      .append('g')
      .attr('class', 'row-label')
      .style('pointer-events', 'none')
      .attr('opacity', 0);

    // leader line
    labelEnter.append('line')
      .attr('class','callout-line')
      .attr('stroke-width', 1.2)
      .attr('opacity', 0.9);

    // pointer triangle
    labelEnter.append('path')
      .attr('class','callout-tri');

    // badge background
    labelEnter.append('rect')
      .attr('class','badge')
      .attr('rx', 6).attr('ry', 6);

    // text
    labelEnter.append('text')
      .attr('fill', '#fff')
      .attr('font-weight', 600)
      .attr('dy', '0.32em');

    const labelsAll = labelEnter.merge(labelSel);
    labelsG.raise();

    // compute and position per-row labels
    labelsAll.each(function(d){
      const grp = d3.select(this);
      const col = colors(d.platform);
      const darker = d3.color(col) ? d3.color(col).darker(0.6) : '#999';

      // visual styles
      grp.select('line.callout-line').attr('stroke', darker);
      grp.select('path.callout-tri')
        .attr('fill', 'rgba(17,24,39,0.9)')
        .attr('stroke', darker).attr('stroke-width', 1).attr('opacity', 0.95);
      grp.select('rect.badge')
        .attr('fill', 'rgba(17,24,39,0.9)')
        .attr('stroke', col).attr('stroke-opacity', 0.6).attr('stroke-width', 1);
      grp.select('text')
        .text(`${d.platform} · ${d.percent}%`);

      // anchor points
      const barX = x(d.percent);
      const barY = y(d.platform);
      const cy = barY + y.bandwidth()/2;

      // place label slightly to the right of the bar end
      const labelX = barX + 14; // tweak spacing
      const labelY = cy;
      grp.attr('transform', `translate(${labelX},${labelY})`);

      // size badge to text
      const bb = grp.select('text').node().getBBox();
      grp.select('rect.badge')
        .attr('x', bb.x - padX)
        .attr('y', bb.y - padY)
        .attr('width', bb.width + 2*padX)
        .attr('height', bb.height + 2*padY);

      // line from bar end to badge center
      const sx = barX - labelX;     // vector from label -> bar end
      const sy = cy    - labelY;
      const len = Math.hypot(sx, sy) || 1;
      const ux = sx/len, uy = sy/len;
      const px = -uy, py = ux;

      const x1 = sx * (len - lineShorten) / len; // stop before label center
      const y1 = sy * (len - lineShorten) / len;

      grp.select('line.callout-line')
        .attr('x1', x1).attr('y1', y1)
        .attr('x2', 0).attr('y2', 0);

      // pointer triangle at badge edge pointing toward bar
      const tipX = -ux * triLen, tipY = -uy * triLen;
      const b1x = px * triHalf, b1y = py * triHalf;
      const b2x = -px * triHalf, b2y = -py * triHalf;
      grp.select('path.callout-tri')
        .attr('d', `M ${b1x},${b1y} L ${b2x},${b2y} L ${tipX},${tipY} Z`);
    });

    labelSel.exit().remove();

    // ---- HOVER INTERACTIONS ----
    barsG.selectAll('g.row')
      .on('pointerenter', function(e, d){
        // brighten this bar
        d3.select(this).select('rect.bar')
          .interrupt().transition().duration(120)
          .style('opacity', 1);

        // dim others
        barsG.selectAll('g.row').filter(r => r.country !== d.country)
          .select('rect.bar')
          .interrupt().transition().duration(120)
          .style('opacity', 0.35);

        // show only this row's label
        labelsG.selectAll('g.row-label')
          .interrupt().transition().duration(120)
          .attr('opacity', r => r.country === d.country ? 1 : 0);
      })
      .on('pointerleave', function(){
        // reset bars
        barsG.selectAll('rect.bar')
          .interrupt().transition().duration(160)
          .style('opacity', 0.92);

        // hide labels
        labelsG.selectAll('g.row-label')
          .interrupt().transition().duration(160)
          .attr('opacity', 0);
      });
  }

  // responsive hook
  if (typeof onResize === 'function') {
    onResize(el, render);
  } else {
    new ResizeObserver(render).observe(el);
  }
  render();
}

// Usage:
initBarPlot('dot-plot');    // reuse your existing container
// initBarPlot('my-bar');      // or another container id


  stepCallbacks.set('media-types', (state)=>{
    if(state==='enter'){
      dotEl.style.opacity = '1';
      const height = stackedEl.clientHeight;
      blocks.transition().duration(900).attr('y', (_,i)=> i%2===0 ? 20 : height-60);
    } else { dotEl.style.opacity = '0.9'; }
  });

  
}

// Circle packing (simple sized bubbles)
function initMethods(){
  const el = document.getElementById('circle-packing');
  const svg = d3.select(el).append('svg');
  const g = svg.append('g');

  // Tunables
  const PADDING = 12;            // pack padding
  const DURATION_IN = 140;       // hover in
  const DURATION_OUT = 160;      // hover out
  const GROW = 1.06;             // circle grow factor on hover
  const BADGE_PAD_X = 8, BADGE_PAD_Y = 5;

  // Helpers
  const bringToFront = (sel) => sel.each(function(){ this.parentNode.appendChild(this); });

  function render(){
    const width  = el.clientWidth  || 600;
    const height = el.clientHeight || 420;
    svg.attr('width', width).attr('height', height);

    const pack = d3.pack().size([width, height]).padding(PADDING);
    const root = d3.hierarchy({children: methods_rows}).sum(d => +d.n || 0);
    const nodes = pack(root).leaves(); // each has {x,y,r,data:{approach,n,percent}}

    // JOIN
    const sel = g.selectAll('g.node').data(nodes, d => d.data.approach);

    // ENTER
    const enter = sel.enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Circle
    const approachColors = d3.scaleOrdinal().domain(nodes.map(d=>d.data.approach)).range(tableau10);
    enter.append('circle')
      .attr('r', d => d.r)
      .attr('fill', d => approachColors(d.data.approach))
      .attr('opacity', 0.85)
      .attr('stroke', 'transparent')
      .attr('stroke-width', 2);

    // Label group (badge + text)
    const labelG = enter.append('g')
      .attr('class', 'label')
      .style('pointer-events', 'none'); // don't steal hover

    // Rounded badge (hidden by default)
    labelG.append('rect')
      .attr('class', 'badge')
      .attr('rx', 8).attr('ry', 8)
      .attr('fill', 'rgba(17,24,39,0.9)') // dark translucent
      .attr('stroke', '#7c3aed')
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', 1)
      .attr('opacity', 0);

    // Text
    labelG.append('text')
      .attr('class', 'label-text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#fff')
      .attr('font-size', 12)
      .attr('font-weight', 500)
      .text(d => d.data.approach.replaceAll('_',' '));

    // Size the badge to its text (once on enter)
    enter.each(function(){
      const grp = d3.select(this);
      const txt = grp.select('text.label-text');
      const bb  = txt.node().getBBox();
      grp.select('rect.badge')
        .attr('x', bb.x - BADGE_PAD_X)
        .attr('y', bb.y - BADGE_PAD_Y)
        .attr('width',  bb.width  + 2*BADGE_PAD_X)
        .attr('height', bb.height + 2*BADGE_PAD_Y);
    });

    // UPDATE (positions/radii on resize/data change)
    const merged = sel.merge(enter)
      .attr('transform', d => `translate(${d.x},${d.y})`);

    merged.select('circle').attr('r', d => d.r);

    // If font metrics might change on resize, re-fit badges
    merged.each(function(){
      const grp = d3.select(this);
      const txt = grp.select('text.label-text');
      const bb  = txt.node().getBBox();
      grp.select('rect.badge')
        .attr('x', bb.x - BADGE_PAD_X)
        .attr('y', bb.y - BADGE_PAD_Y)
        .attr('width',  bb.width  + 2*BADGE_PAD_X)
        .attr('height', bb.height + 2*BADGE_PAD_Y);
    });

    sel.exit().remove();

    // --- Interactions ---
    const tip = ensureTooltip();

    g.selectAll('g.node')
      .on('mousemove', (event, d) => {
        const name = d.data.approach.replaceAll('_',' ');
        const pct  = (d.data.percent != null) ? ` · ${d.data.percent}%` : '';
        showTooltip(tip, `${name}${pct}`, event.clientX, event.clientY);
      })
      .on('pointerenter', function(event, d){
        const node = d3.select(this);
        bringToFront(node);

        // highlight this node
        node.select('circle')
          .interrupt().transition().duration(DURATION_IN)
          .attr('stroke', '#6d28d9')
          .attr('stroke-width', 2)
          .attr('opacity', 1)
          .attr('r', d.r * GROW);

        node.select('rect.badge')
          .interrupt().transition().duration(DURATION_IN)
          .attr('opacity', 1);

        node.select('text.label-text')
          .interrupt().transition().duration(DURATION_IN)
          .attr('font-weight', 700)
          .attr('font-size', 13);

        // dim others
        g.selectAll('g.node').filter(n => n !== d).select('circle')
          .interrupt().transition().duration(DURATION_IN)
          .attr('opacity', 0.35)
          .attr('stroke', 'transparent');

        g.selectAll('g.node').filter(n => n !== d).select('rect.badge')
          .interrupt().transition().duration(DURATION_IN)
          .attr('opacity', 0);

        g.selectAll('g.node').filter(n => n !== d).select('text.label-text')
          .interrupt().transition().duration(DURATION_IN)
          .attr('font-weight', 500)
          .attr('font-size', 12);
      })
      .on('pointerleave', function(){
        hideTooltip();

        // reset all
        g.selectAll('circle')
          .interrupt().transition().duration(DURATION_OUT)
          .attr('opacity', 0.85)
          .attr('stroke', 'transparent')
          .attr('stroke-width', 2)
          .attr('r', d => d.r);

        g.selectAll('rect.badge')
          .interrupt().transition().duration(DURATION_OUT)
          .attr('opacity', 0);

        g.selectAll('text.label-text')
          .interrupt().transition().duration(DURATION_OUT)
          .attr('font-weight', 500)
          .attr('font-size', 12);
      });
  }

  onResize(el, render);
  render();
}

// Treemap of modalities — animated + styled
function initTreemap(){
  const el = document.getElementById('treemap');
  const svg = d3.select(el).append('svg');
  const g = svg.append('g');

  // --- defs: soft shadow and a subtle top gloss gradient for tiles ---
  const defs = svg.append('defs');

  // Drop shadow (soft)
  const shadow = defs.append('filter')
    .attr('id', 'tileShadow')
    .attr('x', '-20%').attr('y', '-20%')
    .attr('width', '140%').attr('height', '140%');
  shadow.append('feDropShadow')
    .attr('dx', 0).attr('dy', 2)
    .attr('stdDeviation', 4)
    .attr('flood-color', '#000').attr('flood-opacity', 0.25);

  const gloss = defs.append('linearGradient')
    .attr('id', 'tileGloss')
    .attr('x1', '0').attr('y1', '0')
    .attr('x2', '0').attr('y2', '1');
  gloss.append('stop').attr('offset', '0%').attr('stop-color', 'rgba(255,255,255,0.25)');
  gloss.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(255,255,255,0)');

  const margin = { top: 0, right: 0, bottom: 0, left: 0 };

  // Remember previous layout to tween nicely on resize/data updates
  const prev = new Map(); // key => {x0,y0,x1,y1}

  const color = d3.scaleOrdinal()
    .domain(modality_rows_leaf.map(d => d.modality))
    .range(['#38bdf8','#f472b6','#22c55e','#f59e0b','#a78bfa','#ef4444','#9ca3af']);

  function render(){
    const width  = el.clientWidth  || 640;
    const height = el.clientHeight || 380;
    svg.attr('width', width).attr('height', height);
    g.attr('transform', `translate(${margin.left},${margin.top})`);

    // layout
    const root = d3.hierarchy({ children: modality_rows_leaf })
      .sum(d => +d.n || 0)
      .sort((a,b) => b.value - a.value);

    d3.treemap().size([width - margin.left - margin.right, height - margin.top - margin.bottom]).padding(6)(root);

    const leaves = root.leaves();

    // JOIN
    const sel = g.selectAll('g.node')
      .data(leaves, d => d.data.modality);

    // ENTER
    const enter = sel.enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => {
        const k = d.data.modality;
        const p = prev.get(k) || { x0: (width/2 - 1), y0: (height/2 - 1), x1: (width/2 + 1), y1: (height/2 + 1) };
        return `translate(${p.x0},${p.y0})`;
      });

    // Inner group we can scale on hover without shifting the tile origin
    const tile = enter.append('g').attr('class','tile');

    // Background rect
    const color = d3.scaleOrdinal().domain(modality_rows_leaf.map(d => d.modality)).range(tableau10);
    tile.append('rect')
      .attr('class','bg')
      .attr('rx', 10)
      .attr('width', d => Math.max(1, (prev.get(d.data.modality)?.x1 ?? (width/2 + 1)) - (prev.get(d.data.modality)?.x0 ?? (width/2 - 1))))
      .attr('height', d => Math.max(1, (prev.get(d.data.modality)?.y1 ?? (height/2 + 1)) - (prev.get(d.data.modality)?.y0 ?? (height/2 - 1))))
      .attr('fill', d => color(d.data.modality))
      .attr('filter', null);

    // Subtle gloss overlay
    tile.append('rect')
      .attr('class','gloss')
      .attr('rx', 10)
      .attr('width', d => Math.max(1, (prev.get(d.data.modality)?.x1 ?? (width/2 + 1)) - (prev.get(d.data.modality)?.x0 ?? (width/2 - 1))))
      .attr('height', d => Math.max(1, (prev.get(d.data.modality)?.y1 ?? (height/2 + 1)) - (prev.get(d.data.modality)?.y0 ?? (height/2 - 1))))
      .attr('fill', 'url(#tileGloss)')
      .attr('pointer-events', 'none')
      .attr('opacity', 0.35);

    // Static corner label (always visible, unclipped)
    tile.append('text')
      .attr('class', 'label')
      .attr('x', 10).attr('y', 18)
      .attr('fill', 'white')
      .attr('font-size', 12)
      .attr('font-weight', 600)
      .text(d => d.data.modality);

    // Hover badge (appears on hover)
    const badge = tile.append('g')
      .attr('class', 'badge')
      .attr('opacity', 0)
      .style('pointer-events', 'none');

    badge.append('rect')
      .attr('rx', 8).attr('ry', 8)
      .attr('fill', 'rgba(17,24,39,0.92)')
      .attr('stroke', d => color(d.data.modality))
      .attr('stroke-opacity', 0.7)
      .attr('stroke-width', 1);

    badge.append('text')
      .attr('fill', '#fff')
      .attr('font-size', 12)
      .attr('font-weight', 700)
      .attr('x', 0).attr('y', 0)
      .attr('dy', '0.35em')
      .text(d => `${d.data.modality} · ${d.data.percent}%`);

    // Size the badge to its text
    enter.each(function(d){
      const b = d3.select(this).select('g.badge');
      const t = b.select('text');
      const padX = 8, padY = 5;
      // position near top-left, below the static corner label
      b.attr('transform', `translate(10, 34)`);
      const bb = t.node().getBBox();
      b.select('rect')
        .attr('x', bb.x - padX)
        .attr('y', bb.y - BADGE_PAD_Y)
        .attr('width', bb.width + 2*padX)
        .attr('height', bb.height + 2*padY);
    });

    // UPDATE + ENTER (animate tiles to their new positions/sizes)
    const merged = enter.merge(sel);

    merged.transition().duration(800).ease(d3.easeCubicInOut)
      .attr('transform', d => `translate(${d.x0},${d.y0})`)
      .on('end', function(d){
        // store final position for future tweens
        prev.set(d.data.modality, { x0: d.x0, y0: d.y0, x1: d.x1, y1: d.y1 });
      });

    merged.select('rect.bg').transition().duration(800).ease(d3.easeCubicInOut)
      .attr('width',  d => Math.max(1, d.x1 - d.x0))
      .attr('height', d => Math.max(1, d.y1 - d.y0));

    merged.select('rect.gloss').transition().duration(800).ease(d3.easeCubicInOut)
      .attr('width',  d => Math.max(1, d.x1 - d.x0))
      .attr('height', d => Math.max(1, d.y1 - d.y0));

    // Ensure label stays readable (if tile too small, fade the static label out)
    merged.select('text.label').transition().duration(300)
      .attr('opacity', d => (d.x1 - d.x0 > 70 && d.y1 - d.y0 > 32) ? 1 : 0);

    // EXIT (shrink to center and remove)
    sel.exit()
      .transition().duration(500).ease(d3.easeCubicInOut)
      .attr('transform', d => `translate(${width/2},${height/2})`)
      .remove();

    // --- Interactions ---
    const tip = ensureTooltip();

    merged
      .on('mousemove', (event, d) => {
        showTooltip(tip, `${d.data.modality} — ${d.data.percent}%`, event.clientX, event.clientY);
      })
      .on('mouseleave', () => hideTooltip())
      .on('pointerenter', function(event, d){
        const node = d3.select(this);
        // lift effect: shadow + slight scale via inner .tile
        node.select('rect.bg')
          .interrupt().transition().duration(140)
          .attr('filter', 'url(#tileShadow)');

        node.select('.tile')
          .interrupt().transition().duration(140)
          .attr('transform', 'scale(1.02)');

        // show hover badge
        node.select('g.badge')
          .interrupt().transition().duration(140)
          .attr('opacity', 1);

        // dim others slightly
        g.selectAll('g.node').filter(n => n !== d)
          .select('rect.bg')
          .interrupt().transition().duration(140)
          .attr('filter', null)
          .attr('opacity', 0.6);

      })
      .on('pointerleave', function(){
        // reset styles
        g.selectAll('rect.bg')
          .interrupt().transition().duration(160)
          .attr('filter', null)
          .attr('opacity', 1);

        g.selectAll('.tile')
          .interrupt().transition().duration(160)
          .attr('transform', 'scale(1)');

        g.selectAll('g.badge')
          .interrupt().transition().duration(160)
          .attr('opacity', 0);
      });
  }

  // Initial render + responsive reflow
  if (typeof onResize === 'function') {
    onResize(el, render);
  } else {
    new ResizeObserver(render).observe(el);
  }
  render();

  // Keep your before/after toggle
  const ba = document.getElementById('before-after');
  stepCallbacks.set('modalities', (state)=>{
    if (state === 'enter') ba.classList.add('active'); else ba.classList.remove('active');
  });
}


// =====================
// Choropleth by country
// =====================
//
// Usage:
//   // 1) Ensure D3 and topojson-client are loaded in your page.
//   // 2) Have your country_rows available (as given in your message).
//   // 3a) If you already loaded a world topojson (as `worldTopo`), do:
//       initCountryChoropleth('world-map', { worldTopo, metric: 'percent' });
//   // 3b) Or let it fetch automatically:
//       initCountryChoropleth('world-map', { metric: 'percent' });
//
// HTML container example:
//   <div id="world-map" style="width:100%;height:520px"></div>

function initCountryChoropleth(
  containerId = 'world-map',
  {
    worldTopo = null,                 // TopoJSON (e.g., world-atlas countries-110m.json)
    metric = 'percent',               // 'percent' or 'n'
    colorScheme = d3.interpolateBlues // d3 continuous interpolator
  } = {}
){
  const el = document.getElementById(containerId);
  if (!el) {
    console.error(`Container #${containerId} not found for country choropleth chart.`);
    return;
  }
  if (typeof country_rows === 'undefined' || !Array.isArray(country_rows) || country_rows.length === 0) {
    console.error('country_rows data missing or empty for country choropleth chart.');
    return;
  }
  const svg = d3.select(el).append('svg');
  const g = svg.append('g');
  const mapG = g.append('g').attr('class','map');
  const labelsG = g.append('g').attr('class','labels');
  const legendG = g.append('g').attr('class','legend');

  const margin = { top: 12, right: 12, bottom: 12, left: 12 };

  // --- Data prep ---
  const dataByName = new Map(country_rows.map(d => [d.country, d]));

  // Map TopoJSON country names -> your dataset names
  const RENAMES = new Map([
    ['United States of America', 'United States'],
    ['United Republic of Tanzania', 'Tanzania'],
    ['Democratic Republic of the Congo', 'Congo (Kinshasa)'],
    ['Republic of the Congo', 'Congo (Brazzaville)'],
    ['Czechia', 'Czech Republic'],
    ['Russian Federation', 'Russia'],
    ['Korea, Republic of', 'South Korea'],
    ['Korea, Democratic People\'s Republic of', 'North Korea'],
    ['Viet Nam', 'Vietnam'],
    ['Syrian Arab Republic', 'Syria'],
    ['Lao People\'s Democratic Republic', 'Laos'],
    ['Eswatini', 'Swaziland'],
    ['Côte d’Ivoire', "Cote d'Ivoire"],
    ['Côte d\'Ivoire', "Cote d'Ivoire"],
    ['Bolivia (Plurinational State of)', 'Bolivia'],
    ['Iran (Islamic Republic of)', 'Iran'],
    ['Venezuela (Bolivarian Republic of)', 'Venezuela'],
    ['United Kingdom', 'United Kingdom'],
    ['Hong Kong', 'Hong Kong'],
    ['Palestine', 'Palestine'],
    ['Taiwan', 'Taiwan'],
    ['North Macedonia', 'North Macedonia'],
    ['Cabo Verde', 'Cape Verde'],
    ['Myanmar', 'Myanmar'],
    ['The Bahamas', 'Bahamas']
  ]);

  const metricAccessor = d => (d && typeof d[metric] === 'number') ? d[metric] : null;

  // Build color after we know the max
  const allVals = country_rows.map(metricAccessor).filter(v => v != null);
  const vMax = allVals.length ? d3.max(allVals) : 1;
  const color = d3.scaleSequential().domain([0, vMax]).interpolator(colorScheme);

  // Hover badge geometry
  const padX = 8, padY = 5, triLen = 7, triHalf = 5, lineShorten = 10;

  // Projection & path (IMPORTANT: this is the correct API)
  const projection = d3.geoNaturalEarth1();
  let path = d3.geoPath().projection(projection);

  // Zoom/pan
  const zoom = d3.zoom().scaleExtent([1, 8]).on('zoom', (event) => {
    mapG.attr('transform', event.transform);
    labelsG.attr('transform', event.transform);
  });
  svg.call(zoom);

  // Boot (load topo if needed)
  (async function boot(){
    if (!worldTopo) {
      const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      worldTopo = await res.json();
    }
    draw();

    // Responsive
    if (typeof onResize === 'function') onResize(el, draw);
    else new ResizeObserver(draw).observe(el);
  })();

  function draw(){
    const width = el.clientWidth || 800;
    const height = el.clientHeight || 520;
    svg.attr('width', width).attr('height', height);
    g.attr('transform', `translate(${margin.left},${margin.top})`);

    // Fit projection to viewport
    projection.fitExtent(
      [[margin.left, margin.top],[width - margin.right, height - margin.bottom]],
      { type: 'Sphere' }
    );
    path = d3.geoPath().projection(projection);

    // Build features
    const countries = topojson.feature(worldTopo, worldTopo.objects.countries).features;

    // JOIN
    const countrySel = mapG.selectAll('path.country')
      .data(countries, d => d.id || (d.properties && (d.properties.name || d.properties.NAME || d.properties.admin)));

    const enter = countrySel.enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', d => path(d))
      .attr('fill', d => {
        const datum = lookupDatum(d);
        const val = metricAccessor(datum);
        return val != null ? color(val) : 'rgba(255,255,255,0.08)';
      })
      .attr('stroke', 'rgba(0,0,0,0.15)')
      .attr('stroke-width', 0.6)
      .attr('opacity', 0);

    // Fade-in / update
    enter.transition().duration(600).attr('opacity', 1);

    countrySel
      .transition().duration(600)
      .attr('d', path)
      .attr('fill', d => {
        const datum = lookupDatum(d);
        const val = metricAccessor(datum);
        return val != null ? color(val) : 'rgba(255,255,255,0.08)';
      });

    countrySel.exit().remove();

    // Legend
    drawLegend(legendG, {
      width, height, color,
      title: metric === 'percent' ? 'Percent' : 'Count',
      fmt: metric === 'percent' ? d => d.toFixed(0) + '%' : d3.format('~s')
    });

    // Hover badge (single, reused)
    labelsG.raise();
    mapG.selectAll('path.country')
      .on('pointerenter', function(event, d){
        const name = topoName(d);
        const datum = lookupDatum(d);
        const val = metricAccessor(datum);

        d3.select(this)
          .interrupt().transition().duration(120)
          .attr('stroke', 'rgba(0,0,0,0.55)')
          .attr('stroke-width', 1);

        mapG.selectAll('path.country').filter(c => c !== d)
          .interrupt().transition().duration(120)
          .attr('opacity', 0.65);

        // Build badge near centroid
        labelsG.selectAll('g.label').remove();
        const [cx, cy] = path.centroid(d);
        const grp = labelsG.append('g')
          .attr('class','label')
          .attr('transform', `translate(${cx + 16},${cy - 12})`)
          .attr('opacity', 0)
          .style('pointer-events','none');

        const fillCol = val != null ? color(val) : '#9ca3af';
        const strokeDark = d3.color(fillCol) ? d3.color(fillCol).darker(0.7) : '#666';

        grp.append('line')
          .attr('class','callout-line')
          .attr('stroke', strokeDark)
          .attr('stroke-width', 1.2)
          .attr('opacity', 0.95);

        grp.append('path')
          .attr('class','callout-tri')
          .attr('fill', 'rgba(17,24,39,0.92)')
          .attr('stroke', strokeDark).attr('stroke-width', 1).attr('opacity', 0.95);

        grp.append('rect')
          .attr('class','badge')
          .attr('rx', 6).attr('ry', 6)
          .attr('fill', 'rgba(17,24,39,0.92)')
          .attr('stroke', fillCol).attr('stroke-opacity', 0.7).attr('stroke-width', 1);

        const label = metric === 'percent'
          ? `${name} · ${val != null ? val + '%' : 'no data'}`
          : `${name} · ${val != null ? 'n=' + val : 'no data'}`;

        grp.append('text')
          .attr('fill', '#fff')
          .attr('font-size', 12)
          .attr('font-weight', 700)
          .attr('dy', '0.32em')
          .text(label);

        // Fit badge to text
        const bb = grp.select('text').node().getBBox();
        grp.select('rect.badge')
          .attr('x', bb.x - padX).attr('y', bb.y - padY)
          .attr('width', bb.width + 2*padX).attr('height', bb.height + 2*padY);

        // Leader line (group-local coords) from country centroid to badge center
        const sx = cx - (cx + 16);
        const sy = cy - (cy - 12);
        const len = Math.hypot(sx, sy) || 1;
        const ux = sx/len, uy = sy/len;
        const px = -uy, py = ux;
        const x1 = sx * (len - lineShorten) / len;
        const y1 = sy * (len - lineShorten) / len;

        grp.select('line.callout-line').attr('x1', x1).attr('y1', y1).attr('x2', 0).attr('y2', 0);

        const tipX = -ux * triLen, tipY = -uy * triLen;
        const b1x = px * triHalf, b1y = py * triHalf;
        const b2x = -px * triHalf, b2y = -py * triHalf;
        grp.select('path.callout-tri').attr('d', `M ${b1x},${b1y} L ${b2x},${b2y} L ${tipX},${tipY} Z`);

        grp.transition().duration(120).attr('opacity', 1);
      })
      .on('pointerleave', function(){
        mapG.selectAll('path.country')
          .interrupt().transition().duration(160)
          .attr('opacity', 1)
          .attr('stroke', 'rgba(0,0,0,0.15)')
          .attr('stroke-width', 0.6);

        labelsG.selectAll('g.label')
          .interrupt().transition().duration(160)
          .attr('opacity', 0).remove();
      });
  }

  // --- helpers ---
  function topoName(feature){
    return feature.properties?.name || feature.properties?.NAME || feature.properties?.admin || 'Unknown';
  }
  function normalizeName(n){
    if (RENAMES.has(n)) return RENAMES.get(n);
    return n.replace(/\u2019/g,"'"); // curly apostrophe → ASCII
  }
  function lookupDatum(feature){
    const name = normalizeName(topoName(feature));
    return dataByName.get(name) || null;
  }

  // Simple gradient legend
  function drawLegend(container, { width, height, color, title = '', fmt = d3.format('~s') }){
  const w = Math.min(220, Math.max(160, width * 0.25));
  const h = 44;
  const x = (width - w) / 2;
  const y = height - h - 12;

  container.attr('transform', `translate(${x},${y})`);
    container.selectAll('*').remove();

    const defs = container.append('defs');
    const id = 'legend-grad-' + Math.random().toString(36).slice(2);
    const grad = defs.append('linearGradient').attr('id', id).attr('x1','0').attr('x2','1').attr('y1','0').attr('y2','0');

    d3.range(0, 1.0001, 0.1).forEach(t => {
      grad.append('stop')
        .attr('offset', (t*100)+'%')
        .attr('stop-color', color(color.domain()[0] + t*(color.domain()[1]-color.domain()[0])));
    });

    container.append('rect').attr('x', 0).attr('y', 0).attr('width', w).attr('height', 10)
      .attr('fill', `url(#${id})`).attr('rx', 4);

    const scale = d3.scaleLinear().domain(color.domain()).range([0, w]);
    const axis = d3.axisBottom(scale).ticks(4).tickSize(0).tickFormat(fmt);

    container.append('g')
      .attr('transform', `translate(0,12)`)
      .call(axis)
      .call(g => g.selectAll('text').attr('font-size', 10))
      .call(g => g.selectAll('path,line').remove());

    container.append('text')
      .attr('x', 0).attr('y', -6)
      .attr('fill', 'currentColor')
      .attr('font-size', 11)
      .attr('font-weight', 600)
      .text(title);
  }
}

// Bubble cartogram (size by n)
/* function initCountries(){
  const el = document.getElementById('cartogram');
  const svg = d3.select(el).append('svg');
  const g = svg.append('g');
  function render(){
    const width = el.clientWidth; const height = el.clientHeight;
    svg.attr('width', width).attr('height', height);
    const simulation = d3.forceSimulation(country_rows.map(d=>Object.assign({}, d)))
      .force('charge', d3.forceManyBody().strength(2))
      .force('center', d3.forceCenter(width/2, height/2))
      .force('collision', d3.forceCollide().radius(d=>Math.sqrt(d.n)*4 + 2))
      .stop();
    for(let i=0;i<180;i++) simulation.tick();
    const sel = g.selectAll('g.country').data(simulation.nodes(), d=>d.country).join(enter => {
      const c = enter.append('g').attr('class','country').attr('transform', d=>`translate(${d.x},${d.y})`);
  const countryColors = d3.scaleOrdinal().domain(simulation.nodes().map(d=>d.country)).range(tableau10);
  c.append('circle').attr('r', d=>Math.sqrt(d.n)*4).attr('fill', d=>countryColors(d.country)).attr('opacity', .85);
      c.append('title').text(d=>`${d.country}: ${d.percent}%`);
      return c;
    });
    const tip = ensureTooltip();
    sel.on('mousemove', (event, d) => { showTooltip(tip, `${d.country} — ${d.percent}%`, event.clientX, event.clientY); })
       .on('mouseleave', ()=> hideTooltip());
  }
  onResize(el, render); render();
}*/

// Container: <div id="country-bars" style="width:100%;height:420px"></div>
function initCountryBars(containerId = 'country-bars'){
  const el = document.getElementById(containerId);
  if (!el) {
    console.error(`Container #${containerId} not found for country bars chart.`);
    return;
  }
  if (typeof country_rows === 'undefined' || !Array.isArray(country_rows) || country_rows.length === 0) {
    console.error('country_rows data missing or empty for country bars chart.');
    return;
  }
  const svg = d3.select(el).append('svg');
  const g = svg.append('g');

  const barsG   = g.append('g').attr('class','bars');
  const axesG   = g.append('g').attr('class','axes');
  const labelsG = g.append('g').attr('class','labels');

  const margin = { top: 16, right: 24, bottom: 28, left: 140 };

  // Color by rank (top countries get stronger hue)
  const sorted = country_rows.slice().sort((a,b)=>d3.descending(a.n, b.n));
  const rank = new Map(sorted.map((d,i)=>[d.country, i]));
  const colors = d3.scaleSequential()
    .domain([sorted.length-1, 0])                     // invert so rank 0 is strongest
    .interpolator(t => d3.interpolateTurbo(0.15 + 0.65*t));

  // Hover badge geometry
  const padX = 8, padY = 5, triLen = 7, triHalf = 5, lineShorten = 10;

  function render(){
    let width = el.clientWidth, height = el.clientHeight;
    if (!width || !height) { width = 800; height = 420; }
    svg.attr('width', width).attr('height', height);

    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;
    g.attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const y = d3.scaleBand()
      .domain(sorted.map(d => d.country))
      .range([0, innerH])
      .padding(0.2);

    const xMax = d3.max(sorted, d => d.n) || 1;
    const x = d3.scaleLinear().domain([0, xMax]).nice().range([0, innerW]);

    // BARS
    const rowSel = barsG.selectAll('g.row').data(sorted, d => d.country);
    const rowEnter = rowSel.enter().append('g')
      .attr('class','row')
      .attr('transform', d => `translate(0,${y(d.country)})`);

    rowEnter.append('rect') // track
      .attr('class','track')
      .attr('x',0).attr('y',0)
      .attr('height', y.bandwidth())
      .attr('width', innerW)
      .attr('fill', 'rgba(255,255,255,0.06)');

    rowEnter.append('rect') // value bar
      .attr('class','bar')
      .attr('x',0).attr('y',0)
      .attr('height', y.bandwidth())
      .attr('width', 0)
      .attr('fill', d => colors(rank.get(d.country)))
      .style('opacity', 0.92)
      .attr('rx', 6);

    const rowAll = rowEnter.merge(rowSel);
    rowAll.transition().duration(600)
      .attr('transform', d => `translate(0,${y(d.country)})`);
    rowAll.select('rect.track')
      .attr('width', innerW)
      .attr('height', y.bandwidth());
    rowAll.select('rect.bar')
      .transition().duration(900).ease(d3.easeCubicInOut)
      .attr('width', d => x(d.n))
      .attr('height', y.bandwidth());

    rowSel.exit().remove();

    // AXES
    axesG.selectAll('g.y').data([null]).join('g').attr('class','y')
      .attr('transform', `translate(-10,0)`)
      .call(d3.axisLeft(y).tickSize(0))
      .call(g => g.selectAll('text').attr('font-size', 12).attr('dy','0.32em'))
      .call(g => g.selectAll('path,line').remove());

    axesG.selectAll('g.x').data([null]).join('g').attr('class','x')
      .attr('transform', `translate(0,${innerH})`)
      .call(d3.axisBottom(x).ticks(Math.min(8, innerW/80)))
      .call(g => g.selectAll('.tick text').attr('font-size', 11))
      .call(g => g.selectAll('path').attr('stroke','rgba(255,255,255,0.2)'));

    // HOVER BADGES (one per row)
    const labelSel = labelsG.selectAll('g.row-label').data(sorted, d => d.country);
    const labelEnter = labelSel.enter().append('g')
      .attr('class','row-label')
      .style('pointer-events','none')
      .attr('opacity', 0);

    labelEnter.append('line').attr('class','callout-line').attr('stroke-width',1.2).attr('opacity',0.9);
    labelEnter.append('path').attr('class','callout-tri');
    labelEnter.append('rect').attr('class','badge').attr('rx',6).attr('ry',6);
    labelEnter.append('text').attr('fill','#fff').attr('font-weight',700).attr('dy','0.32em');

    const labelsAll = labelEnter.merge(labelSel);
    labelsG.raise();

    labelsAll.each(function(d){
      const grp = d3.select(this);
      const col = colors(rank.get(d.country));
      const darker = d3.color(col) ? d3.color(col).darker(0.6) : '#999';

      grp.select('line.callout-line').attr('stroke', darker);
      grp.select('path.callout-tri')
        .attr('fill', 'rgba(17,24,39,0.9)')
        .attr('stroke', darker).attr('stroke-width', 1).attr('opacity', 0.95);
      grp.select('rect.badge')
        .attr('fill', 'rgba(17,24,39,0.9)')
        .attr('stroke', col).attr('stroke-opacity', 0.7).attr('stroke-width', 1);
      grp.select('text')
        .text(`${d.country} · n=${d.n} · ${d.percent}%`);

      const cy = y(d.country) + y.bandwidth()/2;
      const barX = x(d.n);

      // Position badge just right of the bar end (or clamp near right edge)
      const rightLimit = innerW - 8;
      const labelX = Math.min(barX + 14, rightLimit);
      const labelY = cy;
      grp.attr('transform', `translate(${labelX},${labelY})`);

      // Fit badge to text
      const bb = grp.select('text').node().getBBox();
      grp.select('rect.badge')
        .attr('x', bb.x - padX).attr('y', bb.y - padY)
        .attr('width', bb.width + 2*padX).attr('height', bb.height + 2*padY);

      // Leader line from bar end → badge center (in group-local coords)
      const sx = barX - labelX, sy = cy - labelY;
      const len = Math.hypot(sx, sy) || 1;
      const ux = sx/len, uy = sy/len;
      const px = -uy, py = ux;
      const x1 = sx * (len - lineShorten) / len;
      const y1 = sy * (len - lineShorten) / len;

      grp.select('line.callout-line').attr('x1', x1).attr('y1', y1).attr('x2', 0).attr('y2', 0);

      const tipX = -ux * triLen, tipY = -uy * triLen;
      const b1x = px * triHalf, b1y = py * triHalf;
      const b2x = -px * triHalf, b2y = -py * triHalf;
      grp.select('path.callout-tri')
        .attr('d', `M ${b1x},${b1y} L ${b2x},${b2y} L ${tipX},${tipY} Z`);
    });

    labelSel.exit().remove();

    // Interactions
    barsG.selectAll('g.row')
      .on('pointerenter', function(e, d){
        d3.select(this).select('rect.bar')
          .interrupt().transition().duration(120)
          .style('opacity', 1);

        barsG.selectAll('g.row').filter(r => r.country !== d.country)
          .select('rect.bar')
          .interrupt().transition().duration(120)
          .style('opacity', 0.35);

        labelsG.selectAll('g.row-label')
          .interrupt().transition().duration(120)
          .attr('opacity', r => r.country === d.country ? 1 : 0);
      })
      .on('pointerleave', function(){
        barsG.selectAll('rect.bar')
          .interrupt().transition().duration(160)
          .style('opacity', 0.92);

        labelsG.selectAll('g.row-label')
          .interrupt().transition().duration(160)
          .attr('opacity', 0);
      });
  }

  // Responsive
  if (typeof onResize === 'function') {
    onResize(el, render);
  } else {
    new ResizeObserver(render).observe(el);
  }
  render();
}

// --- Scroll-activated plot initialization ---
const plotSections = [
  { id: 'pubs', init: initPubs },
  { id: 'media-types', init: initMedia },
  { id: 'methods', init: initMethods },
  { id: 'modalities', init: initTreemap },
  { id: 'countries', init: () => { initCountryBars(); initCountryChoropleth('world-map', { metric: 'percent' }); } },
  // Add more if needed
];

const activated = new Set();
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !activated.has(entry.target.id)) {
      const plot = plotSections.find(p => p.id === entry.target.id);
      if (plot && typeof plot.init === 'function') {
        plot.init();
        activated.add(entry.target.id);
      }
    }
  });
}, { threshold: 0.3 });

plotSections.forEach(p => {
  const el = document.getElementById(p.id);
  if (el) observer.observe(el);
});

// Remove direct calls from DOMContentLoaded for scroll-activated plots
window.addEventListener('DOMContentLoaded', () => {
  initHero();
  // initPubs();
  // initMedia();
  // initMethods();
  // initTreemap();
  // initCountryBars();
  // initCountryChoropleth('world-map', { metric: 'percent' });
  initChallenges();
  initFinal();
  initPieChart();
});

// Tooltip helpers
function ensureTooltip(){
  let tip = document.querySelector('.tooltip');
  if(!tip){ tip = document.createElement('div'); tip.className='tooltip'; document.body.appendChild(tip); }
  return tip;
}
function showTooltip(tip, html, x, y){ tip.innerHTML = html; tip.style.left = x+'px'; tip.style.top = y+'px'; tip.classList.add('show'); }
function hideTooltip(){ const tip = document.querySelector('.tooltip'); if(tip) tip.classList.remove('show'); }

document.addEventListener('DOMContentLoaded', function() {
  const captions = document.querySelectorAll('.hero-captions p');
  const texts = document.querySelectorAll('.hero-caption-texts p');
  captions.forEach(caption => {
    caption.addEventListener('click', () => {
      texts.forEach(p => p.style.display = 'none');
      const emotion = caption.getAttribute('data-emotion');
      const match = document.querySelector('.hero-caption-texts p[data-emotion="' + emotion + '"]');
      if (match) match.style.display = 'block';
    });
  });
});


