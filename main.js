/* Nouran Salah portfolio script.
   Capture the page source before anything renders: saving rebuilds index.html from this plus the edited content. */
const SRC = document.body.innerHTML;
const HEAD = document.head.outerHTML;
const LANG = document.documentElement.getAttribute("lang") || "en";
let CMS = {text:{}, media:{}};
try { CMS = JSON.parse(document.getElementById("cms").textContent); } catch(e) {}
CMS.text = CMS.text || {}; CMS.media = CMS.media || {};

let editing = false, dirty = false;
const fmt = n => n.toLocaleString("en-US");
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* Keep only simple formatting in edited text. */
function clean(html){
  const t = document.createElement("template"); t.innerHTML = html;
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 1) {
      walk(n);
      if (!["B","STRONG","I","EM","BR"].includes(n.tagName)) n.replaceWith(...n.childNodes);
      else [...n.attributes].forEach(a => n.removeAttribute(a.name));
    } else if (n.nodeType !== 3) n.remove();
  });
  walk(t.content);
  return t.innerHTML.trim();
}
function applyText(root){
  root.querySelectorAll("[data-edit]").forEach(el => {
    const k = el.dataset.edit;
    if (k in CMS.text) el.innerHTML = clean(CMS.text[k]);
    el.contentEditable = editing ? "true" : "false";
    if (!editing) el.removeAttribute("contenteditable");
  });
}

/* ---------- campaigns ---------- */
const MAX = 10;
const cbGroups = [
  {title:"Pink Friday and November", when:"Oct – Dec 2025", why:"Sale-season campaigns built around bundles, installments and new shoot creative.", items:[
    {n:"ABO-4product-pinkfriday", t:"ABO, four-product bundle", p:156, s:74659, v:436226, r:5.8, c:478.6,
     what:"A Pink Friday campaign promoting a bundle of four products.",
     take:"A solid 5.8x with a mid-range cost per purchase. The bundle supported larger baskets during the sale."},
    {n:"CBO-Installments-Nour", t:"CBO, installment offer", p:277, s:129473, v:734416, r:5.7, c:467.4,
     what:"A campaign built around paying in installments, which lowers the barrier on higher-priced baskets.",
     take:"The second-largest volume of the ten (277 purchases) at a steady 5.7x. Installments worked as a reliable scaling offer."},
    {n:"CBO November shoot (Nour)", t:"CBO, new shoot creative", p:145, s:70369, v:396021, r:5.6, c:485.3,
     what:"A campaign using creative from the November photo shoot.",
     take:"5.6x, in line with the other November campaigns. It confirmed the new shoot performed as well as existing creative."}
  ]},
  {title:"Year-end push", when:"Dec 2025 – Jan 2026", why:"Reminder and UGC campaigns to capture end-of-year demand.", items:[
    {n:"ABO_reminder_23/12", t:"ABO, reminder campaign", p:435, s:206841, v:1002018, r:4.8, c:475.5,
     what:"A reminder campaign launched on 23 December for the year-end buying window.",
     take:"The biggest campaign by purchases (435) and the only one over EGP 1M in conversion value. It served as the volume engine."},
    {n:"UGC-Existing1/1", t:"UGC creative, 1 January launch", p:50, s:16375, v:122617, r:7.5, c:327.5,
     what:"A UGC creative campaign launched on 1 January with a small budget.",
     take:"The lowest cost per purchase of all ten (EGP 327.5) at 7.5x. A strong candidate for more budget."},
    {n:"ABO-UGC-22/12", t:"ABO, UGC creative, 22 December launch", p:33, s:24282, v:99301, r:4.1, c:735.8,
     what:"A UGC campaign launched on 22 December.",
     take:"The weakest of the ten at 4.1x. Next to the 7.5x UGC campaign, it shows timing and offer matter as much as format."}
  ]},
  {title:"Ramadan and Mother's Day", when:"Mar – Apr 2026", why:"The strongest period of the year, with March gross sales of EGP 17.46M.", items:[
    {n:"MotherDay UGC (Nour)", t:"UGC creative, Mother's Day", p:306, s:111600, v:762280, r:6.8, c:364.7,
     what:"UGC creative built for Mother's Day.",
     take:"The best mix of scale and efficiency: 306 purchases at 6.8x and EGP 365 per purchase."},
    {n:"Ns_Motherday10/3", t:"Mother's Day, 10 March launch", p:120, s:67955, v:355280, r:5.2, c:566.3,
     what:"A second Mother's Day campaign launched on 10 March.",
     take:"5.2x at a higher EGP 566 per purchase. It added volume next to the UGC campaign but was less efficient."},
    {n:"Nour_carousel16/3", t:"Carousel format, 16 March launch", p:64, s:36296, v:186950, r:5.1, c:567.1,
     what:"A carousel-format campaign launched on 16 March.",
     take:"5.1x and EGP 567 per purchase. A useful format comparison: UGC beat carousel in this period."},
    {n:"Ns_Ramdanoffers", t:"Ramadan offers", p:42, s:16078, v:155249, r:9.7, c:382.8,
     what:"An offer-led Ramadan campaign on a small EGP 16K budget.",
     take:"The highest ROAS of all campaigns at 9.7x. With 42 purchases it needs more spend to prove it holds at scale."}
  ]}
];
const egGroups = [{title:"", why:"", items:[
  {n:"Sales | Student Box", t:"Sales campaign, main scale driver", p:2088, s:538528, v:2034319, r:3.78, c:281.95,
   what:"The largest campaign in the account, with about 5.9M impressions and EGP 539K spend.",
   take:"2,088 purchases at 3.78x. CPM was the highest of the three at EGP 91, the price of scaling reach. This is the volume engine."},
  {n:"CBO | Adv+ | Ctlg All Products", t:"CBO, Advantage+ catalog", p:435, s:75432, v:389089, r:5.16, c:188.58,
   what:"A catalog campaign showing all products to the people most likely to buy.",
   take:"The best ROAS (5.16x) and lowest cost per purchase (EGP 189) of the three. The efficiency benchmark for the account."},
  {n:"CBO | Scaling Keefa box | 6/9/2026", t:"CBO, scaling a product box, from 6 Sep", p:66, s:15086, v:64282, r:4.26, c:251.43,
   what:"A campaign scaling a single product box, launched on 6 September with a small budget.",
   take:"Profitable at 4.26x but early. Link click rate (1.85%) was well below the other two (4.58% and 5.22%), so the creative is the first thing to test."}
]}];
const slug = s => s.replace(/[^a-z0-9]+/gi,"-").toLowerCase();

