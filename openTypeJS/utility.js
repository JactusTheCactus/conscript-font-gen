import fs from 'fs/promises';
import path from 'path';
/**
 * @async
 * @param {String} filePath
 * @returns {Object} The contents of the JSON at `filePath`
 */
async function readJSON(filePath) {
	try {
		const fullPath = path.resolve(filePath);
		const data = await fs.readFile(fullPath, 'utf-8');
		return JSON.parse(data);
	} catch (err) {
		console.error('Error reading JSON file:', err);
		throw err;
	}
};
/**
 * @async
 * @param {path} filePath
 * @param {string} type
 * `o`:`overwrite`\
 * `a`:`append`\
 * to the file
 *
 * _(case-insensitive)_
 * @param {string} content the string to write to the file
*/
async function writeToFile(filePath, type, content) {
	type = type[0].toLowerCase();
	try {
		const fullPath = path.resolve(filePath);
		if (type === "o") {
			await fs.writeFile(fullPath, content, 'utf-8')
		} else if (type === "a") {
			await fs.appendFile(fullPath, content, 'utf-8')
		}
	} catch (err) {
		console.error('Error writing to file:', err);
		throw err;
	}
};
/**
 * ```
 * Glyph("ID",[
 * 	[x1,y1],
 * 	[x2,y2]
 * ])
 * ```
 * @param id
 * The ID of the glyph
 * @param points
 * A tuple array of the coordinates for each vector point in the glyph
 */
class Glyph {
	constructor(
		id = "",
		points = [
			[0, 0]
		]
	) {
		this.id = id;
		this.points = points
	}

};
export {
	readJSON,
	writeToFile,
	Glyph
};