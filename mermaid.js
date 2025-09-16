import { writeToFile } from "./utility.js"
function JSONfmt(object) {
	return JSON.stringify(object, null, "\t")
}
/**
 * 
 * @param {string} node 
 * @param {"leaf"|"branch"} type 
 * @returns 
 */
function newNode(type = "leaf", node = "", children = []) {
	switch (type.toLowerCase()) {
		case "branch": // With children
			return [
				node,
				children
			]
		case "leaf": // No children
			return node
	}
}
function newLanguage(native = "N/A", latin = "", desc = "", reconstructed = false) {
	if (!latin) {
		latin = native
	}
	const prefix = reconstructed ? "*" : "";
	return newNode("branch", prefix + native, [
		`Romanization : ${latin}`,
		`Description : ${desc}`
	])
};
function newCulture(native = "", latin = "", desc = "") {
	return newLanguage(native, latin, desc)
};
const mindmap = {
	"Timeline": {
		"Śraka'ska culture emerges": {
			"Śraka'skik language evolves": {
				"Śraka'ska culture splinters": {
					"The Śra'ta & Kaskada cultures independently invent Śra'tik & Kaskadik writing": {
						"Śra'ta": [
							newNode("leaf", "Śra'ta loses the /ʊ/ sound, merging it into /ə/"),
							newNode("leaf", "The Śra'tik, Having much easier access to stone, write straight shapes, with angles, but no curves")
						],
						"Kaskada": [
							newNode("leaf", "The Kaskada, living in a more wooded area, develop a system that is written along the grain of a tree")
						]
					}
				}
			}
		}
	},
	"Cultures": [
		...newCulture(
			newNode("leaf", "Śraka'ska"),
			newNode("leaf", "Stracasca"),
			newNode("leaf", "The culture that would later become Śra'ta & Kaskada")
		),
		...newCulture(
			newNode("leaf", "Śra'ta"),
			newNode("leaf", "Strata")
		),
		...newCulture(
			newNode("leaf", "Kaskada"),
			newNode("leaf", "Cascada")
		)
	],
	"Languages": [
		...newLanguage(
			newNode("leaf", "Śraka'skik"),
			newNode("leaf", "Stracascic"),
			newNode("leaf", "The reconstructed language & writing of the Śraka'ska people"),
			newNode("leaf", true)
		),
		...newLanguage(
			newNode("leaf", "Śra'tik"),
			newNode("leaf", "Stratic"),
			newNode("leaf", "The language & writing of the Śra'ta people")
		),
		...newLanguage(
			newNode("leaf", "Kaskadik"),
			newNode("leaf", "Cascadic"),
			newNode("leaf", "The language & writing of the Kaskada people")
		)
	]
};
const output = [
	":::mermaid",
	"mindmap",
	"((*))",
	JSONfmt(mindmap),
	":::"
].join("\n")
	.replace(/[{}\[\]]/g, "")
	.replace(/^(\s*)"(.*?)":\s*$/gm, "$1$2")
	.replace(/^(\s*)"(.*?)": "(.*?)",?$/gm, "$1$2: $3")
	.replace(/^(\s*)(.*?): ,?$/gm, "")
	.replace(/^(\s*)"(.*?)",?$/gm, "$1$2")
	.replace(/\n[\s,]*\n/g, "\n")
	.normalize();
writeToFile("mermaid.md", "o", output);