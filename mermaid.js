import { writeToFile } from "./utility.js"
function JSONfmt(object) {
	return JSON.stringify(object, null, "\t")
}
function newNode(label = "", children = []) {
	return { label, children }
}
function newLanguage(native = "N/A", latin = "", desc = "", reconstructed = false) {
	if (!latin) {
		latin = native
	}
	const prefix = reconstructed ? "*" : "";
	return newNode(prefix + native, [
		`Romanization : ${latin}`,
		`Description : ${desc}`
	])
};
function newCulture(native = "", latin = "", desc = "") {
	return newLanguage(native, latin, desc)
};
function treeToText(node, depth = 0) {
	const indent = '\t'.repeat(depth);
	let result = indent + (typeof node === "string" ? node : node.label) + "\n";
	if (typeof node !== "string" && node.children) {
		for (const child of node.children) {
			result += treeToText(child, depth + 1);
		}
	}
	return result;
}
const mindmap = newNode("((*))", [
	newNode("Timeline", [
		newNode("Śraka'ska culture emerges", [
			newNode("Śraka'skik language evolves", [
				newNode("Śraka'ska culture splinters", [
					newNode("The Śra'ta & Kaskada cultures independently invent Śra'tik & Kaskadik writing", [
						newNode("Śra'ta", [
							"Śra'ta loses the /ʊ/ sound, merging it into /ə/",
							"The Śra'tik, Having much easier access to stone, write straight shapes, with angles, but no curves"
						]),
						newNode("Kaskada", [
							"The Kaskada, living in a more wooded area, develop a system that is written along the grain of a tree"
						])
					])
				])
			])
		])
	]),
	newNode("Cultures", [
		newCulture(
			"Śraka'ska",
			"Stracasca",
			"The culture that would later become Śra'ta & Kaskada"
		),
		newCulture(
			"Śra'ta",
			"Strata"
		),
		newCulture(
			"Kaskada",
			"Cascada"
		)
	]),
	newNode("Languages", [
		newLanguage(
			"Śraka'skik",
			"Stracascic",
			"The reconstructed language & writing of the Śraka'ska people",
			true
		),
		newLanguage(
			"Śra'tik",
			"Stratic",
			"The language & writing of the Śra'ta people"
		),
		newLanguage(
			"Kaskadik",
			"Cascadic",
			"The language & writing of the Kaskada people"
		)
	])
]);
const output = [
	":::mermaid",
	"mindmap",
	treeToText(mindmap).trim(),
	":::"
].join("\n")
	.normalize();
writeToFile("mermaid.md", "o", output);
writeToFile("mermaid.json", "o", JSONfmt(mindmap));