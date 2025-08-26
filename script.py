import fontforge, re, os, shutil
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
	if folder == "AlphabetD":
		for i in "Solo Init Medi Fina".split():
			path = os.path.join(OUTPUT_DIR, i)
			shutil.rmtree(path, ignore_errors=True)
			os.makedirs(path)
	font = fontforge.open(FONT_FILE)
	for glyph in filter(bool, [
		g for g in font.glyphs()
		if all([
			g.isWorthOutputting(),
			not re.match(r".*_Emphasis",g.glyphname, re.I)
		])
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
			nameSplit = name.split(".")
			name = "".join(nameSplit[:1]) if nameSplit[1:] else name
			OUTPUT = re.sub(r"[/\\]\.",".",os.path.join(OUTPUT_DIR, *map(lambda x: x.capitalize(), nameSplit[1:]), f"{name}.svg"))
			glyph.export(OUTPUT)
def genFont(s):
	if not s:
		print(f"genFont():\n\tInvalid Input <{s}>")
	elif s == "AbugidaR":
		font = fontforge.open(os.path.join(s,f"{s}-main.sfd"))
		consonants = "B C D Edh F G H J K L M N Eng P R S Esh T Thorn V W X Y Z Zhed".split()
		vowels = "A E Eacute I Iacute O Oacute U Uacute".split()
		punctuation = "period comma space hyphen question ellipsis start special emphasis".split()
		letters = consonants + vowels
		nonV = punctuation + consonants
		lvn =	"E		I		O		U		D	N	S	T		Z	".split()
		lvy =	"Eacute	Iacute	Oacute	Uacute	Edh	Eng	Esh	Thorn	Zhed".split()
		fea = [
			"languagesystem DFLT dflt;",
			"languagesystem latn dflt;"
		]
		fea.append("feature liga {")
		if True:
			for l in letters:
				fea.append(f"\tsub {l.lower()} by {l};")
			for l in range(len(punctuation)):
				fea.append(f"\tsub {lvn[l]} special by {lvy[l]};")
			for p in punctuation:
				for v in vowels + ["emphasis"]:
					fea.append(f"\tsub {p} {v}' by X {v};")
			for non in nonV:
				fea.append(f"\tsub start {non} by {non};")
			for v1 in vowels:
				for v2 in vowels:
					fea.append(f"\tsub {v1} {v2}' by X {v2};")
			for c in consonants:
				for v in vowels:
					fea.append(f"\tsub {c} {v} by {'_'.join([c, v])};")
					fea.append(f"\tsub {c} {v} emphasis by {'_'.join([c, v, 'emphasis'])};")
				fea.append(f"\tsub {c} emphasis by {'_'.join([c, 'emphasis'])};")
			for p1 in punctuation:
				for p2 in punctuation:
					fea.append(f"\tsub {p1} {p2} by {p1};")
			for p in punctuation:
				fea.append(f"\tsub {p} space by {p};")
				fea.append(f"\tsub space {p} by {p};")
			fea.append(f"\tsub period period period by ellipsis;")
		fea.append("} liga;")
		fea = "\n".join(fea)
		with open(os.path.join(s,"features.fea"),"w") as f:
			f.write(fea)
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
			"	P	R	S	Ś	T	Þ	U	Ú	Ǔ	V	".split(),
			"	W	Y	Z	Ź							".split()
		]))
		punctuation = sorted(flattenList([
			"	Special		Space		Stop	Comma	".split(),
			"	Question	Ellipsis	Hyphen			".split()
		]))
		letterList = flattenList([
				"	A		B				C		Edh		D		".split(),
				"	Eacute	E				F		G		H		".split(),
				"	Iacute	I				J		K		L		".split(),
				"	M		Eng				N		Oacute	O		".split(),
				"	P		R				Esh		S		Thorn	".split(),
				"	T		Uhacek	Uacute	U		V		".split(),
				"	W		Y				Zhed	Z				".split()
			])
		with open(os.path.join(s,"features.fea"),"w") as f:
			fea = [
				"languagesystem DFLT dflt;",
				"languagesystem latn dflt;",
				f"@letters = [ {' '.join(letterList)} ];",
				f"@lettersLC = [ {' '.join(map(lambda x: x.lower(), letterList))} ];",
				f"@letters.solo = [ {' '.join(map(lambda x: f'{x}.solo', letterList))} ];",
				f"@letters.medi = [ {' '.join(map(lambda x: f'{x}.medi', letterList))} ];",
				f"@letters.init = [ {' '.join(map(lambda x: f'{x}.init', letterList))} ];",
				f"@letters.fina = [ {' '.join(map(lambda x: f'{x}.fina', letterList))} ];",
				f"@letters.all = [ {' '.join([
					"@letters.solo",
					"@letters.medi",
					"@letters.init",
					"@letters.fina"
				])} ];"
			]
			fea.append("feature vert {")
			fea.append(f"\tsub @lettersLC by @letters;")
			for i in range(len('U'.split())):
				fea.append(f"\tsub {'U'.split()[i]} Special Special by {'Uhacek'.split()[i]}.solo;")
			for i in range(len('D E I N O S T U Z'.split())):
				fea.append(f"\tsub {'D E I N O S T U Z'.split()[i]} Special by {'Edh Eacute Iacute Eng Oacute Esh Thorn Uacute Zhed'.split()[i]}.solo;")
			for i in 'A B C D E F G H I J K L M N O P R S T U V W Y Z'.split():
				fea.append(f"\tsub {i} by {i}.solo;")
			fea.append(f"\tsub @letters.all @letters.solo' @letters.all by @letters.medi;")
			fea.append(f"\tsub @letters.solo' @letters.all by @letters.init;")
			fea.append(f"\tsub @letters.all @letters.solo' by @letters.fina;")
			fea.append(f"\tsub Stop Stop Stop by Ellipsis;")
			fea.append("} vert;")
			fea = "\n".join(fea)
			f.write(fea)
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
		font.mergeFeature(os.path.join(s,f"features.fea"))
		font.save(os.path.join(s,f"{s}-lig.sfd"))
		font.generate(os.path.join(s,f"{s}.otf"))
for i in [
	"AbugidaR",
	"AlphabetD"
]:
	genFont(i)
	exportGlyphs(i)