"""
TESTS:
	^he'lo;, ma'i; ne;'m i'z de'vin.
	^a' e' e;' i' i;' o' o;' u' u;'
"""
import fontforge
import json
font = fontforge.open("abugidaR-main.sfd")
consonants = "B C D Edh F G H J K L M N Eng P R S Esh T Thorn V W X Y Z Zhed".split()
vowels = "A E Eacute I Iacute O Oacute U Uacute".split()
punctuation = "period comma space hyphen question ellipsis start special emphasis".split()
letters = consonants + vowels
nonC = punctuation + vowels
nonV = punctuation + consonants
lvn = "E      I      O      U      D   N   S   T     Z   ".split()
lvy = "Eacute Iacute Oacute Uacute Edh Eng Esh Thorn Zhed".split()
for e in ["emphasis", ""]:
	for c in consonants:
		if c not in font:
			print(c, "does not exist")
		else:
			for v in vowels:
				if v not in font:
					print(v, "does not exist")
				else:
					lig_name = "_".join(filter(bool, [c, v, e]))
					lig = font.createChar(-1, lig_name)
					c_glyph = font[c]
					v_glyph = font[v]
					lig.clear()
					lig.addReference(c, (1, 0, 0, 1, 0, 0))
					lig.addReference(v, (1, 0, 0, 1, 0, 0))
					if e:
						lig.addReference(e, (1, 0, 0, 1, 0, 0))
					lig.width = c_glyph.width
					lig.build()
font.save("abugidaR-lig.sfd")
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
		for v in vowels:
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
	for p1 in punctuation:
		for p2 in punctuation:
			liga.append(f"\tsub {p1} {p2} by {p1};")
	for p in punctuation:
		liga.append(f"\tsub {p} space by {p};")
		liga.append(f"\tsub space {p} by {p};")
	liga.append(f"\tsub period period period by ellipsis;")
liga.append("} liga;")
liga = "\n".join(liga)
with open("features.fea","w") as f:
	f.write(liga)
with open("readmeData.json", "r") as f:
	data = json.load(f)
readme = ":::mermaid\nmindmap\n\t((Script Plan))"
for x in data:
	readme += f"\n\t\t{x['type']}_{x['direction'][0]}"
	for y in ["state","type","direction","variants"]:
		readme += f"\n\t\t\t{{{{{y.capitalize()}}}}}"
		if type(x[y]) == list:
			x[y] = ")\n\t\t\t\t(".join(x[y])
		readme += f"\n\t\t\t\t({x[y]})"
with open("README.md", "w") as f:
	f.write(readme)