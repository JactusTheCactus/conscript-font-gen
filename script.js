import { writeToFile } from "./openTypeJS/utility.js";
const acute = "\u0301";
const hacek = "\u030c";
const blank = "\u25cc";
const char = {
	d: "\u00d0",
	e: `E${acute}`,
	i: `I${acute}`,
	n: "\u014a",
	o: `O${acute}`,
	s: `S${acute}`,
	t: "\u00de",
	u1: `U${acute}`,
	u2: `U${hacek}`,
	z: `Z${acute}`
};
const C = "Consonant";
/**
 * @param {string} nC
 * Consonant symbol with no phonetic meaning
 * Only used when a consonant **GLYPH** is necessary, but the **PHONEME** is not
 */
const nC = `Null ${C}`;
const V = "Vowel";
const CV = `${C} + ${V}`;
const nCV = `${nC} + ${V}`;
function aToB(a, b) {
	return [
		a,
		b
	].join("-to-")
};
const LtR = aToB(
	"Left",
	"Right"
);
const TtB = aToB(
	"Top",
	"Bottom"
);
class Neography {
	/**
	 * @class A neography
	 * @param {string} n Neography name
	 * @param {string} T Script type
	 * @param {string} d Writing direction
	 * @param {string} l Language
	 * @param {*} p Punctuation
	 * @param {string[]} t Different glyph types
	 * @param {string[]} P Glyph positional variants
	 * @param {string[]} g Glyphs
	 */
	constructor(
		n = "NEO_NAME",
		T = "NEO_TYPE",
		d = "NEO_DIR",
		l = "NEO_LANG",
		p = ["NEO_PUNC"],
		t = ["NEO_VAR_TYPES"],
		P = ["NEO_VAR_POS"],
		g = ["NEO_GLYPHS"]
	) {
		this.name = n;
		this.type = T;
		this.direction = d;
		this.language = l;
		this.punctuation = p;
		this.variants = {
			types: t,
			positions: P
		};
		this.glyphs = g;
	}
	getData() {
		return {
			name: this.name,
			type: this.type,
			direction: this.direction,
			language: this.language,
			punctuation: this.punctuation,
			variants: {
				types: this.variants.types,
				positions: this.variants.positions
			},
			glyphs: this.glyphs
		}
	}
};
const struct = [];
struct.push(new Neography(
	"Stratic",
	"Abugida",
	LtR,
	"en-CA",
	[
		"Space ( )",
		"Stop (.)",
		"Ellipsis (...)",
		"Comma (,)",
		"Question (?)",
		"Emphasis (')"
	],
	[C, CV, nCV],
	["solo"],
	`
	A			B			C			D			${char.d}
	E			${char.e}	F			G			H
	I			${char.i}	J			K			L
	M			N			${char.n}	O			${char.o}
	P			R			S			${char.s}	T
	${char.t}	U			${char.u1}	V			W
	X			Y			Z			${char.z}
	`.trim().split(/\s+/)
))
struct.push(new Neography(
	"Cascadic",
	"Alphabet",
	TtB,
	"en-CA",
	[
		"Space ( )",
		"Stop (.)",
		"Ellipsis (...)",
		"Comma (,)",
		"Question (?)"
	],
	[C, V],
	["solo", "init", "medi", "fina"],
	`
	A			B			C			D			${char.d}
	E			${char.e}	F			G			H
	I			${char.i}	J			K			L
	M			N			${char.n}	O			${char.o}
	P			R			S			${char.s}	T
	${char.t}	U			${char.u1}	${char.u2}	V
	W			Y			Z			${char.z}
	`.trim().split(/\s+/)
));
struct.forEach(i => {
	writeToFile(`neo_${i.name}.json`, "o", JSON.stringify(i.getData()))
});