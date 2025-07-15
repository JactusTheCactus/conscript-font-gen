import fontforge
import os
# Open your base font
font = fontforge.open(os.path.join("abugidaR-versions","abugidaR-00.sfd"))
# Define consonants and vowels
consonants = "B C D Edh F G H J K L M N Eng P R S Esh T Thorn V W X Y Z Zhed".split()
vowels = "A E Eacute I Iacute O Oacute U Uacute".split()  # Add 'y' if needed
# Create ligatures for each C+V pair
for c in consonants:
    print(c) if c in font else print(c, "does not exist")
    for v in vowels:
        print(v) if v in font else print(v, "does not exist")
        lig_name = f"{c}_{v}"
        if lig_name not in font:
            lig = font.createChar(-1, lig_name)
            # Get the base glyphs
            c_glyph = font[c]
            v_glyph = font[v]
            # Add references and set positioning
            lig.addReference(c, (1, 0, 0, 1, 0, 0))
            lig.addReference(v, (1, 0, 0, 1, c_glyph.width, 0))
            lig.width = c_glyph.width + v_glyph.width
            lig.build()