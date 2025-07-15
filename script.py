import fontforge
font = fontforge.open("abugidaR.sfd")
consonants = "B C D Edh F G H J K L M N Eng P R S Esh T Thorn V W X Y Z Zhed".split()
vowels = "A E Eacute I Iacute O Oacute U Uacute".split()
for c in consonants:
	if c not in font:
		print(c, "does not exist")
	else:
		print(c)
		for v in vowels:
			if v not in font:
				print(v, "does not exist")
			else:
				print(v)
				lig_name = f"{c}_{v}"
				if lig_name not in font:
					lig = font.createChar(-1, lig_name)
					c_glyph = font[c]
					v_glyph = font[v]
					lig.addReference(c, (1, 0, 0, 1, 0, 0))
					lig.addReference(v, (1, 0, 0, 1, c_glyph.width, 0))
					lig.width = c_glyph.width + v_glyph.width
					lig.build()