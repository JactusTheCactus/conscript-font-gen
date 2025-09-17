import { writeToFile } from "./utility.js"
String.prototype.upper = function () { return this.toUpperCase() }
String.prototype.lower = function () { return this.toLowerCase() }
String.prototype.capitalize = function () {
	if (this.length) {
		if (this.length > 1) {
			return [
				this[0].upper(),
				this.slice(1).lower()
			].join("")
		} else {
			return this.upper()
		}
	} else {
		return ""
	}
}
function JSONfmt(object) { return JSON.stringify(object, null, "\t") }
function newNode(label = "", children = []) { return { label, children } }
function newLeaf(label, data) { return [label, data].join(" : ") }
function newLanguage(native = "N/A", latin = "", desc = "", reconstructed = false) {
	return newNode((reconstructed ? "*" : "") + native, [
		latin ? newLeaf("Romanized", latin) : "",
		desc ? newLeaf("Description", desc) : ""
	])
};
function newCulture(native = "", latin = "", religion = [], desc = "", additional = []) {
	return newNode(native, [
		latin ? newLeaf("Romanized", latin) : "",
		religion ? (
			"Followers of "
			+ (
				(religion.length > 1)
					? `${religion.slice(0, -1).join(", ")} & ${religion.at(-1)}`
					: religion[0]
			)
		)
			: "",
		desc ? newLeaf("Description", desc) : "",
		...additional.map(i => `${i}`)
	])
};
function newDeity(
	name = "",
	sex = false,
	domains = [],
	relations = {},
	children = [],
	extra = []
) {
	return newNode(name, [
		domains?.length ? `God${!sex ? "dess" : ""} of ${join(...domains)}` : "",
		...Object.entries(relations).map(([k, v]) => {
			return [k, String(v)]
				.map(i => i.capitalize())
				.join(" of ")
		}),
		...children,
		...extra
	])
}
function treeToText(node, depth = 0) {
	const indent = '\t'.repeat(depth);
	let result = indent + (typeof node === "string" ? node : node.label) + "\n";
	if (typeof node !== "string" && node.children) {
		for (const child of node.children) {
			result += treeToText(child, depth + 1);
		}
	}
	result = result
		.replace(/^\s*.*? : $/gm, "")
		.replace(/\n\s*\n/g, "\n")
	if (depth === 0) {
		result = result.trim()
	}
	return result;
}
function join(...arr) {
	const joinMain = ", ";
	const joinLast = " & ";
	if (arr.length > 1) {
		return [
			arr.slice(0, -1).join(joinMain),
			arr.at(-1)
		].join(joinLast)
	}
	return arr.join()
}
function comma(...arr) {
	const joiner = ", ";
	if (arr.length > 1) {
		return arr.join(joiner)
	}
	return arr.join()
}
function arraysToObjects(input) {
	if (Array.isArray(input)) {
		return Object.fromEntries(input.map((v, i) => {
			return [
				i,
				arraysToObjects(v)
			]
		}));
	} else if (input && typeof input === "object") {
		return Object.fromEntries(
			Object.entries(input).map(([k, v]) => {
				return [
					k,
					arraysToObjects(v)
				]
			})
		);
	} else {
		return input;
	}
}
const [acute, hacek, edh, eng, thorn] = ["\u0301", "\u030c", "\u00d0", "\u014a", "\u00de"].map(i => i.lower());
const lidin = `Li'${edh}in`;
const dodur = `Do'${edh}ur`;
const timur = `Ti${acute}mur`;
const doliti = `Do'liti${acute}`;
const [M, F, N] = [true, false, null];
/**
 * @typedef {{label:string,children:Array<Node>}} Node
 * @param {string} name 
 * @param {M|F|N} sex 
 * @param {string|Array<string>} domain 
 * @param {Array<Node>} children 
 * @returns {Node}
 */
