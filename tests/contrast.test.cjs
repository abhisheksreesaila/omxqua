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
