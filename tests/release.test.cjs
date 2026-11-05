// A release is one version everywhere: the plugin, the marketplace entry, every @vX.Y.Z pin people copy, and the changelog.
// (v0.1.5 was pinned in the skill and README but never tagged, so the jsDelivr links 404'd.)
// After a release commit, tag it: git tag vX.Y.Z && git push origin vX.Y.Z. Run: node --test tests/
const test = require("node:test"), assert = require("node:assert");
const read = f => require("fs").readFileSync(require("path").join(__dirname, "..", f), "utf8");
const version = JSON.parse(read(".claude-plugin/plugin.json")).version;

test("the marketplace entry matches the plugin version", () => {
  const m = JSON.parse(read(".claude-plugin/marketplace.json"));
  assert.strictEqual(m.plugins[0].version, version);
});
for (const f of ["README.md", "skills/omxqua/SKILL.md"]) {
  test(`every pinned version in ${f} is v${version}`, () => {
    const pins = [...read(f).matchAll(/(?:omxqua@|--ref )v(\d+\.\d+\.\d+)/g)].map(m => m[1]);
    assert.ok(pins.length, "no pins found");
    assert.deepStrictEqual([...new Set(pins)], [version]);
  });
}
test("the changelog has a section for this version", () => {
  assert.match(read("CHANGELOG.md"), new RegExp(`^## v${version.replace(/\./g, "\\.")} · \\d{4}-\\d{2}-\\d{2}`, "m"));
});
