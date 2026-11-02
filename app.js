'use strict';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* The list still works for this visit. */ } }
};
const categories = {
  herbicides: {en:'Herbicides', zh:'除草剂'},
  insecticides: {en:'Insecticides', zh:'杀虫剂'},
  fungicides: {en:'Fungicides', zh:'杀菌剂'},
  nutrition: {en:'Fertilizers', zh:'肥料'}
};
const copy = {
  skip:['Skip to content','跳至正文'],
  topline:['AGRICULTURAL CHEMICALS. GLOBAL CONNECTIONS.','农业化工 · 全球连接'],
  navHome:['Home','首页'], navRange:['Our range','产品系列'], navAbout:['About Yundao','关于耘稻'], navContact:['Contact','联系我们'],
  inquiryList:['Inquiry list','询盘清单'],
  heroEyebrow:['ROOTED IN AGRICULTURE. OPEN TO THE WORLD.','扎根农业，面向世界'],
  heroTitle:['Agriculture.<br>Connected<br><em>globally.</em>','耕耘农业。<br>连接<br><em>全球。</em>'],
  heroDescription:['Agricultural chemicals, thoughtfully connected.<br>Your trading partner in Shanghai for crop protection and nutrition.','除草剂、杀虫剂、杀菌剂及肥料。<br>立足上海，与全球客户连接农业化学品采购需求。'],
  exploreProducts:['Explore our products','浏览产品目录'], talkSamantha:['Talk to Samantha','联系 Samantha'],
  basedShanghai:['BASED IN SHANGHAI · CONNECTING INTERNATIONALLY','立足上海 · 连接全球'],
  heroImageLabel:['NATURE. SCIENCE. POSSIBILITY.','自然 · 科学 · 生长'], heroCaptionSmall:['A SHARED FOCUS','共同关注'],
  heroCaption:['Growing connections.<br>From the ground up.','从脚下的土地，<br>到远方的伙伴。'],
  stripTitle:['OUR FOCUS','主营产品'], stripRange:['Herbicides <i>·</i> Insecticides <i>·</i> Fungicides <i>·</i> Fertilizers','除草剂 <i>·</i> 杀虫剂 <i>·</i> 杀菌剂 <i>·</i> 肥料'],
  downloadCatalog:['Download catalog','下载产品表'], rangeEyebrow:['01 / OUR PRODUCT FAMILIES','01 / 四大产品系列'],
  rangeTitle:['Four ways to<br><em>cultivate possibility.</em>','四大产品系列。<br><em>连接更多可能。</em>'],
  rangeIntro:['A focused agricultural chemical portfolio.<br>Explore a family, find your products, and tell us what you need.','聚焦农业化学品贸易。<br>从产品系列出发，找到所需产品，告诉我们您的采购需求。'],
  herbicides:['Herbicides','除草剂'], insecticides:['Insecticides','杀虫剂'], fungicides:['Fungicides','杀菌剂'], nutrition:['Fertilizers','肥料'],
  herbicidesSub:['Explore our herbicide range','浏览除草剂产品'], insecticidesSub:['Explore our insecticide range','浏览杀虫剂产品'], fungicidesSub:['Explore our fungicide range','浏览杀菌剂产品'], nutritionSub:['Explore fertilizers and related products','浏览肥料及相关产品'],
  sceneNote:['AI-generated category illustrations. Product specifications are confirmed individually.','分类场景图由 AI 生成，仅作示意。具体产品规格请逐项确认。'],
  catalogEyebrow:['02 / THE PRODUCT DIRECTORY','02 / 完整产品目录'], catalogTitle:['Find your next<br><em>connection.</em>','找到所需产品。<br><em>开启下一次合作。</em>'],
  catalogIntro:['Build a list across product families.<br>One conversation. All your requirements.','跨类别添加产品，一次汇总询盘。<br>让每一项采购需求，都有清晰的沟通起点。'],
  viewInquiry:['View inquiry list','查看询盘清单'], catalogHint:['Select products to build your inquiry','选择产品，加入询盘清单'],
  productName:['PRODUCT NAME','产品名称'], productFamily:['PRODUCT FAMILY','产品类别'], inquiry:['INQUIRY','询盘'], loading:['Loading product catalog…','正在加载产品目录…'],
  catalogNote:['Product names follow the supplied catalog. Grade, formulation, packaging and destination requirements are confirmed on inquiry.','产品名称沿用所提供的清单。等级、剂型、包装及目的地要求，请在询盘中逐项确认。'],
  downloadProductList:['Download full product list','下载完整产品表'], aboutEyebrow:['03 / MEET YUNDAO','03 / 关于耘稻'],
  aboutTitle:['A local partner.<br><em>A global outlook.</em>','扎根中国。<br><em>面向世界。</em>'],
  aboutSignature:['NATURE · SCIENCE<br>CULTIVATION · HARVEST','自然 · 科学<br>耕耘 · 丰收'],
  aboutDescription:['We are a China-based foreign trade company focused on agricultural chemicals. Our portfolio covers herbicides, insecticides, fungicides and fertilizers, connecting product sourcing with the needs of international customers.','上海耘稻农业化工有限公司是一家立足中国、聚焦农业化学品的外贸公司。产品涵盖除草剂、杀虫剂、杀菌剂和肥料，面向国际客户的采购需求开展产品贸易与沟通。'],
  aboutDescription2:['Our approach starts with a conversation: the product, the specification, and the destination. Samantha is your direct contact to discuss each requirement.','从产品名称、规格到目的地，每一次合作都始于具体的沟通。Samantha 是您的直接联系人，与您逐项确认采购需求。'],
  licenseSummary:['The company holds a Chinese hazardous chemicals operating license for operations without storage facilities. Specific product scope and destination requirements are confirmed for each inquiry.','公司持有中国危险化学品经营许可证，经营方式为不带储存设施。具体产品经营范围及目标市场要求需在询盘中逐项确认。'],
  meetContact:['Start a conversation','开启沟通'], contactEyebrow:['04 / LET’S TALK','04 / 联系我们'],
  contactTitle:['Good things start<br><em>with a conversation.</em>','期待了解<br><em>您的采购需求。</em>'],
  contactIntro:['A product in mind? A list to source?<br>Tell Samantha what you are looking for.','已有明确的产品需求，或是一份采购清单？<br>欢迎与 Samantha 沟通。'],
  prepareInquiry:['Prepare your inquiry','整理采购询盘'], contactPerson:['Your contact at Yundao','耘稻农业化工 · 业务联系人'], shanghai:['Shanghai, China','中国 · 上海'], email:['EMAIL','邮箱'], phone:['PHONE','电话'],
  footerTagline:['Agricultural chemicals.<br>Global connections.','农业化工。<br>全球连接。'], backTop:['Back to top','返回顶部'],
  yourSelection:['YOUR SELECTION','您选择的产品'], yourInquiry:['Your inquiry.','询盘清单。'], productsSelected:['products selected','项已选产品'], clearAll:['Clear all','清空清单'],
  addMore:['Add more products','继续添加产品'], purchaseDetails:['A little more detail.','补充采购需求。'], optionalDetails:['Optional, but helpful for a more relevant reply.','以下信息可选填，便于我们更准确地回复。'],
  destination:['Destination country / region','目的地国家 / 地区'], quantity:['Estimated quantity','预计采购数量'], name:['Your name','您的姓名'], yourEmail:['Your email','您的邮箱'], company:['Company','公司名称'],
  requirements:['Formulation, packaging & other requirements','剂型、包装及其他采购要求'], destinationPlaceholder:['e.g. Brazil','例如：巴西'], quantityPlaceholder:['Quantity and unit','请注明数量和单位'], requirementsPlaceholder:['Tell us the grade, formulation, packaging or documents you need…','请说明所需等级、剂型、包装或文件；如有多个产品，请分别注明…'],
  continueWhatsApp:['Continue on WhatsApp','通过 WhatsApp 联系'], openEmail:['Open email draft','打开邮件草稿'], copyInquiry:['Copy inquiry','复制询盘内容'], downloadCopy:['Download a copy','下载询盘副本'], draftNote:['Opens a message draft. You choose when to send.','将打开消息草稿，由您确认后发送。'], productOverview:['PRODUCT OVERVIEW','产品概览']
};
let lang = storage.get('yundao-language') === 'zh' ? 'zh' : 'en';
let products = [], category = 'all', page = 1, catalogState = 'loading', detailId = null;
const pageSize = 10;
let storedSelection;
try { storedSelection = JSON.parse(storage.get('yundao-selected') || '[]'); } catch { storedSelection = []; }
let selected = new Set(Array.isArray(storedSelection) ? storedSelection.filter(Number.isInteger) : []);
const t = (en, zh) => lang === 'en' ? en : zh;
const tr = key => copy[key]?.[lang === 'en' ? 0 : 1] ?? key;
let toastTimeout;
const scrollBehavior = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