function campEl(c, showSeason){
  const el = document.createElement("details"); el.className = "camp";
  const k = "camp-" + slug(c.n);
  el.innerHTML = `
    <summary>
      <span class="cname"><code>${esc(c.n)}</code><small>${esc(c.t)}</small>${showSeason && c.season ? `<span class="season">${esc(c.season)}</span>` : ""}</span>
      <span class="bar" aria-label="ROAS ${c.r} times"><span class="track"><i style="width:${Math.min(c.r/MAX,1)*100}%"></i></span><b>${c.r}x</b></span>
      <span class="cpur">${fmt(c.p)}</span>
      <span class="ccpp">EGP ${Math.round(c.c)}</span>
      <span class="chev" aria-hidden="true"></span>
    </summary>
    <div class="cbody">
      <dl class="metrics">
        <div><dt>Purchases</dt><dd>${fmt(c.p)}</dd></div>
        <div><dt>Spend</dt><dd>EGP ${fmt(c.s)}</dd></div>
        <div><dt>Conversion value</dt><dd>EGP ${fmt(c.v)}</dd></div>
        <div><dt>Cost per purchase</dt><dd>EGP ${c.c}</dd></div>
      </dl>
      <div><h5>What it was</h5><p data-edit="${k}-what">${esc(c.what)}</p><h5>What it showed</h5><p data-edit="${k}-take">${esc(c.take)}</p></div>
    </div>`;
  return el;
}
function colhead(){ const h = document.createElement("div"); h.className = "colhead"; h.setAttribute("aria-hidden","true");
  h.innerHTML = "<span>Campaign</span><span>ROAS</span><span style='text-align:right'>Purchases</span><span style='text-align:right'>Cost / purchase</span><span></span>"; return h; }
