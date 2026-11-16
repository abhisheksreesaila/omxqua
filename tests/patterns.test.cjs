// Restrained glass and the sections pill (2026-11-15): the CSS rules that keep glass restrained, the phone targets, and the
// account menu's keys and motion in omxqua.js, run against a tiny fake DOM (no dependencies). Run: node --test tests/
const test = require("node:test"), assert = require("node:assert"), vm = require("node:vm");
const read = f => require("fs").readFileSync(require("path").join(__dirname, "..", f), "utf8");
const css = read("src/components.css");
const rule = sel => { const i = css.indexOf(sel + " {"); assert.ok(i >= 0, sel + " missing"); return css.slice(i, css.indexOf("}", i)); };
const phone = css.slice(css.indexOf("@container (max-width: 640px)", css.indexOf(".oq-sections {")));

test("glass frosts only over a sky; off a sky .oq-glass is an opaque card", () => {
  assert.doesNotMatch(rule(":where(.oq-root) .oq-glass"), /backdrop-filter/);
  assert.match(rule(":where(.oq-root) .oq-glass"), /background: var\(--oq-surface-1\)/);
  assert.match(rule(".oq-root.oq-sky .oq-glass, .oq-root .oq-sky .oq-glass"), /backdrop-filter: var\(--oq-glass-card-blur\)/);
  assert.match(rule(".oq-root.oq-sky .oq-glass.prose, .oq-root .oq-sky .oq-glass.prose"), /--oq-glass-prose-mix/);
});
test("never glass on glass: a glass card inside glass or the pill is solid", () => {
  const r = rule(".oq-root :is(.oq-glass, .oq-sections) .oq-glass, .oq-root :is(.oq-glass, .oq-sections) .oq-glass.prose");
  assert.match(r, /background: var\(--oq-surface-2\)/); assert.match(r, /backdrop-filter: none/);
});
test("reduced transparency and no blur: glass cards and the pill turn solid", () => {
  const rt = [...css.matchAll(/@media \(prefers-reduced-transparency: reduce\) \{([^\n]*)\n/g)].map(m => m[1]).join(" ");
  assert.match(rt, /\.oq-sections[^{]*\{ background: var\(--oq-surface-2\) !important; -webkit-backdrop-filter: none; backdrop-filter: none;/);
  assert.match(rt, /\.oq-root \.oq-glass \{ background: var\(--oq-surface-1\) !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important;/);
  const ns = [...css.matchAll(/@supports not \(\(backdrop-filter[^\n]*\n/g)].map(m => m[0]).join(" ");
  assert.match(ns, /\.oq-sections/); assert.match(ns, /\.oq-root \.oq-glass \{ background: var\(--oq-surface-1\) !important/);
});
test("phone: the pill floats at the foot, safe-area aware, with 48 px items; the avatar is 48 px", () => {
  assert.match(phone, /\.oq-sections \{ top: auto; bottom: max\(14px, calc\(env\(safe-area-inset-bottom\) \+ 8px\)\)/);
  assert.match(phone, /\.oq-sections :is\(a, button\) \{ min-height: 48px; min-width: 48px;/);
  assert.match(phone, /\.oq-account > button \{ width: 48px; height: 48px; \}/);
  assert.match(phone, /\.oq-account \.menu \.mi \{ min-height: 48px; \}/);
});
test("the current section is aria-current in the accent; section links get the press", () => {
  assert.match(rule(":where(.oq-root) .oq-sections [aria-current]:not([aria-current=\"false\"])"), /background: var\(--oq-accent\); color: var\(--oq-on-accent\)/);
  assert.match(read("src/omxqua.js"), /const PRESS = "[^"]*\.oq-sections a/);
});

/* ---- a fake DOM just big enough for the menu: elements, simple selectors, events, focus, animate ---- */
function dom({ reduce, width }) {
  const TOK = { "--oq-spring": "linear(0, 1)", "--oq-spring-dur": "450ms", "--oq-gentle-in": "220ms", "--oq-gentle-out": "150ms", "--oq-ease-in": "cubic-bezier(.2, 0, 0, 1)", "--oq-ease-out": "cubic-bezier(.3, 0, 1, 1)" };
  const anims = [], on = {};
  const one = (el, s) => { /* tag, .class, [attr], [attr="v"], :not([attr]) */
    s = s.trim(); let rest = s.replace(/:not\(\[([\w-]+)\]\)/g, (m, a) => { if (el.attrs[a] !== undefined) rest = null; return ""; });
    if (rest === null) return false;
    for (const m of rest.matchAll(/\[([\w-]+)(?:="([^"]*)")?\]|\.([\w-]+)|^([a-z]+)/g)) {
      if (m[1] && (el.attrs[m[1]] === undefined || (m[2] !== undefined && el.attrs[m[1]] !== m[2]))) return false;
      if (m[3] && !el.cls.has(m[3])) return false;
      if (m[4] && el.tag !== m[4]) return false;
    }
    return true;
  };
  class El {
    constructor(tag, attrs = {}, cls = "") { this.tag = tag; this.attrs = { ...attrs }; this.cls = new Set(cls.split(" ").filter(Boolean)); this.kids = []; this.parent = null; this.hidden = "hidden" in attrs; this.style = {}; this.offsetWidth = 100; this.clientWidth = width; }
    add(...k) { k.forEach(c => { c.parent = this; this.kids.push(c); }); return this; }
    matches(s) { return s.split(",").some(x => one(this, x)); }
    closest(s) { for (let e = this; e; e = e.parent) if (e.matches && e.matches(s)) return e; return null; }
    all() { return this.kids.flatMap(k => [k, ...k.all()]); }
    querySelectorAll(s) { return this.all().filter(e => e.matches(s)); }
    contains(e) { for (; e; e = e.parent) if (e === this) return true; return false; }
    getAttribute(a) { return this.attrs[a] ?? null; } setAttribute(a, v) { this.attrs[a] = String(v); } hasAttribute(a) { return a in this.attrs; }
    focus() { doc.activeElement = this; }
    getBoundingClientRect() { return { top: 0, left: 0, right: 100, bottom: 40, width: 100, height: 40 }; }
    getAnimations() { return []; } getClientRects() { return []; }
    animate(kf, opts) { const a = { kf, opts, onfinish: null, cancel() {} }; anims.push(a); return a; }
  }
  const btn = new El("button", { "data-oq-menu": "", "aria-haspopup": "menu", "aria-expanded": "false", "aria-controls": "m" });
  const mi = n => new El("button", { role: "menuitem" }, "mi").add(new El("span", { name: n }));
  const menu = new El("div", { role: "menu", id: "m", hidden: "" }, "menu").add(mi("Profile"), mi("Settings"), mi("Sign out"));
  const outside = new El("main", {}, "main");
  const root = new El("div", {}, "oq-root").add(new El("div", {}, "oq-account").add(btn, menu), outside);
  const doc = { documentElement: root, activeElement: null, getElementById: id => root.all().find(e => e.attrs.id === id) || null, querySelectorAll: s => root.querySelectorAll(s) };
  const ctx = { document: doc, innerWidth: width, devicePixelRatio: 1, setTimeout, clearTimeout, requestAnimationFrame: f => setTimeout(f, 0), performance,
    matchMedia: q => ({ matches: reduce && /reduced-motion/.test(q) }), MutationObserver: class { observe() {} }, IntersectionObserver: class { observe() {} },
    getComputedStyle: () => ({ getPropertyValue: n => TOK[n] || "", borderTopLeftRadius: "14px" }),
    addEventListener: (t, f) => (on[t] = on[t] || []).push(f), removeEventListener() {} };
  ctx.window = ctx; vm.runInNewContext(read("src/omxqua.js"), ctx);
  const fire = (type, target, extra = {}) => { const e = { type, target, button: 0, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...extra }; (on[type] || []).forEach(f => f(e)); return e; };
  const key = k => fire("keydown", doc.activeElement || root, { key: k });
  const items = menu.querySelectorAll('[role="menuitem"]');
  return { btn, menu, items, outside, doc, anims, fire, key, Omxqua: ctx.Omxqua };
}

test("the avatar's menu: click opens on the first item, arrows wrap, Home and End jump, Escape returns focus", () => {
  const d = dom({ reduce: true, width: 390 });
  d.fire("click", d.btn);
  assert.strictEqual(d.menu.hidden, false); assert.strictEqual(d.btn.getAttribute("aria-expanded"), "true"); assert.strictEqual(d.doc.activeElement, d.items[0]);
  d.key("ArrowDown"); assert.strictEqual(d.doc.activeElement, d.items[1]);
  d.key("ArrowDown"); d.key("ArrowDown"); assert.strictEqual(d.doc.activeElement, d.items[0], "ArrowDown wraps to the first");
  d.key("ArrowUp"); assert.strictEqual(d.doc.activeElement, d.items[2], "ArrowUp wraps to the last");
  d.key("Home"); assert.strictEqual(d.doc.activeElement, d.items[0]);
  d.key("End"); assert.strictEqual(d.doc.activeElement, d.items[2]);
  assert.ok(d.key("Escape").defaultPrevented);
  assert.strictEqual(d.menu.hidden, true); assert.strictEqual(d.btn.getAttribute("aria-expanded"), "false"); assert.strictEqual(d.doc.activeElement, d.btn, "focus goes back to the avatar");
});
test("the avatar's menu: ArrowUp on the button opens at the last item; Tab, a tap outside, a pick or the avatar again close it", () => {
  const d = dom({ reduce: true, width: 1280 });
  d.btn.focus(); d.key("ArrowUp"); assert.strictEqual(d.menu.hidden, false); assert.strictEqual(d.doc.activeElement, d.items[2]);
  d.key("Tab"); assert.strictEqual(d.menu.hidden, true);
  d.fire("click", d.btn); d.fire("click", d.outside); assert.strictEqual(d.menu.hidden, true); assert.notStrictEqual(d.doc.activeElement, d.btn, "a tap elsewhere keeps focus where it went");
  d.fire("click", d.btn); d.fire("click", d.items[1].kids[0]); assert.strictEqual(d.menu.hidden, true, "picking an item closes the menu");
  d.fire("click", d.btn); d.fire("click", d.btn); assert.strictEqual(d.menu.hidden, true); assert.strictEqual(d.doc.activeElement, d.btn);
});
test("reduced motion: the menu opens and closes with no animation", () => {
  const d = dom({ reduce: true, width: 390 });
  d.fire("click", d.btn); d.key("Escape");
  assert.strictEqual(d.anims.length, 0);
});
test("a phone: the menu grows out of the avatar on --oq-spring and folds back into it", () => {
  const d = dom({ reduce: false, width: 390 });
  d.fire("click", d.btn);
  const a = d.anims[0];
  assert.match(a.kf[0].clipPath, /^inset\(/); assert.match(a.kf[1].clipPath, /^inset\(0px 0px 0px 0px round 14px\)/);
  assert.strictEqual(a.opts.easing, "linear(0, 1)"); assert.strictEqual(a.opts.duration, 450);
  d.key("Escape"); const b = d.anims[1];
  assert.match(b.kf[1].clipPath, /^inset\(/, "folds back into the avatar"); assert.strictEqual(b.opts.duration, 150);
  assert.strictEqual(d.menu.hidden, false, "stays until the fold ends"); b.onfinish(); assert.strictEqual(d.menu.hidden, true);
});
test("a laptop: the menu is a calm fade, nothing grows", () => {
  const d = dom({ reduce: false, width: 1280 });
  d.fire("click", d.btn);
  const a = d.anims[0];
  assert.strictEqual(JSON.stringify(a.kf.map(k => Object.keys(k))), JSON.stringify([["opacity"], ["opacity"]]));
  assert.strictEqual(a.opts.duration, 220); assert.strictEqual(a.opts.easing, "cubic-bezier(.2, 0, 0, 1)");
});
test("the sky outranks a plain root background (.oq-root.oq-sky, not :where)", () => {
  assert.match(css, /^\.oq-root\.oq-sky, :where\(\.oq-root\) \.oq-sky \{ background: linear-gradient\(180deg, var\(--oq-sky-1\), var\(--oq-sky-2\) 55%, var\(--oq-sky-3\)\); \}/m);
});
