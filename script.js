const C = "Consonant";
const nC = ["Null",C].join(" ");// Consonant symbol with no phonetic meaning. Only used when a consonant GLYPH is necessary, but the PHONEME is not
const V = "Vowel";
const CV = [C,V].join("+");
const nCV = [nC,V].join("+");
const LtR = [
	"Left",
	"Right"
].join("-to-");
const TtB = [
	"Top",
	"Bottom"
].join("-to-");
class Neography {
	constructor(
		n = "NEO_NAME",
		T = "NEO_TYPE",
		d = "NEO_DIR",
		l = "NEO_LANG",
		t = ["NEO_VAR_TYPES"],
		p = ["NEO_VAR_POS"],
		g = ["NEO_GLYPHS"]
	) {
		this.name = n;
		this.type = T;
		this.direction = d;
		this.language = l;
		this.variants = {
			types: t,
			positions: p
		};
		this.glyphs = g;
	}
};
let struct = [];
struct.push(new Neography(
	"Stratic",
	"Abugida",
	LtR,
	"en-CA",
	[
		C,
		CV,
		nCV
	],
	["solo"],
	[
		"A B C D Ð", // A B C D Eth
		"E É F G H", // E EACUTE F G H
		"I Í J K L", // I IACUTE J K L
		"M N Ŋ O Ó", // M N ENG O OACUTE
		"P R S Ś T", // P R S ESH T
		"Þ U Ú V W", // THORN U UACUTE V W
		"X Y Z Ź" // X Y Z ZHED
	].join(" ").split(" ")
))
struct.push(new Neography(
	"Cascadic",
	"Alphabet",
	TtB,
	"en-CA",
	[C,V],
	"solo init medi fina".split(" "),
	[
		"A B C D Ð", // A B C D ETH
		"E É F G H", // E EACUTE F G H
		"I Í J K L", // I IACUTE J K L
		"M N Ŋ O Ó", // M N ENG O OACUTE
		"P R S Ś T", // P R S ESH T
		"Þ U Ú Ǔ V", // THORN U UACUTE UHACEK V
		"W Y Z Ź" // W Y Z ZHED
	].join(" ").split(" ")
));