function applyCopy(root = document) {
  root.querySelectorAll('[data-copy]').forEach(element => { element.innerHTML = tr(element.dataset.copy); });
  root.querySelectorAll('[data-placeholder]').forEach(element => { element.placeholder = tr(element.dataset.placeholder); });
}
function translate() {
  document.documentElement.lang = lang;
  document.title = t('YUNDAO | Shanghai Yundao Agricultural Chemical Co., Ltd.', '耘稻农业化工 | 上海耘稻农业化工有限公司');
  applyCopy();
  $('#language span').textContent = lang === 'en' ? '中文' : 'EN';
  $('#language').setAttribute('aria-label', t('Switch to Chinese', '切换为英文'));
  $('#search').placeholder = t('Search a product…', '搜索中英文产品名…');
  $('#search').setAttribute('aria-label', t('Search products', '搜索产品'));
  $('nav').setAttribute('aria-label', t('Main navigation', '主导航'));
  $('#category-tabs').setAttribute('aria-label', t('Product categories', '产品分类'));
  $('.mobile-contact').setAttribute('aria-label', t('Quick contact', '快捷联系'));
  $$('[data-close]').forEach(button => button.setAttribute('aria-label', t('Close', '关闭')));
  $('#previous').setAttribute('aria-label', t('Previous page', '上一页'));
  $('#next').setAttribute('aria-label', t('Next page', '下一页'));
  $$('[data-family-count]').forEach(element => {
    const count = products.filter(product => product.category === element.dataset.familyCount).length;
    element.textContent = catalogState === 'ready' ? t(`${count} products`, `${count} 个条目`) : t('Explore range', '浏览产品');
  });
  renderCategories(); renderProducts(); renderSelected();
  if ($('#product-dialog').open && detailId !== null) renderDetail(detailId);
}
function renderCategories() {
  const filters = [['all', {en:'All products',zh:'全部产品'}], ...Object.entries(categories)];
  $('#category-tabs').innerHTML = filters.map(([key, name]) => {
    const count = key === 'all' ? products.length : products.filter(product => product.category === key).length;
    return `<button type="button" data-category="${key}" class="${category === key ? 'active' : ''}" aria-pressed="${category === key}">${name[lang]}${catalogState === 'ready' ? `<span>${count}</span>` : ''}</button>`;
  }).join('');
}
const normalize = value => String(value).toLowerCase().replace(/[\s,，\-–_]/g, '');
function filteredProducts() {
  const query = normalize($('#search').value.trim());
  return products.filter(product => (category === 'all' || product.category === category) && normalize(`${product.en} ${product.zh} ${product.source}`).includes(query));
}
function renderProducts() {
  if (catalogState !== 'ready') {
    const failed = catalogState === 'error';
    $('#result-count').textContent = failed ? t('Catalog unavailable', '产品目录暂时无法加载') : tr('loading');
    $('#product-rows').innerHTML = `<tr><td colspan="3" class="empty">${failed ? t('The catalog could not be loaded. Please retry or download the product list.', '产品目录暂时无法加载，请重试或下载产品表。') + `<br><button class="btn btn-outline" type="button" data-retry>${t('Retry', '重试')}</button>` : tr('loading')}</td></tr>`;
    $('#previous').disabled = $('#next').disabled = true;
    $('#page-label').textContent = '';
    return;
  }
  const list = filteredProducts();
  const pages = Math.max(1, Math.ceil(list.length / pageSize));
  page = Math.min(Math.max(1, page), pages);
  const label = category === 'all' ? t('All products', '全部产品') : categories[category][lang];
  $('#result-count').textContent = t(`${list.length} products · ${label}`, `${list.length} 个条目 · ${label}`);
  $('#product-rows').innerHTML = list.slice((page - 1) * pageSize, page * pageSize).map(product => {
    const active = selected.has(product.id);
    const primary = lang === 'en' ? product.en : product.zh || product.en;
    const secondary = lang === 'en' ? product.zh : product.zh ? product.en : '';
    return `<tr><td><button type="button" class="product-name" data-detail="${product.id}">${escapeHtml(primary)}</button>${secondary ? `<span class="product-translation">${escapeHtml(secondary)}</span>` : ''}</td><td class="category-column"><span class="product-family">${categories[product.category][lang]}</span></td><td><button type="button" class="add-product ${active ? 'selected' : ''}" data-add="${product.id}" aria-pressed="${active}" aria-label="${escapeHtml(active ? t(`Remove ${product.en} from inquiry`, `从询盘移除 ${product.zh || product.en}`) : t(`Add ${product.en} to inquiry`, `添加 ${product.zh || product.en} 至询盘`))}">${icon(active ? 'check' : 'plus')}${active ? t('Selected', '已选择') : t('Add to list', '加入清单')}</button></td></tr>`;
  }).join('') || `<tr><td colspan="3" class="empty">${t('No matching products. Try another name or category.', '没有匹配的产品，请尝试其他名称或分类。')}<br><button class="text-link" type="button" data-reset-search>${t('Reset search & filters', '重置搜索与分类')}${icon('arrow')}</button></td></tr>`;
  $('#page-label').textContent = t(`Page ${page} of ${pages}`, `第 ${page} / ${pages} 页`);
  $('#previous').disabled = page === 1;
  $('#next').disabled = page === pages || list.length === 0;
}
function updateCounts() { $$('[data-selection-count]').forEach(element => { element.textContent = selected.size; }); }
function selectedProducts() { return products.filter(product => selected.has(product.id)); }
function renderSelected() {
  updateCounts();
  const list = selectedProducts();
  $('#selected-total').textContent = list.length;
  $('[data-copy="productsSelected"]').textContent = t(list.length === 1 ? 'product selected' : 'products selected', '项已选产品');
  $('#clear-selection').disabled = list.length === 0;
  $('#selected-list').innerHTML = list.length ? Object.entries(categories).map(([key, name]) => {
    const family = list.filter(product => product.category === key);
    if (!family.length) return '';
    return `<div class="selected-group"><h3 class="selected-group-title">${name[lang]} · ${family.length}</h3>${family.map(product => `<div class="selected-item"><div><strong>${escapeHtml(lang === 'zh' ? product.zh || product.en : product.en)}</strong>${(lang === 'zh' ? product.zh : product.zh) ? `<small>${escapeHtml(lang === 'zh' ? product.en : product.zh)}</small>` : ''}</div><button class="icon-button" type="button" data-remove="${product.id}" aria-label="${escapeHtml(t(`Remove ${product.en}`, `移除 ${product.zh || product.en}`))}">${icon('close')}</button></div>`).join('')}</div>`;
  }).join('') : `<div class="empty-selection">${icon('bag')}<p>${t('Your list is ready to grow.<br>Add products, or describe your requirements below.', '询盘清单还没有产品。<br>可继续添加，或直接在下方描述采购需求。')}</p></div>`;
  updateDraftLinks();
}
function notify(message) {
  clearTimeout(toastTimeout);
  const toast = $('#selection-toast');
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2200);
}
function saveSelection() { storage.set('yundao-selected', JSON.stringify([...selected])); }
function toggleSelection(id, {removeOnly = false, announce = true} = {}) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  const remove = removeOnly || selected.has(id);
  if (remove) selected.delete(id); else selected.add(id);
  saveSelection(); renderProducts(); renderSelected();
  if (announce) notify(remove ? t(`${product.en} removed from your list.`, `已移除 ${product.zh || product.en}`) : t(`${product.en} added to your list.`, `已添加 ${product.zh || product.en} 至询盘清单`));
}
function openDialog(dialog) {
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('modal-open');
}
function openInquiry() {
  if ($('#product-dialog').open) $('#product-dialog').close();
  renderSelected();
  $('#form-status').textContent = '';
  openDialog($('#inquiry-dialog'));
  $('.drawer-body').scrollTop = 0;
}
function renderDetail(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  detailId = id;
  const needsClarification = /CTPR|MAP$|Bensulfuron|Monopotassium|Chunleimeisu|Kasugamycin|Pyraclostrobin/.test(product.en);
  const active = selected.has(id);
  $('#product-detail').innerHTML = `<span class="category-badge">${categories[product.category][lang]}</span><h2 id="product-detail-title" class="product-detail-name">${escapeHtml(lang === 'zh' ? product.zh || product.en : product.en)}</h2><p class="detail-translation">${escapeHtml(lang === 'zh' ? product.zh ? product.en : '' : product.zh)}</p><div class="detail-source"><small>${t('NAME AS LISTED IN THE ORIGINAL CATALOG', '原始产品表名称')}</small>${escapeHtml(product.source)}</div><p class="detail-note">${t('Please confirm the grade, formulation, quantity, packaging and destination with Samantha. Product specifications and documents are confirmed individually.', '请与 Samantha 确认等级、剂型、数量、包装和目的地。具体产品规格及文件需逐项确认。')}</p>${needsClarification ? `<p class="clarify">${t('Please confirm the exact chemical identity for this source name when inquiring.', '此原表名称需核对，请在询盘中确认准确的化学品名称。')}</p>` : ''}<div class="detail-actions"><button class="btn" type="button" data-detail-add="${id}">${icon(active ? 'check' : 'plus')}<span>${active ? t('Added to inquiry', '已加入询盘') : t('Add to inquiry', '加入询盘清单')}</span></button><button type="button" class="text-link" data-inquiry>${tr('viewInquiry')}${icon('arrow')}</button></div>`;
}
function showProduct(id) { renderDetail(id); if (detailId === id) openDialog($('#product-dialog')); }
function inquiryText() {
  const form = new FormData($('#inquiry-form'));
  const list = selectedProducts();
  const lines = [t('Hello Samantha,', 'Samantha 您好，'), '', t('I would like to inquire about the following Yundao products:', '我想咨询以下耘稻产品：')];
  Object.entries(categories).forEach(([key, names]) => {
    const family = list.filter(product => product.category === key);
    if (!family.length) return;
    lines.push('', names[lang] + ':', ...family.map(product => '- ' + product.source));
  });
  if (!list.length) lines.push(t('Please help me with my agricultural chemical requirements.', '希望了解农业化学品采购事宜。'));
  [['destination', t('Destination', '目的地')], ['quantity', t('Estimated quantity', '预计采购数量')], ['name', t('Name', '姓名')], ['email', t('Email', '邮箱')], ['company', t('Company', '公司')]].forEach(([key, label]) => {
    const value = String(form.get(key) || '').trim();
    if (value) lines.push(`${label}: ${value}`);
  });
  const requirements = String(form.get('requirements') || '').trim();
  if (requirements) lines.push('', t('Requirements:', '采购要求：'), requirements);
  lines.push('', 'Shanghai Yundao Agricultural Chemical Co., Ltd.', 'https://yundaochemical.com');
  return lines.join('\n');
}
function updateDraftLinks() {
  const body = encodeURIComponent(inquiryText());
  $('#whatsapp-inquiry').href = `https://wa.me/8619821171982?text=${body}`;
  $('#email-inquiry').href = 'mailto:samantha.zhi@outlook.com?subject=' + encodeURIComponent(t(`Yundao product inquiry${selected.size ? ` — ${selected.size} products` : ''}`, `耘稻产品询盘${selected.size ? ` — ${selected.size} 项产品` : ''}`)) + '&body=' + body;
}
async function loadProducts() {
  catalogState = 'loading'; translate();
  try {
    const response = await fetch('assets/products.json');
    if (!response.ok) throw new Error('Catalog unavailable');
    const data = await response.json();
    if (!Array.isArray(data) || !data.length || !data.every(product => Number.isInteger(product.id) && categories[product.category] && typeof product.en === 'string' && typeof product.zh === 'string' && typeof product.source === 'string') || new Set(data.map(product => product.id)).size !== data.length) throw new Error('Invalid catalog');
    products = data;
    selected = new Set([...selected].filter(id => products.some(product => product.id === id)));
    saveSelection(); catalogState = 'ready';
  } catch { catalogState = 'error'; }
  translate();
}
function chooseCategory(key, fromFamily = false) {
  if (key !== 'all' && !categories[key]) return;
  category = key; page = 1;
  if (fromFamily) $('#search').value = '';
  renderCategories(); renderProducts();
  if (fromFamily) $('#products').scrollIntoView({behavior:scrollBehavior()});
}
document.addEventListener('click', event => {
  const target = event.target.closest('button, a');
  if (!target) return;
  if (target.hasAttribute('data-close')) { target.closest('dialog').close(); return; }
  if (target.hasAttribute('data-family')) { chooseCategory(target.dataset.family, true); return; }
  if (target.hasAttribute('data-category')) { chooseCategory(target.dataset.category); $(`[data-category="${category}"]`)?.focus({preventScroll:true}); return; }
  if (target.hasAttribute('data-add')) {
    const id = Number(target.dataset.add); toggleSelection(id); $(`[data-add="${id}"]`)?.focus({preventScroll:true}); return;
  }
  if (target.hasAttribute('data-remove')) { toggleSelection(Number(target.dataset.remove), {removeOnly:true, announce:false}); $('#browse-more').focus({preventScroll:true}); return; }
  if (target.hasAttribute('data-detail')) { showProduct(Number(target.dataset.detail)); return; }
  if (target.hasAttribute('data-detail-add')) {
    const id = Number(target.dataset.detailAdd);
    if (!selected.has(id)) toggleSelection(id, {announce:false});
    renderDetail(id); $('#product-detail [data-detail-add]').focus({preventScroll:true}); return;
  }
  if (target.hasAttribute('data-inquiry')) { openInquiry(); return; }
  if (target.hasAttribute('data-retry')) { loadProducts(); return; }
  if (target.hasAttribute('data-reset-search')) { $('#search').value = ''; chooseCategory('all'); $('#search').focus(); }
});
$('#language').addEventListener('click', () => { lang = lang === 'en' ? 'zh' : 'en'; storage.set('yundao-language', lang); translate(); });
$('#search').addEventListener('input', () => { page = 1; renderProducts(); });
$('#previous').addEventListener('click', () => { page--; renderProducts(); $('.catalog-panel').scrollIntoView({behavior:scrollBehavior()}); });
$('#next').addEventListener('click', () => { page++; renderProducts(); $('.catalog-panel').scrollIntoView({behavior:scrollBehavior()}); });
$('#clear-selection').addEventListener('click', () => { selected.clear(); saveSelection(); renderProducts(); renderSelected(); $('#browse-more').focus(); });
$('#browse-more').addEventListener('click', () => { $('#inquiry-dialog').close(); $('#products').scrollIntoView({behavior:scrollBehavior()}); if (matchMedia('(min-width: 701px)').matches) $('#search').focus({preventScroll:true}); });
$('#inquiry-form').addEventListener('input', updateDraftLinks);
$('#inquiry-form').addEventListener('submit', event => { event.preventDefault(); });
['#whatsapp-inquiry', '#email-inquiry'].forEach(selector => $(selector).addEventListener('click', event => {
  if (!$('#inquiry-form').reportValidity()) { event.preventDefault(); return; }
  updateDraftLinks();
  $('#form-status').textContent = t('Your draft is ready. Review it in the app before sending.', '草稿已准备好，请在相应应用中确认并发送。');
}));
$('#copy-inquiry').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(inquiryText()); $('#form-status').textContent = t('Inquiry copied. Paste it into your message to Samantha.', '询盘已复制，可粘贴到发送给 Samantha 的消息中。'); }
  catch { $('#form-status').textContent = t('Copy is unavailable here. Download a copy or open an email draft instead.', '当前无法复制，请下载副本或打开邮件草稿。'); }
});
$('#download-inquiry').addEventListener('click', () => {
  const content = inquiryText() + '\n\n' + t('This inquiry has not been sent.', '此询盘尚未发送。');
  const url = URL.createObjectURL(new Blob(['\uFEFF' + content], {type:'text/plain;charset=utf-8'}));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'yundao-inquiry.txt'; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('#form-status').textContent = t('Your copy is ready. Send it to samantha.zhi@outlook.com.', '副本已生成，请发送至 samantha.zhi@outlook.com。');
});
$$('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => { if (!$('dialog[open]')) document.body.classList.remove('modal-open'); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
document.addEventListener('keydown', event => {
  if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !$('dialog[open]') && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
    event.preventDefault(); $('#products').scrollIntoView(); $('#search').focus({preventScroll:true});
  }
});
$('#copyright-year').textContent = new Date().getFullYear();
loadProducts();