function renderGroups(root, groups, showSeason){
  root.innerHTML = "";
  groups.forEach(g => {
    const d = document.createElement("div"); d.className = "cgroup";
    if (g.title) d.innerHTML = `<h4>${esc(g.title)}${g.when ? ` <span style="color:var(--muted);font-weight:500">· ${esc(g.when)}</span>` : ""}</h4><p class="why">${esc(g.why)}</p>`;
    const list = document.createElement("div"); list.className = "clist";
    list.appendChild(colhead());
    g.items.forEach(c => list.appendChild(campEl(c, showSeason)));
    d.appendChild(list); root.appendChild(d);
  });
  applyText(root);
}
renderGroups(document.getElementById("eg-camps"), egGroups);
const cbRoot = document.getElementById("cb-camps");
const flat = cbGroups.flatMap(g => g.items.map(c => ({...c, season: g.title})));
let cbMode = "season";
function cbView(v){
  cbMode = v;
  document.querySelectorAll("[data-v]").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === v));
  if (v === "season") return renderGroups(cbRoot, cbGroups);
  const sorted = [...flat].sort((a,b) => v === "roas" ? b.r - a.r : v === "p" ? b.p - a.p : a.c - b.c);
  renderGroups(cbRoot, [{title:"", why:"", items: sorted}], true);
}
document.querySelectorAll("[data-v]").forEach(b => b.onclick = () => cbView(b.dataset.v));
cbView("season");

/* ---------- images per section ---------- */
const lb = document.getElementById("lightbox"), lbImg = document.getElementById("lbImg"), lbCap = document.getElementById("lbCap");
let lbList = [], lbIdx = 0;
function openLb(list, i){ lbList = list; lbIdx = (i + list.length) % list.length; const m = list[lbIdx];
  lbImg.src = m.src; lbImg.alt = m.t || "Image"; lbCap.textContent = [m.t, m.s].filter(Boolean).join(": ") + `  (${lbIdx+1} of ${list.length})`; if (!lb.open) lb.showModal(); }
document.getElementById("lbClose").onclick = () => lb.close();
document.getElementById("lbPrev").onclick = () => openLb(lbList, lbIdx - 1);
document.getElementById("lbNext").onclick = () => openLb(lbList, lbIdx + 1);
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
document.addEventListener("keydown", e => { if (!lb.open) return; if (e.key === "ArrowRight") openLb(lbList, lbIdx + 1); if (e.key === "ArrowLeft") openLb(lbList, lbIdx - 1); });

