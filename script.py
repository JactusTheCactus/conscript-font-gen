import fontforge, json, re, os, shutil
def flattenList(inputList):
	return [item for sublist in inputList for item in sublist]
def exportGlyphs(folder: str):
	FONT_FILE = os.path.join(folder,f"{folder}-{'lig' if os.path.exists(os.path.join(folder,f"{folder}-lig.sfd")) else 'main'}.sfd")
	if not os.path.exists(FONT_FILE):
		print(f";-;\t{FONT_FILE} does not exist")
		return
	OUTPUT_DIR = os.path.join(folder,"exports")
	shutil.rmtree(OUTPUT_DIR, ignore_errors=True)
	os.makedirs(OUTPUT_DIR)
	font = fontforge.open(FONT_FILE)
	for glyph in filter(bool, [
		g for g in font.glyphs()
		if
			g.isWorthOutputting()
			and not re.match(r".*_Emphasis",g.glyphname, re.I)
	]):
		assert glyph is not None
		name = glyph.glyphname
		if all([
			len(name) > (1 if folder == "AbugidaR" else 0),
			name not in "edh eng esh thorn zhed".split() + [f"{x}acute" for x in "e i o u".split()]
		]):
			nameList = name.split("_")
			for n in range(len(nameList)):
				try:
					if nameList[n][0] == ".":
						nameList[n] = f".{nameList[n][1:].capitalize()}"
					else:
						nameList[n] = f"{nameList[n][0].upper()}{nameList[n][1:]}"
				except:
					nameList[n] = f"_{nameList[n][1:].capitalize()}"
			name = "_".join(nameList).replace("__","_")
			#print(name)
			glyph.export(os.path.join(OUTPUT_DIR, f"{name}.svg"))
