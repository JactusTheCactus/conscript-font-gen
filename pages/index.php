<!DOCTYPE html>
<html>

<head>
	<link href="../style.css" rel="stylesheet">
	<script src="../fmt.js"></script>
</head>

<body>
	<h1>Scripts</h1>
	<ul>
		<?php
		$scripts = array("AbugidaR", "AlphabetD");
		foreach ($scripts as $s) {
			echo "<li>" .
				$s .
				"<ul>" .
				"<li>" .
				"<a href='$s/ipa.html'>Phonemes</a>" .
				"</li>" .
				"<li>" .
				"<a href='$s/ivlivs-caesar.html'>Example</a>" .
				"</li>" .
				"</ul>" .
				"</li>";
		};
		?>
	</ul>
</body>

</html>