function renderMedia(slot){
  const key = slot.dataset.media, list = CMS.media[key] || [];
  slot.innerHTML = "";
  if (slot.dataset.kind === "photo") {
    const m = list[0];
    slot.innerHTML = `<div class="face">${m ? `<img src="${esc(m.src)}" alt="Nouran Salah">` : "NS"}</div>`;
    if (editing) {
      const lab = document.createElement("label"); lab.className = "pbtn"; lab.textContent = m ? "Change" : "Add photo";
      const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*"; inp.id = "up-photo";
      inp.onchange = async () => { if (!inp.files[0]) return; CMS.media.photo = [{src: await compress(inp.files[0], 600), t:"Photo"}]; touched(); renderMedia(slot); };
      lab.appendChild(inp); slot.appendChild(lab);
      if (m) { const rm = document.createElement("button"); rm.type = "button"; rm.className = "pbtn"; rm.style.inset = "-6px -6px auto auto"; rm.textContent = "Remove";
        rm.onclick = () => { CMS.media.photo = []; touched(); renderMedia(slot); }; slot.appendChild(rm); }
    }
    return;
  }
  list.forEach((m, i) => {
    const f = document.createElement("figure"); f.className = "shot";
    f.innerHTML = `<button type="button" class="zoom" aria-label="Enlarge ${esc(m.t || "image")}"><img loading="lazy" src="${esc(m.src)}" alt="${esc(m.t || "Image")}"></button>
      <figcaption>${m.k ? `<span class="kicker">${esc(m.k)}</span>` : ""}<b data-mf="t">${esc(m.t || "")}</b><small data-mf="s">${esc(m.s || "")}</small></figcaption>`;
    f.querySelector(".zoom").onclick = () => openLb(list, i);
    if (editing) {
      f.querySelectorAll("[data-mf]").forEach(el => { el.contentEditable = "true"; if (!el.textContent) el.dataset.ph = el.dataset.mf === "t" ? "Title" : "Description";
        el.oninput = () => { m[el.dataset.mf] = el.textContent.trim(); touched(); }; });
      const tools = document.createElement("div"); tools.className = "mtools";
      tools.innerHTML = `<button type="button" data-a="l">← Move</button><button type="button" data-a="r">Move →</button><button type="button" class="del" data-a="x">Remove</button>`;
      tools.onclick = e => { const a = e.target.dataset.a; if (!a) return;
        if (a === "x") list.splice(i, 1);
        if (a === "l" && i > 0) [list[i-1], list[i]] = [list[i], list[i-1]];
        if (a === "r" && i < list.length - 1) [list[i+1], list[i]] = [list[i], list[i+1]];
        CMS.media[key] = list; touched(); renderMedia(slot); };
      f.appendChild(tools);
    }
    slot.appendChild(f);
  });
  if (editing) {
    const add = document.createElement("label"); add.className = "addimg";
    add.innerHTML = `<span>+ Add image to this section<br><small style="font-weight:500">JPG or PNG, resized automatically</small></span>`;
    const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*"; inp.multiple = true; inp.id = "up-" + key;
    inp.onchange = async () => { const arr = CMS.media[key] = CMS.media[key] || [];
      for (const file of inp.files) arr.push({src: await compress(file, 1600), t: file.name.replace(/\.[^.]+$/,"").replace(/[-_]+/g," "), s:""});
      touched(); renderMedia(slot); };
    add.appendChild(inp); slot.appendChild(add);
  }
}
const renderAllMedia = () => document.querySelectorAll("[data-media]").forEach(renderMedia);

async function compress(file, max){
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((ok, bad) => { const i = new Image(); i.onload = () => ok(i); i.onerror = bad; i.src = url; });
    const s = Math.min(1, max / Math.max(img.width, img.height));
    const c = document.createElement("canvas"); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
    const x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.84);
  } finally { URL.revokeObjectURL(url); }
}

/* screenshot tabs */
document.querySelectorAll("[data-t]").forEach(b => b.onclick = () => {
  document.querySelectorAll("[data-t]").forEach(x => { x.setAttribute("aria-pressed", x === b); document.querySelector(`[data-media="${x.dataset.t}"]`).hidden = x !== b; });
});
if ((CMS.media.proof_eg || []).length) document.getElementById("t-eg").click();