def genFont(s):
	if not s:
		print(f"genFont():\n\tInvalid Input <{s}>")
	elif s == "AbugidaR":
		font = fontforge.open(os.path.join(s,f"{s}-main.sfd"))
		consonants = "B C D Edh F G H J K L M N Eng P R S Esh T Thorn V W X Y Z Zhed".split()
		vowels = "A E Eacute I Iacute O Oacute U Uacute".split()
		punctuation = "period comma space hyphen question ellipsis start special emphasis".split()
		letters = consonants + vowels
		nonC = punctuation + vowels
		nonV = punctuation + consonants
		lvn =	"E		I		O		U		D	N	S	T		Z	".split()
		lvy =	"Eacute	Iacute	Oacute	Uacute	Edh	Eng	Esh	Thorn	Zhed".split()
		liga = [
			"languagesystem DFLT dflt;",
			"languagesystem latn dflt;"
		]
		liga.append("feature liga {")
		if True:
			for l in letters:
				liga.append(f"\tsub {l.lower()} by {l};")
			for l in range(len(punctuation)):
				liga.append(f"\tsub {lvn[l]} special by {lvy[l]};")
			for p in punctuation:
				for v in vowels + ["emphasis"]:
					liga.append(f"\tsub {p} {v}' by X {v};")
			for non in nonV:
				liga.append(f"\tsub start {non} by {non};")
			for v1 in vowels:
				for v2 in vowels:
					liga.append(f"\tsub {v1} {v2}' by X {v2};")
			for c in consonants:
				for v in vowels:
					liga.append(f"\tsub {c} {v} by {'_'.join([c, v])};")
					liga.append(f"\tsub {c} {v} emphasis by {'_'.join([c, v, 'emphasis'])};")
				liga.append(f"\tsub {c} emphasis by {'_'.join([c, 'emphasis'])};")
			for p1 in punctuation:
				for p2 in punctuation:
					liga.append(f"\tsub {p1} {p2} by {p1};")
			for p in punctuation:
				liga.append(f"\tsub {p} space by {p};")
				liga.append(f"\tsub space {p} by {p};")
			liga.append(f"\tsub period period period by ellipsis;")
		liga.append("} liga;")
		liga = "\n".join(liga)
		with open(os.path.join(s,"features.fea"),"w") as f:
			f.write(liga)
		for e in ["emphasis", ""]:
			for c in consonants:
				if c not in font:
					print(c, "does not exist")
				else:
					for v in vowels + [""]:
						lig_name = "_".join(filter(bool, [c, v, e]))
						if e or v:
							try:
								lig = font.createChar(-1, lig_name)
								c_glyph = font[c]
								lig.clear()
								lig.addReference(c, (1, 0, 0, 1, 0, 0))
								if v:
									v_glyph = font[v]
									v_dx = (c_glyph.width - v_glyph.width) / 2
									lig.addReference(v, (1, 0, 0, 1, v_dx, 0))
								if e:
									e_glyph = font[e]
									e_dx = (c_glyph.width - e_glyph.width) / 2
									lig.addReference(e, (1, 0, 0, 1, e_dx, 0))
								lig.width = c_glyph.width
								lig.build()
							except:
								print(f"Failed to build ligature <{lig_name}>")
		set = ["X","emphasis"]
		lig_name = "_".join(filter(bool, set))
		lig = font.createChar(-1, lig_name)
		c_glyph = font["X"]
		v_glyph = font["emphasis"]
		dx = (c_glyph.width - v_glyph.width) / 2
		lig.clear()
		lig.addReference("X", (1, 0, 0, 1, 0, 0))
		lig.addReference("emphasis", (1, 0, 0, 1, dx, 0))
		lig.width = c_glyph.width
		lig.build()
		font.mergeFeature(os.path.join(s,"features.fea"))
		sideBearing = 75
		glyphList = []
		for glyph in font.glyphs():
			if glyph.isWorthOutputting():
				glyph.unlinkRef()
				glyphList.append(glyph)
		for glyph in glyphList:
			width = glyph.width
			glyph.left_side_bearing = sideBearing
			glyph.right_side_bearing = sideBearing
			glyph.width = int(width + (sideBearing * 2))
		font.save(os.path.join(s,"AbugidaR-lig.sfd"))
		font.generate(os.path.join(s,"AbugidaR.otf"))
	elif s == "AlphabetD":
		font = fontforge.open(os.path.join(s,f"{s}-main.sfd"))
		letters = sorted(flattenList([
			"	A	B	C	D	Ð	E	É	F	G	H	".split(),
			"	I	Í	J	K	L	M	N	Ŋ	O	Ó	".split(),
			"	P	R	S	Ś	T	Þ	U	Ú	Ű	V	".split(),
			"	W	Y	Z	Ź							".split()
		]))
		baseLetters = sorted(flattenList([
			"	A	B	C	D	E	F	G	H	I	J	".split(),
			"	K	L	M	N	O	P	R	S	T	U	".split(),
			"	V	W	Y	Z							".split()
		]))
		specialLettersBase = sorted([
			flattenList([
				"	D	E	I	N	O	".split(),
				"	S	T	U	Z		".split()
			]),
			flattenList([
				"	U	".split()
			])
		])
		specialLetters = sorted([
			flattenList([
				"	Edh	Eacute	Iacute	Eng		Oacute	".split(),
				"	Esh	Thorn	Uacute	Zhed			".split()
			]),
			flattenList([
				"	Udoubleacute	".split()
			])
		])
		names = sorted(flattenList(baseLetters + specialLetters))
		punctuation = sorted(flattenList([
			"	Emphasis	Special		Space	Stop	Comma	".split(),
			"	Question	Ellipsis	Hyphen	Start			".split()
		]))
		liga = [
			"languagesystem DFLT dflt;",
			"languagesystem latn dflt;"
		]
		liga.append("feature liga {")
		if True:
			for n in names:
				liga.append(f"\tsub {n.lower()} by {n};")
			for x in range(len(specialLetters)):
				for i in ["Start",""]:
					x = len(specialLetters) - x - 1
					for y in range(len(specialLetters[x])):
						liga.append(f"\tsub {' '.join(filter(bool,[i,specialLettersBase[x][y]]))} {' '.join(['Special' for i in range(x+1)])} by {specialLetters[x][y]};")
					liga.append(f"\tsub {' '.join(sorted([i] + ['Stop' for f in range(3)]))} by Ellipsis;")
			for l in flattenList(sorted([names + punctuation])):
				liga.append(f"\tsub Start {l} by {l};")
		liga.append("} liga;")
		liga = "\n".join(liga)
		with open(os.path.join(s,"features.fea"),"w") as f:
			f.write(liga)
		for e in ["Emphasis", ""]:
			for n in names:
				if n not in font:
					print(n, "does not exist")
				else:
					if any([
						len(n) > 1,
						n == n.capitalize()
					]):
						lig_name = "_".join(filter(bool, [n, e]))
						if e:
							try:
								lig = font.createChar(-1, lig_name)
								n_glyph = font[n]
								lig.clear()
								lig.addReference(n, (1, 0, 0, 1, 0, 0))
								if e:
									e_glyph = font[e]
									e_dx = (n_glyph.width - e_glyph.width) / 2
									lig.addReference(e, (1, 0, 0, 1, e_dx, 0))
								lig.width = n_glyph.width
								lig.build()
							except:
								print(f"Failed to build ligature <{lig_name}>")
		font.mergeFeature(os.path.join(s,"features.fea"))
		sideBearing = 75
		glyphList = []
		for glyph in font.glyphs():
			if all([
				glyph.isWorthOutputting(),
				any([
					len(glyph.glyphname) > 1,
					glyph.glyphname == glyph.glyphname.capitalize()
				])
			]):
				glyph.unlinkRef()
				glyphList.append(glyph)
		for glyph in glyphList:
			width = glyph.width
			#glyph.left_side_bearing = sideBearing
			#glyph.right_side_bearing = sideBearing
			glyph.width = int(
				width #+ (sideBearing * 2)
			)
		font.save(os.path.join(s,f"{s}-lig.sfd"))
		font.generate(os.path.join(s,f"{s}.otf"))
		for i in [g.glyphname for g in list(font.glyphs())]:
			pass#print(i)
for i in [
	"AbugidaR",
	"AlphabetD"
]:
	genFont(i)
	exportGlyphs(i)