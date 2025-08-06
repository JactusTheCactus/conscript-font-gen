import fontforge, json, re, os
def genFont(s):
	if not s:
		print(f"genFont():\n\tInvalid Input <{s}>")
	elif s == "AbugidaR":
		font = fontforge.open(os.path.join(s,"abugidaR-main.sfd"))
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
					liga.append(f"\tsub {c} {v} by {c}_{v};")
					liga.append(f"\tsub {c} {v} emphasis by {c}_{v}_emphasis;")
				liga.append(f"\tsub {c} emphasis by {c}_emphasis;")
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
		font.save(os.path.join(s,"abugidaR-lig.sfd"))
		font.generate(os.path.join(s,"abugidaR.otf"))
	elif s == "AlphabetD":
		letterList = [
			"	A	B		C	D		Ð	E		É		F		G				H		".split(),
			"	I	Í		J	K		L	M		N		Ŋ		O				Ó		".split(),
			"	P	R		S	Ś		T	Þ		U		Ú		Ű				V		".split(),
			"	W	Y		Z	Ź															".split()
		]
		letters = [item for sublist in letterList for item in sublist]
		nameList = [
			"	A	B		C	D		Edh	E		Eacute	F		G				H		".split(),
			"	I	Iacute	J	K		L	M		N		Eng		O				Oacute	".split(),
			"	P	R		S	Sacute	T	Thorn	U		Uacute	Udoubleacute	V		".split(),
			"	W	Y		Z	Zacute														".split()
		]
		names = [item for sublist in nameList for item in sublist]
		table = ""
		table += "|Letter|Glyph|\n"
		table += "|:-:|:-:|\n"
		for i in range(len(letters if len(letters) <= len(names) else names)):
			l = letters[i]
			n = names[i]
			letter = l + l.lower()
			table += f"|{letter}|![{letter}]({os.path.join(s,"img",n)})|\n"
		with open(os.path.join(s,"data.md"), "w", encoding="utf-8") as f:
			f.write(table)
for i in [
	"AbugidaR",
	"AlphabetD"
]:
	genFont(i)
with open("readmeData.json", "r") as f:
	data = json.load(f)
readme = "# Planned Conscripts"
tree = ""
tree += "\n```mermaid"
tree += "\nmindmap"
tree += "\n\t((Conscripts))"
for con in data:
	tree += f"\n\t\t{con['type']}_{con['direction'][0]}"
	for branch in ["state","type","direction","variants","notes"]:
		try:
			tree += f"\n\t\t\t((\"`{branch.capitalize()}`\"))"
			if type(con[branch]) == list:
				for i in range(len(con[branch])):
					con[branch][i] = re.sub(r"\n+", "\n" + "\t" * 4, con[branch][i])
				con[branch] = "`\")\n\t\t\t\t(\"`".join(con[branch])
			tree += f"\n\t\t\t\t(\"`{con[branch]}`\")"
		except:
			continue
tree += "\n```"
readme += tree
list = re.sub(r"```mermaid\nmindmap\n([\s\S]*)\n```", r"\1", tree)
replacements = {
	"replace": [
		r"^\t",
		r"\(\(?\"?`?([\s\S]*?)`?\"?\)?\)",
		r"^\t(\b.*\b)",
		r"(\t+)([A-Za-z*])"
	],
	"with": [
		r"",
		r"- \1",
		r"\t- \1",
		r"\1\t- \2"
	],
	"flags":[
		re.MULTILINE,
		re.NOFLAG,
		re.MULTILINE,
		re.MULTILINE
	]
}
for i in range(len(replacements["replace"])):
	list = re.sub(
		replacements["replace"][i],
		replacements["with"][i],
		list,
		flags=replacements["flags"][i] if replacements["flags"][i] else re.NOFLAG
	)
readme += list
with open("README.md", "w") as f:
	f.write(readme)