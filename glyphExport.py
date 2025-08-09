import fontforge
import os

def exportGlyphs(parent: str, file: str, size: int, types: list[str]):
	PARENT_DIR = os.path.join(parent)
	FONT_FILE = os.path.join(PARENT_DIR,file)
	OUTPUT_DIR = os.path.join(PARENT_DIR,"exports")
	PNG_SIZE = size
	font = fontforge.open(FONT_FILE)
	for glyph in font.glyphs():
		if glyph.isWorthOutputting():
			name = glyph.glyphname
			if all([
				len(name) > 1,
				name not in [
					"edh",
					"eng",
					"esh",
					"thorn",
					"zhed"
				] + [f"{x}acute" for x in "e i o u".split()]
			]):
				nameList = name.split("_")
				for n in range(len(nameList)):
					if nameList[n][0] == ".":
						nameList[n] = f".{nameList[n][1:].capitalize()}"
					else:
						nameList[n] = f"{nameList[n][0].upper()}{nameList[n][1:]}"
				name = "_".join(nameList)
				print(name)
				for ext in types:
					os.makedirs(os.path.join(OUTPUT_DIR, ext), exist_ok=True)
					if ext == "png":
						glyph.export(os.path.join(OUTPUT_DIR, ext, f"{name}.{ext}"), PNG_SIZE)
					else:
						glyph.export(os.path.join(OUTPUT_DIR, ext, f"{name}.{ext}"))
exportGlyphs(
	"AbugidaR",
	"abugidaR-lig.sfd",
	512,
	[
		#"png",
		"svg"
	]
)