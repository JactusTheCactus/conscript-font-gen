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
/**
 * @param {string} name 
 * @param {int[][][]} coords 
 * @param {int} unicode 
 */
function newGlyph(name, coords = [], unicode = null) {
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
{//Glyphs
	newGlyph(".notdef", [], 0);
	{//Punctuation
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
		newGlyph("ellipsis", [
			[
				[0, 0],
				[0, 1000],
				[100, 1000],
				[100, 0]
			],
			[
				[250, 0],
				[250, 1000],
				[350, 1000],
				[350, 0]
			],
			[
				[500, 0],
				[500, 1000],
				[600, 1000],
				[600, 0]
			]
		]);
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
		newGlyph("comma", [
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
				[500, 250],
				[600, 500],
				[600, 250],
				[500, 0]
			]
		], 44);
		newGlyph("question", [
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
				[600, 750],
				[600, 500],
				[500, 750],
				[500, 0]
			]
		], 63);
	}
	{//Majuscule
		newGlyph("A", [], 65);
		newGlyph("B", [], 66);
		newGlyph("C", [
			[
				[600, 0],
				[0, 0],
				[0, 300],
				[500, 300],
				[500, 600],
				[600, 600],
				[600, 200],
				[100, 200],
				[100, 100],
				[600, 100]
			]
		], 67);
		newGlyph("D", [], 68);
		newGlyph("E", [], 69);
		newGlyph("F", [
			[
				[0, 0],
				[0, 600],
				[600, 600],
				[600, 300],
				[100, 300],
				[100, 0]
			],
			[
				[100, 400],
				[500, 400],
				[500, 500],
				[100, 500]
			]
		], 70);
		newGlyph("G", [], 71);
		newGlyph("H", [
			[
				[0, 300],
				[0, 600],
				[600, 600],
				[600, 0],
				[500, 0],
				[500, 500],
				[100, 500],
				[100, 300]
			]
		], 72);
		newGlyph("I", [], 73);
		newGlyph("J", [], 74);
		newGlyph("K", [
			[
				[0, 0],
				[0, 1000],
				[600, 1000],
				[600, 900],
				[100, 900],
				[100, 0]
			]
		], 75);
		newGlyph("L", [
			[
				[0, 0],
				[0, 600],
				[100, 600],
				[500, 400],
				[500, 600],
				[600, 600],
				[600, 300],
				[500, 300],
				[100, 500],
				[100, 0]
			]
		], 76);
		newGlyph("M", [
			[
				[0, 0],
				[250, 600],
				[350, 600],
				[600, 0],
				[500, 0],
				[300, 500],
				[100, 0]
			]
		], 77);
		newGlyph("N", [
			[
				[0, 600],
				[250, 0],
				[350, 0],
				[600, 600],
				[500, 600],
				[300, 100],
				[100, 600]
			]
		], 78);
		newGlyph("O", [], 79);
		newGlyph("P", [
			[
				[0, 0],
				[600, 0],
				[600, 600],
				[0, 600],
				[0, 300],
				[500, 300],
				[500, 100],
				[0, 100]
			],
			[
				[100, 400],
				[100, 500],
				[500, 500],
				[500, 400]
			]
		], 80);
		newGlyph("R", [
			[
				[600, 600],
				[0, 600],
				[0, 500],
				[500, 250],
				[0, 100],
				[0, 0],
				[600,200],
				[600,300],
				[100,500],
				[600,500]
			]
		], 82);
		newGlyph("S", [
			[
				[]
			]
		], 83);
		newGlyph("T", [], 84);
		newGlyph("U", [], 85);
		newGlyph("V", [], 86);
		newGlyph("W", [], 87);
		newGlyph("X", [], 88);
		newGlyph("Y", [], 89);
		newGlyph("Z", [], 90);
	}
	{//Minuscule
		newGlyph("a", [], 97);
		newGlyph("b", [], 98);
		newGlyph("c", [], 99);
		newGlyph("d", [], 100);
		newGlyph("e", [], 101);
		newGlyph("f", [], 102);
		newGlyph("g", [], 103);
		newGlyph("h", [], 104);
		newGlyph("i", [], 105);
		newGlyph("j", [], 106);
		newGlyph("k", [], 107);
		newGlyph("l", [], 108);
		newGlyph("m", [], 109);
		newGlyph("n", [], 110);
		newGlyph("o", [], 111);
		newGlyph("p", [], 112);
		newGlyph("r", [], 114);
		newGlyph("s", [], 115);
		newGlyph("t", [], 116);
		newGlyph("u", [], 117);
		newGlyph("v", [], 118);
		newGlyph("w", [], 119);
		newGlyph("x", [], 120);
		newGlyph("y", [], 121);
		newGlyph("z", [], 122);
	}
};
let stratic = (new opentype.Font({
	familyName: 'Stratic',
	styleName: 'Regular',
	unitsPerEm: 1000,
	ascender: 1200,
	descender: 0,
	glyphs: glyphList
}));
fs.writeFileSync("stratic.otf",
	Buffer.from(stratic.toArrayBuffer())
);