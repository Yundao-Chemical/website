/* The scene explorer is independent of the product catalog and inquiry state. */
(() => {
  'use strict';
  const root = document.querySelector('#field');
  if (!root) return;
  const find = selector => root.querySelector(selector);
  const all = selector => [...root.querySelectorAll(selector)];
  const scenes = {
    herbicides: {number:'01', count:18, en:'Herbicides', zh:'除草剂', title:['The crop.<br>The wider context.','关注作物。<br>也看见生长环境。'], description:['Explore our herbicide portfolio and discuss your specific purchasing requirements with Samantha.','浏览除草剂产品目录，与 Samantha 沟通具体产品及采购要求。'], altA:['AI illustration of a crop field with weeds','AI 示意：伴有杂草的作物田地'], altB:['AI illustration of a cultivated crop field','AI 示意：作物田地']},
    insecticides: {number:'02', count:22, en:'Insecticides', zh:'杀虫剂', title:['A closer look<br>at the leaf.','走近叶片。<br>关注每一处细节。'], description:['Take a closer look at an illustrative crop scene, then explore the insecticides in our catalog.','通过叶片场景了解这一产品系列，并进入杀虫剂目录查看具体产品。'], altA:['AI illustration of insects on crop leaves','AI 示意：作物叶片上的昆虫'], altB:['AI illustration of green crop leaves','AI 示意：绿色作物叶片']},
    fungicides: {number:'03', count:17, en:'Fungicides', zh:'杀菌剂', title:['Another view<br>of crop care.','换一个视角。<br>关注作物状态。'], description:['Explore this illustrative leaf comparison and browse our fungicide range. Specific suitability is confirmed on inquiry.','查看叶片场景示意，浏览杀菌剂产品系列。具体产品适用性请在询盘时确认。'], altA:['AI illustration of crop leaves with disease symptoms','AI 示意：带有病害症状的作物叶片'], altB:['AI illustration of green crop leaves','AI 示意：绿色作物叶片']},
    nutrition: {number:'04', count:19, en:'Fertilizers', zh:'肥料', title:['From the soil.<br>Into perspective.','从土地出发。<br>看见生长的可能。'], description:['Discover our fertilizer and related product portfolio, then discuss grades, quantities and packaging with Samantha.','浏览肥料及相关产品目录，与 Samantha 确认等级、数量及包装要求。'], altA:['AI illustration of crop rows and soil','AI 示意：土壤与作物行列'], altB:['AI illustration of a green crop field','AI 示意：绿色作物田地']}
  };
  const strings = {
    eyebrow:['THE FIELD, IN FOCUS','走近田间 · 场景视角'], title:['A closer look.<br><em>A different perspective.</em>','走近农业场景。<br><em>看见不同视角。</em>'], intro:['Explore four agricultural scenes.<br>Move the divider to reveal another perspective.','切换四类农业场景。<br>拖动分隔线，探索不同的画面视角。'],
    herbicides:['Herbicides','除草剂'], insecticides:['Insecticides','杀虫剂'], fungicides:['Fungicides','杀菌剂'], nutrition:['Fertilizers','肥料'],
    interactive:['INTERACTIVE SCENES','互动场景'], sceneA:['SCENE A','场景 A'], sceneB:['SCENE B','场景 B'], dragHint:['DRAG TO EXPLORE','拖动滑杆，探索场景'], showA:['Show scene A','查看场景 A'], splitView:['Split view','对比视图'], showB:['Show scene B','查看场景 B'],
    inCatalog:['products in our catalog','项目录产品'], browseFamily:['Browse this family','浏览此类产品'], catalogConnection:['Your selected products stay in the same inquiry list.','已选择的产品将保留在同一份询盘清单中。'],
    note:['AI-generated scenes for illustration only. These are not measured product results or application recommendations.','场景图片由 AI 生成，仅供示意，不代表具体产品的实测效果或使用建议。'],
    loading:['Preparing the scene…','正在准备场景…'], error:['This scene could not be loaded. Retry, or browse the product directory.','场景暂时无法加载，请重试，或直接浏览产品目录。'], retry:['Try again','重新加载']
  };
  const frame = find('#comparison-frame');
  const range = find('#scene-reveal');
  let current = 'herbicides', state = 'idle', generation = 0, pointer = null, initialized = false;
  const languageIndex = () => document.documentElement.lang === 'zh' ? 1 : 0;
  const text = pair => pair[languageIndex()];
  const label = key => text(strings[key]);

  function setSplit(value) {
    const position = Math.max(0, Math.min(100, Math.round(Number(value))));
    range.value = position;
    frame.style.setProperty('--split', position + '%');
    find('.scene-label-a').hidden = position < 12;
    find('.scene-label-b').hidden = position > 88;
    range.setAttribute('aria-valuetext', languageIndex() ? `场景 A ${position}%，场景 B ${100-position}%` : `${position}% scene A, ${100-position}% scene B`);
    find('#scene-split-value').textContent = `${position} / ${100-position}`;
    all('[data-split]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.split) === position)));
  }
  function renderLabels() {
    const scene = scenes[current];
    all('[data-field-copy]').forEach(element => { element.innerHTML = label(element.dataset.fieldCopy); });
    all('[data-scene]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.scene === current)));
    find('.field-tabs').setAttribute('aria-label', languageIndex() ? '场景分类' : 'Illustrative scene categories');
    find('.scene-presets').setAttribute('aria-label', languageIndex() ? '对比视图' : 'Comparison views');
    find('#field-category-label').textContent = `${scene.number} / ${scene[languageIndex() ? 'zh' : 'en']}`;
    find('#field-category-title').innerHTML = text(scene.title);
    find('#field-category-description').textContent = text(scene.description);
    find('#field-product-count').textContent = scene.count;
    find('#scene-browse').dataset.family = current;
    range.setAttribute('aria-label', languageIndex() ? '比较两幅农业场景示意图' : 'Compare the two illustrative scenes');
    frame.setAttribute('aria-label', languageIndex() ? `${scene.zh}：两幅农业场景示意图` : `${scene.en}: two illustrative agricultural scenes`);
    find('#scene-image-a').alt = text(scene.altA);
    find('#scene-image-b').alt = text(scene.altB);
    const status = find('#field-status');
    status.textContent = state === 'error' ? label('error') : state === 'ready' ? (languageIndex() ? `${scene.zh}场景已准备好。` : `${scene.en} scene ready.`) : label('loading');
    setSplit(range.value);
  }
  function loadImage(source) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const timer = setTimeout(() => { image.onload = image.onerror = null; reject(new Error('Image timeout')); }, 20000);
      image.onload = () => { clearTimeout(timer); resolve(image); };
      image.onerror = () => { clearTimeout(timer); reject(new Error('Image unavailable')); };
      image.decoding = 'async';
      image.src = source;
    });
  }
  function updateState(next) {
    state = next;
    const ready = state === 'ready';
    frame.classList.toggle('is-pending', !ready);
    frame.classList.toggle('has-error', state === 'error');
    frame.setAttribute('aria-busy', String(state === 'loading' || state === 'idle'));
    range.disabled = !ready;
    all('[data-split]').forEach(button => { button.disabled = !ready; });
    find('#scene-retry').hidden = state !== 'error';
    renderLabels();
  }
  async function selectScene(key, force = false) {
    if (!scenes[key] || (!force && key === current && (state === 'loading' || state === 'ready'))) return;
    initialized = true;
    current = key;
    const request = ++generation;
    updateState('loading');
    try {
      const images = await Promise.all([loadImage(`assets/scene-${key}.jpg`), loadImage(`assets/scene-${key}-illustrated.jpg`)]);
      // Ignore late image responses after the visitor switches to another family.
      if (request !== generation) return;
      find('#scene-image-a').src = images[0].src;
      find('#scene-image-b').src = images[1].src;
      setSplit(50);
      updateState('ready');
    } catch {
      if (request === generation) updateState('error');
    }
  }
  range.addEventListener('input', () => setSplit(range.value));
  all('[data-scene]').forEach(button => button.addEventListener('click', () => selectScene(button.dataset.scene)));
  all('[data-split]').forEach(button => button.addEventListener('click', () => setSplit(button.dataset.split)));
  find('#scene-retry').addEventListener('click', () => selectScene(current, true));
  const moveDivider = event => {
    const rect = frame.getBoundingClientRect();
    setSplit((event.clientX - rect.left) / rect.width * 100);
  };
  frame.addEventListener('pointerdown', event => {
    if (state !== 'ready' || !event.isPrimary || event.button !== 0 || event.target.closest('button')) return;
    pointer = event.pointerId;
    frame.setPointerCapture(pointer);
    moveDivider(event);
  });
  frame.addEventListener('pointermove', event => { if (pointer === event.pointerId) moveDivider(event); });
  frame.addEventListener('pointerup', event => {
    if (pointer !== event.pointerId) return;
    if (frame.hasPointerCapture(pointer)) frame.releasePointerCapture(pointer);
    pointer = null;
  });
  ['pointercancel', 'lostpointercapture'].forEach(type => frame.addEventListener(type, () => { pointer = null; }));
  new MutationObserver(renderLabels).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  renderLabels();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        if (!initialized) selectScene(current);
      }
    }, {rootMargin:'350px'});
    observer.observe(root);
  } else { selectScene(current); }
})();
