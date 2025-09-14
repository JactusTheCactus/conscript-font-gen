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
}
const stratic = (new opentype.Font({
	familyName: 'Stratic',
	styleName: 'Regular',
	unitsPerEm: 1000,
	ascender: 600,
	descender: 0,
	glyphs: [
		(new opentype.Glyph({
			name: '.notdef',
			unicode:0,
			advanceWidth: 600,
			path: (new GlyphPath())
		})),
		(new opentype.Glyph({
			name: 'space',
			unicode: 32,
			advanceWidth: 600,
			path: (new GlyphPath())
				.moveTo(250, 0)
				.lineTo(250, 1000)
				.lineTo(350, 1000)
				.lineTo(350, 0)
		})),
		(new opentype.Glyph({
			name: 'dash',
			unicode: 45,
			advanceWidth: 600,
			path: (new GlyphPath())
				.moveTo(250, 0)
				.lineTo(250, 1000)
				.lineTo(350, 1000)
				.lineTo(350, 0)
		})),
		(new opentype.Glyph({
			name: 'k',
			unicode: 107,
			advanceWidth: 600,
			path: (new GlyphPath())
				.moveTo(0, 0)
				.lineTo(0, 1000)
				.lineTo(600, 1000)
				.lineTo(600, 900)
				.lineTo(100, 900)
				.lineTo(100, 0)
		}))
	]
}));
fs.writeFileSync("stratic.otf",
	Buffer.from(stratic.toArrayBuffer())
);
//(async () => {})();