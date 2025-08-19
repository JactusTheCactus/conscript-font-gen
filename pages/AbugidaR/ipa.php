<!DOCTYPE html>
<html>

<head>
	<link href="../style.css" rel="stylesheet">
	<script src="../fmt.js"></script>
	<?php
	$data = [
		"C" => [
			["b", "b", "b"],
			["c", "c", "t͡ʃ"],
			["d", "d", "d"],
			["d;", "ð", "ð"],
			["f", "f", "f"],
			["g", "g", "g"],
			["h", "h", "h"],
			["j", "j", "d͡ʒ"],
			["k", "k", "k"],
			["l", "l", "l"],
			["m", "m", "m"],
			["n", "n", "n"],
			["n;", "ŋ", "ŋ"],
			["p", "p", "p"],
			["r", "r", "ɹ"],
			["s", "s", "s"],
			["s;", "ś", "ʃ"],
			["t", "t", "t"],
			["t;", "þ", "θ"],
			["v", "v", "v"],
			["w", "w", "w"],
			["y", "y", "j"],
			["z", "z", "z"],
			["z;", "ź", "ʒ"]
		],
		"V" => [
			["a", "a", "ɐ"],
			["e", "e", "ɛ"],
			["e;", "é", "e"],
			["i", "i", "ɪ"],
			["i;", "í", "i"],
			["o", "o", "ɔ"],
			["o;", "ó", "o"],
			["u", "u", "ə"],
			["u;", "ú", "u"]
		],
		"G" => [
			[" ", "_", "SPACE"],
			[".", ".", "STOP"],
			[",", ",", "COMMA"],
			["?", "?", "QUESTION"],
			["...", "...", "ELLIPSIS"],
			["-", "&ndash;", "DASH"],
			["'", "'", "EMPHASIS"]
		]
	];
	?>
</head>

<body>
	<table class="table" id="example">
		<tr>
			<th colspan=100%>
				<a href="#example">Example</a>
			</th>
		</tr>
		<tr>
			<td class="AbugidaR">Abúgí'du A'r.</td>
		</tr>
		<tr>
			<td>⟨AbugidaR⟩<br><span class="ipa">/ˌɐ.bu.ˈgi.dʌ ɐɹ/</span></td>
		</tr>
	</table>
	<table class="table" id="consonants">
		<tr>
			<th colspan="100%"><a href="#consonants">Consonants</a></th>
		</tr>
		<tr>
			<?php
			foreach ($data["C"] as $i => $c) {
				echo "<td>" .
					"<span class='AbugidaR'>$c[0]</span>"
					. "<hr>" .
					"⟨$c[1]⟩"
					. "<br>" .
					"<span class='ipa'>/$c[2]/</span>"
					. "</td>";
				if (($i + 1) % 5 == 0) {
					echo "</tr><tr>";
				}
			}
			?>
		</tr>
	</table>
	<table class="table" id="vowels">
		<tr>
			<th colspan="100%"><a href="#vowels">Vowels</a></th>
		</tr>
		<tr>
			<?php
			foreach ($data["V"] as $i => $v) {
				echo "<td>" .
					"<span class='AbugidaR'>$v[0]</span>"
					. "<hr>" .
					"⟨$v[1]⟩"
					. "<br>" .
					"<span class='ipa'>/$v[2]/</span>"
					. "</td>";
				if (($i + 1) % 5 == 0) {
					echo "</tr><tr>";
				}
			}
			?>
		</tr>
	</table>
	<table class="table" id="grammar">
		<tr>
			<th colspan="100%"><a href="#grammar">Punctuation</a></th>
		</tr>
		<tr>
			<?php
			foreach ($data["G"] as $i => $g) {
				echo "<td>" .
					"<span class='AbugidaR'>$g[0]</span>"
					. "<hr>" .
					"⟨$g[1]⟩"
					. "<br>" .
					"<span class='ipa'>$g[2]</span>"
					. "</td>";
				if (($i + 1) % 3 == 0) {
					echo "</tr><tr>";
				}
			}
			?>
		</tr>
	</table>
</body>

</html>