/* ---------- edit mode ---------- */
let bar = null, artifactApi = null, readOnly = false;
const inViewer = !!window.claude;
if (inViewer && typeof window.claude.use === "function") {
  window.claude.use("artifact").then(a => { artifactApi = a; updateBar(); }).catch(() => {});
}
function pageSize(){ return new Blob([buildHtml()]).size; }
function buildHtml(){
  const t = document.createElement("template"); t.innerHTML = SRC;
  t.content.getElementById("cms").textContent = JSON.stringify(CMS).replace(/</g, "\\u003c");
  return "<!doctype html>\n<html lang=\"" + LANG + "\">\n" + HEAD + "\n<body>" + t.innerHTML + "</body>\n</html>\n";
}
function touched(){ dirty = true; updateBar(); }
function setMsg(html){ if (bar) bar.querySelector(".msg").innerHTML = html; }
function updateBar(){
  if (!bar) return;
  const save = bar.querySelector("#saveBtn"), dl = bar.querySelector("#dlBtn");
  save.hidden = !artifactApi || readOnly; dl.hidden = inViewer;
  save.disabled = !dirty;
  if (readOnly) setMsg("<b>Read-only.</b> You can view this page but not save changes to it.");
  else setMsg(`<b>Editing.</b> Click any dashed text to change it, or add images in each section. ${dirty ? "Unsaved changes." : "No changes yet."}`);
}
function startEdit(){
  if (editing) return;
  editing = true; document.body.classList.add("editing");
  bar = document.createElement("div"); bar.className = "editbar"; bar.setAttribute("role","region"); bar.setAttribute("aria-label","Edit mode");
  bar.innerHTML = `<p class="msg"></p><button type="button" id="saveBtn" class="primary">Save to page</button><button type="button" id="dlBtn" class="primary">Download updated index.html</button><button type="button" id="exitBtn">Exit editing</button>`;
  document.body.appendChild(bar);
  bar.querySelector("#exitBtn").onclick = stopEdit;
  bar.querySelector("#saveBtn").onclick = saveToPage;
  bar.querySelector("#dlBtn").onclick = downloadFile;
  applyText(document); renderAllMedia(); updateBar();
}
function stopEdit(){
  if (dirty) { setMsg("<b>You have unsaved changes.</b> Save them first, or press Exit again to discard them."); if (!bar.dataset.warned) { bar.dataset.warned = "1"; return; } }
  if (dirty) { location.reload(); return; }
  editing = false; document.body.classList.remove("editing"); bar.remove(); bar = null;
  applyText(document); renderAllMedia();
  if (location.hash === "#edit") history.replaceState(null, "", location.pathname + location.search);
}
async function saveToPage(){
  const size = pageSize();
  if (size > 15.5e6) { setMsg("<b>Too large to save.</b> Remove a few images and try again."); return; }
  const btn = bar.querySelector("#saveBtn"); btn.disabled = true; setMsg("<b>Saving…</b> The page reloads with your changes when it's done.");
  try { dirty = false; await artifactApi.publish(buildHtml()); }
  catch (e) {
    dirty = true;
    const code = e && e.code;
    if (code === "not_writer" || code === "not_granted" || code === "consent_required" || code === "capability_disabled" || code === "not_declared") { readOnly = true; updateBar(); }
    else if (code === "conflict") setMsg("<b>Someone saved a newer version first.</b> The page is reloading to it.");
    else if (code === "too_large") setMsg("<b>Too large to save.</b> Remove a few images and try again.");
    else { setMsg("<b>Couldn't save.</b> Check your connection and press Save again."); btn.disabled = false; }
  }
}
function downloadFile(){
  const blob = new Blob([buildHtml()], {type:"text/html"});
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "index.html";
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  dirty = false; updateBar(); setMsg("<b>Downloaded.</b> Replace index.html in your site folder with this file to publish the changes.");
}
document.addEventListener("input", e => {
  if (!editing) return; const el = e.target.closest && e.target.closest("[data-edit]"); if (!el) return;
  CMS.text[el.dataset.edit] = clean(el.innerHTML); touched();
});
document.addEventListener("paste", e => {
  if (!editing || !e.target.closest || !e.target.closest("[data-edit],[data-mf]")) return;
  e.preventDefault(); document.execCommand("insertText", false, (e.clipboardData || window.clipboardData).getData("text/plain"));
});
document.getElementById("editDot").onclick = startEdit;
document.addEventListener("keydown", e => { if (e.ctrlKey && e.shiftKey && (e.key === "E" || e.key === "e")) { e.preventDefault(); startEdit(); } });
window.addEventListener("hashchange", () => { if (location.hash === "#edit") startEdit(); });
window.addEventListener("beforeunload", e => { if (dirty && !inViewer) { e.preventDefault(); e.returnValue = ""; } });

applyText(document); renderAllMedia();
if (location.hash === "#edit") startEdit();

/* copy contact details */
document.querySelectorAll("[data-copy]").forEach(btn => btn.onclick = () => {
  const el = document.getElementById(btn.dataset.copy), label = btn.textContent;
  const ok = () => { btn.textContent = "Copied"; setTimeout(() => btn.textContent = label, 1600); };
  const fallback = () => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = "Selected, press Ctrl+C"; setTimeout(() => btn.textContent = label, 2200); };
  try { navigator.clipboard.writeText(el.textContent.trim()).then(ok, fallback); } catch(e){ fallback(); }
});

/* highlight the current section in the nav */
const links = [...document.querySelectorAll("nav a")];
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); }), {rootMargin:"-45% 0px -50% 0px"});
["about","experience","egurus","cherry","skills","education","proof"].forEach(id => io.observe(document.getElementById(id)));
