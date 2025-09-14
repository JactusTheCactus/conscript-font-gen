import fs from "fs";
import opentype from "opentype.js";
class GlyphPath extends opentype.Path {
	moveTo(x, y) {
		super.moveTo(x, y);
		return this;
	}
	lineTo(x, y) {
		super.lineTo(x, y);
		return this;
	}
};
const glyphList = [];
function newGlyph(name, coords, unicode = null) {
	const path = new GlyphPath();
	const padding = 100;
	if (coords.length) {
		coords.forEach(poly => {
			poly.map(([x, y]) => {
				x += padding
			})
			path.moveTo(...poly[0]);
			for (let i = 1; i < poly.length; i++) {
				path.lineTo(...poly[i]);
			}
			path.closePath();
		})
	};
	glyphList.push(new opentype.Glyph({
		name: name,
		unicode: unicode,
		advanceWidth: 600 + (padding * 2),
		path: path
	}))
};
newGlyph(".notdef", [], 0);
newGlyph("space", [
	[
		[250, 0],
		[250, 1000],
		[350, 1000],
		[350, 0]
	]
], 32);
newGlyph("stop", [
	[
		[100, 0],
		[100, 1000],
		[200, 1000],
		[200, 0]
	],
	[
		[400, 0],
		[400, 1000],
		[500, 1000],
		[500, 0]
	]
], 46);
newGlyph("dash", [
	[
		[0, 0],
		[0, 1000],
		[100, 1000],
		[100, 550],
		[500, 550],
		[500, 1000],
		[600, 1000],
		[600, 0],
		[500, 0],
		[500, 450],
		[100, 450],
		[100, 0]
	]
], 45);
/*newGlyph("k", [
	[
		[0, 0],
		[0, 1000],
		[600, 1000],
		[600, 900],
		[100, 900],
		[100, 0]
	]
], 107);*/
let stratic = (new opentype.Font({
	familyName: 'Stratic',
	styleName: 'Regular',
	unitsPerEm: 1000,
	ascender: 1000,
	descender: 0,
	glyphs: glyphList
}));
// console.log(stratic.glyphs.glyphs);
fs.writeFileSync("stratic.otf",
	Buffer.from(stratic.toArrayBuffer())
);