// omxqua must work under a strict CSP (default-src 'self'): the script injects no styles; panel buttons can be flat.
// Run: node --test tests/
const test = require("node:test"), assert = require("node:assert");
const read = f => require("fs").readFileSync(require("path").join(__dirname, "..", f), "utf8");
test("omxqua.js injects no <style> and no inline style text", () => {
  const js = read("src/omxqua.js");
  assert.ok(!/createElement\(\s*["']style["']\s*\)/.test(js), "createElement('style')");
  assert.ok(!/<style/i.test(js), "a <style> string");
  assert.ok(!/cssText|setAttribute\(\s*["']style["']/.test(js), "inline style text");
});
test("the logo's rules live in components.css", () => {
  const css = read("src/components.css");
  assert.match(css, /\.oq-logo text\s*\{[^}]*stroke-dasharray:\s*120/);
});
test(".oq-flat makes panel buttons flat", () => {
  const css = read("src/components.css");
  assert.match(css, /\.oq-flat \.btn\.fill, :where\(\.oq-root\) \.oq-flat \.btn\.tonal \{ box-shadow: none; \}/);
  assert.match(css, /\.oq-flat \.btn\.fill:hover \{ box-shadow: none; transform: none; \}/);
});
