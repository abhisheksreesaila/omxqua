// Every family's text pairs clear 4.5:1 on every surface, read straight from src/tokens.css.
// Run: node --test tests/
const test = require("node:test"), assert = require("node:assert");
const css = require("fs").readFileSync(require("path").join(__dirname, "../src/tokens.css"), "utf8");
const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
const block = sel => { const m = css.match(new RegExp(sel.replace(/\./g, "\\.") + "\\s*\\{([^}]*)\\}")); assert.ok(m, sel + " missing"); return Object.fromEntries([...m[1].matchAll(/--oq-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)].map(x => [x[1], x[2]])); };
for (const fam of ["dev", "travel", "kids", "money"]) for (const theme of ["night", "light"]) {
  test(`${fam} · ${theme}: text and states 4.5:1 on every surface, data marks 3:1 on cards`, () => {
    const t = block(`.oq-family-${fam}.oq-${theme}`);
    for (const s of ["surface-0", "surface-1", "surface-2", "surface-3"]) for (const k of ["ink", "ink-2", "accent"])
      assert.ok(ratio(t[k], t[s]) >= 4.5, `${k} on ${s}: ${ratio(t[k], t[s]).toFixed(2)}`);
    for (const s of ["surface-0", "surface-1", "surface-2", "surface-3"]) for (const k of ["ok", "warn", "bad", "info"]) assert.ok(ratio(t[k], t[s]) >= 4.5, `${k} on ${s}: ${ratio(t[k], t[s]).toFixed(2)}`);
    assert.ok(ratio(t["on-accent"], t.accent) >= 4.5, "on-accent");
    // data colours are marks (bars, dots, lines), not text; they sit on cards (surface-1), so 3:1 is checked there
    if (fam === "money") for (let i = 1; i <= 6; i++) {
      assert.ok(ratio(t["data-" + i], t["surface-1"]) >= 3, `data-${i}`);
      assert.notStrictEqual(t["data-" + i].toLowerCase(), t.accent.toLowerCase(), "the accent never doubles as a data colour");
    }
  });
}
// Skins override surfaces, ink and accent on top of their family; the merged result must clear the same bar.
for (const [fam, skin] of [["travel", "azulejo"], ["travel", "golden"], ["kids", "sticker"], ["kids", "crayon"]]) for (const theme of ["night", "light"]) {
  test(`${fam} · ${skin} · ${theme}: text and states 4.5:1 on every surface`, () => {
    const t = { ...block(`.oq-family-${fam}.oq-${theme}`), ...block(`.oq-family-${fam}.oq-skin-${skin}.oq-${theme}`) };
    for (const s of ["surface-0", "surface-1", "surface-2", "surface-3"]) for (const k of ["ink", "ink-2", "accent", "ok", "warn", "bad", "info"])
      assert.ok(ratio(t[k], t[s]) >= 4.5, `${k} on ${s}: ${ratio(t[k], t[s]).toFixed(2)}`);
    assert.ok(ratio(t["on-accent"], t.accent) >= 4.5, "on-accent");
  });
}
// Coloured icons (2026-10-24): an icon in its data colour, darkened toward ink by --oq-icon-mix, sits on a 15% tint of
// that colour (.ic-tile) or bare on a card or nav island. The glyph has to clear 3:1 on all three.
const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, p) => "#" + hex(a).map((v, i) => Math.round(v * p + hex(b)[i] * (1 - p)).toString(16).padStart(2, "0")).join("");
const pct = (sel, fallback) => { const m = css.match(new RegExp(sel.replace(/\./g, "\\.") + "\\s*\\{([^}]*)\\}")); const v = m && m[1].match(/--oq-icon-mix:\s*([\d.]+)%/); return v ? +v[1] / 100 : fallback; };
for (const [fam, skin] of [["dev"], ["travel"], ["travel", "azulejo"], ["travel", "golden"], ["kids"], ["kids", "sticker"], ["kids", "crayon"], ["money"]]) for (const theme of ["night", "light"]) {
  test(`${fam}${skin ? " · " + skin : ""} · ${theme}: coloured icons 3:1 on their tile, the card and the nav`, () => {
    const t = { ...block(`.oq-root.oq-${theme}`), ...block(`.oq-family-${fam}.oq-${theme}`), ...(skin ? block(`.oq-family-${fam}.oq-skin-${skin}.oq-${theme}`) : {}) };
    let p = pct(`.oq-root.oq-${theme}`, 1); p = pct(`.oq-family-${fam}.oq-${theme}`, p); if (skin) p = pct(`.oq-family-${fam}.oq-skin-${skin}.oq-${theme}`, p);
    for (let i = 1; i <= 6; i++) { const c = t["data-" + i], g = mix(c, t.ink, p);
      for (const [name, bg] of [["tile", mix(c, t["surface-1"], .15)], ["surface-1", t["surface-1"]], ["surface-2", t["surface-2"]]])
        assert.ok(ratio(g, bg) >= 3, `data-${i} icon on ${name}: ${ratio(g, bg).toFixed(2)}`); }
  });
}
// Chips (2026-10-24) have no outline: off = ink-2 on a 6% ink tint, on = ink on a 16% accent tint, on a card or the page. Text 4.5:1.
for (const [fam, skin] of [["dev"], ["travel"], ["travel", "azulejo"], ["travel", "golden"], ["kids"], ["kids", "sticker"], ["kids", "crayon"], ["money"]]) for (const theme of ["night", "light"]) {
  test(`${fam}${skin ? " · " + skin : ""} · ${theme}: chip text 4.5:1 off and on`, () => {
    const t = { ...block(`.oq-root.oq-${theme}`), ...block(`.oq-family-${fam}.oq-${theme}`), ...(skin ? block(`.oq-family-${fam}.oq-skin-${skin}.oq-${theme}`) : {}) };
    for (const s of ["surface-0", "surface-1"]) {
      const off = mix(t.ink, t[s], .06), on = mix(t.accent, t[s], .16);
      assert.ok(ratio(t["ink-2"], off) >= 4.5, `off chip on ${s}: ${ratio(t["ink-2"], off).toFixed(2)}`);
      assert.ok(ratio(t.ink, on) >= 4.5, `on chip on ${s}: ${ratio(t.ink, on).toFixed(2)}`);
    }
  });
}