function newDeityNode(name, sex, domain, children = []) {
	if (Array.isArray(domain)) {
		domain = join(domain)
	}
	domain = [true, false].includes(sex)
		? `God${!sex ? "dess" : ""} of ${domain}`
		: `${domain}`;
	domain = domain
		.replace(/&/g, "#38;");
	let title = [
		`**${name.capitalize()}**`,
		`*${domain}*`
	].join("<br>");
	if (children.length === 0) {
		title = `(${title})`
	}
	return newNode(title, children)
}
const mindmap = newNode("((*))", [
	newNode("Timeline", [
		newNode(`S${acute}raka'ska culture emerges`, [
			newNode(`S${acute}raka'skik language evolves`, [
				newNode(`S${acute}raka'ska culture gradually splits into ${join(
					`S${acute}ra'ta`,
					"Kaskada"
				)}`, [
					newNode(`The ${join(
						`S${acute}ra'ta`,
						"Kaskada"
					)} cultures independently invent ${join(
						`S${acute}ra'tik`,
						"Kaskadik"
					)} writing`, [
						newNode(`S${acute}ra'ta`, [
							comma(
								`S${acute}ra'ta loses the /ʊ/ sound`,
								"merging it into /ə/"
							),
							comma(
								`The S${acute}ra'tik`,
								"Having much easier access to stone",
								"write straight shapes",
								"with angles, but no curves"
							)
						]),
						newNode("Kaskada", [
							comma(
								"The Kaskada",
								"living in a more wooded area",
								"develop a system that is written along the grain of a tree"
							)
						])
					])
				])
			])
		])
	]),
	newNode("Cultures", [
		newCulture(`S${acute}raka'ska`,
			"Stracasca",
			[dodur, lidin, timur],
			`The culture that would later become ${join(
				`S${acute}ra'ta`,
				"Kaskada"
			)}`
		),
		newCulture(`S${acute}ra'ta`,
			"Strata",
			[dodur, timur]
		),
		newCulture("Kaskada",
			"Cascada",
			[lidin, timur]
		)
	]),
	newNode("Languages", [
		newLanguage(`S${acute}raka'skik`,
			"Stracascic",
			`The reconstructed ${join(
				"language",
				"writing"
			)} of the S${acute}raka'ska people`,
			true
		),
		newLanguage(`S${acute}ra'tik`,
			"Stratic",
			`The ${join(
				"language",
				"writing"
			)} of the S${acute}ra'ta people`
		),
		newLanguage("Kaskadik",
			"Cascadic",
			`The ${join(
				"language",
				"writing"
			)} of the Kaskada people`
		)
	]),
	newNode("Deities", [
		newDeity(dodur, true,
			[
				"Death",
				"Destruction",
				"Decay"
			],
			{
				husband: lidin,
				forefather: 17
			}
		),
		newDeity(lidin, false,
			[
				"Life",
				"Creation",
				"Growth"
			],
			{
				wife: dodur,
				sister: timur,
				foremother: 34
			}
		),
		newDeity(timur, true,
			[
				"Time",
				"Fate",
				"Destiny"
			],
			{
				brother: lidin,
				forefather: 3
			}
		),
		newDeity(`The ${doliti}`, null,
			[],
			{},
			[],
			[
				`The pantheon containing ${join(
					dodur,
					lidin,
					timur,
					"their descendants"
				)}`
			]
		)
	]),
	newNode("Genealogy", [
		newDeityNode(`Li'${edh}in`, F, "Life", [
			newDeityNode("E'ldur", M, "Energy", [
				newDeityNode(`Do${acute}'rin`, F, "Creatures", [
					newDeityNode(`Ski'mz${acute}ur`, M, "Monsters", [
						newDeityNode("O'ditur", M, "Undead"),
						newDeityNode(`Pu${acute}'kin`, F, "Demons")
					]),
					newDeityNode("Dyu'r", M, "Animals", [
						newDeityNode("Do'lin", F, "AirAnimals"),
						newDeityNode(`Yo${acute}'rdin`, F, "LandAnimals"),
						newDeityNode(`S${acute}o${acute}'dur`, M, "SeaAnimals")
					])
				]),
				newDeityNode("Ga'ldin", F, "Magic", [
					newDeityNode("O'pfin", F, "Invention", [
						newDeityNode(`Gre${acute}'ndur`, M, "Intelligence"),
						newDeityNode("Sko'pkin", F, "Creativity")
					]),
					newDeityNode("O'nlegur", M, "Construction", [
						newDeityNode(`S${thorn}i'nur`, M, "Carpentry"),
						newDeityNode("A'rktin", F, "Architecture")
					])
				])
			]),
			newDeityNode(`Bra'${edh}ur`, M, "Fire", [
				newDeityNode(`Stri${acute}${edh}ur`, M, "War", [
					newDeityNode(`Ekspre'${eng}ur`, M, "Explosives", [
						newDeityNode("Bi'sur", M, "Firearms"),
						newDeityNode(`Spri'${eng}ur`, M, "Bombs")
					]),
					newDeityNode("Stre'fnur", M, "Strategy", [
						newDeityNode("Ka'rtlin", F, "Cartography"),
						newDeityNode("No'kvur", M, "Precision")
					])
				]),
				newDeityNode(`Fo${acute}'rmur`, M, "Warmth")
			]),
			newDeityNode("Va'din", F, "Water", [
				newDeityNode(`Fri'${edh}in`, F, "Peace", [
					newDeityNode("La'kbin", F, "Healing", [
						newDeityNode(`Sku'r${edh}in`, F, "Surgery"),
						newDeityNode("Me'cur", M, "Medicine")
					]),
					newDeityNode("Ko'gur", M, "Art", [
						newDeityNode("Ri'stilin", F, "Carving"),
						newDeityNode(`Mo${acute}'lin`, F, "Paint")
					])
				]),
				newDeityNode("Fu'rlin", F, "Travel")
			])
		]),
		newDeityNode(`Do'${edh}ur`, M, "Death", [
			newDeityNode(`Yo${acute}'dur`, M, "Earth", [
				newDeityNode("Fye'lur", M, "Mountains", [
					newDeityNode("Fe'lkilur", M, "Volcanoes", [
						newDeityNode("Ra'vin", F, "Lava"),
						newDeityNode(`Brai${acute}'nur`, M, "Burning")
					]),
					newDeityNode(`He${acute}'lin`, F, "Caves", [
						newDeityNode("Fre'kur", M, "Fear"),
						newDeityNode("Pu'rlin", F, "Wealth")
					])
				]),
				newDeityNode("Ke'nur", M, ["Canyons", "Cliffs"])
			]),
			newDeityNode(`Lu${acute}'din`, F, "Air", [
				newDeityNode("Pa'tin", F, "Plants", [
					newDeityNode(`Go${acute}lge'min`, F, "Alchemy", [
						newDeityNode("Ku'fnur", M, "Artifacts"),
						newDeityNode(`Pi${acute}'kin`, F, "Potions")
					]),
					newDeityNode("Efki'min", F, "Chemistry", [
						newDeityNode(`Si${acute}'rilur`, M, "Acids"),
						newDeityNode(`U'pgo${edh}in`, F, "Discovery")
					])
				])
			])
		]),
		newDeityNode(`Ti${acute}'mur`, M, "Time", [
			newDeityNode("Kwe'lin", N, "Weaver of Fate"),
			newDeityNode("Ha'din", N, "Writer of Fate"),
			newDeityNode("Ne'tur", N, "Trimmer of Fate")
		])
	])
]);
writeToFile("log.json", "o", JSONfmt(
	arraysToObjects(
		mindmap
			.children
			.at(-1)
			.children
	)
))
writeToFile("mermaid.md", "o",
	mindmap.children.map(i => {
		const title = i.label;
		const tree = i.children;
		return [
			`# ${title}`,
			":::mermaid",
			"mindmap",
			treeToText(newNode("((*))", tree)),
			":::"
		]
			.join("\n")
	})
		.filter(Boolean)
		.join("\n")
		.normalize("NFKC")
);