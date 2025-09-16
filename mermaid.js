import { writeToFile } from "./utility.js"
function JSONfmt(object) {
	return JSON.stringify(object, null, "\t")
}
function newNode(node = "", type = "leaf") {
	switch (type) {
		case "branch": // With children
			// Not yet implemented, so is currently identical to a Leaf
			return node
		case "leaf": // No children
			return node
	}
}
function newLanguage(native = "N/A", latin = "", desc = "", reconstructed = false) {
	if (!latin) {
		latin = native
	}
	const prefix = reconstructed ? "*" : "";
	return {
		[prefix + native]: {
			Romanization: latin,
			Description: desc
		}
	}
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
							"Śra'ta loses the /ʊ/ sound, merging it into /ə/",
							"The Śra'tik, Having much easier access to stone, write straight shapes, with angles, but no curves"
						],
						"Kaskada": [
							newNode("The Kaskada, living in a more wooded area, develop a system that is written along the grain of a tree", "leaf")
						]
					}
				}
			}
		}
	},
	"Cultures": {
		...newCulture(
			"Śraka'ska",
			"Stracasca",
			"The culture that would later become Śra'ta & Kaskada"
		),
		...newCulture(
			"Śra'ta",
			"Strata"
		),
		...newCulture(
			"Kaskada",
			"Cascada"
		)
	},
	"Languages": {
		...newLanguage(
			"Śraka'skik",
			"Stracascic",
			"The reconstructed language & writing of the Śraka'ska people",
			true
		),
		...newLanguage(
			"Śra'tik",
			"Stratic",
			"The language & writing of the Śra'ta people"
		),
		...newLanguage(
			"Kaskadik",
			"Cascadic",
			"The language & writing of the Kaskada people"
		)
	}
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