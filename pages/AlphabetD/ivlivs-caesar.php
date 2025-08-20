<!DOCTYPE html>
<html>

<head>
	<link href="../style.css" rel="stylesheet">
	<script src="../fmt.js"></script>
	<?php
	$data = [
		"AlphabetD" => [
			"frendz,ro;minz,kuncri;men,lend mi; yo;r i;rz.",
			"ai; kum tu; beri; si;zu;;r,not tu; pre;z him.",
			"ðu i;vu;;l ðat men du; livz aftur ðem.",
			"ðu gu;;d iz oft intu;;red wiþ ðe;r bo;nz-",
			"so; let it bi; wiþ si;zu;;r.ðu no;bul bru;tis",
			"haþ to;ld yu; si;zur wuz ambiśis.",
			"if it wur so;,it wuz u gri;vis folt,",
			"and gri;visli; haþ si;zur ansurd it.",
			"hi;r,undur li;v uv bru;tis and ðu rest-",
			"fo;r bru;tis iz en onurubul man.",
			"so; ar ðe; ol,ol onurubul men-",
			"kum ai; tu; spi;k in si;zurs fyu;nurul.",
			"hi; wuz mai; frend, fe;þful and just tu; mi;.",
			"but bru;tis sez hi; wuz ambiśis,",
			"and bru;tis iz en onurubul man.",
			"hi; haþ brot meni; kaptivz ho;m tu; ro;m,",
			"hu;z ransumz did ðu jenurul kofurz fil.",
			"did ðis in si;zur si;m ambiśis?",
			"wen ðat ðu po;r hav krai;d,si;zur haþ wept.",
			"ambiśun śud bi; me;d uv sturnur stuf.",
			"yet bru;tis sez hi; wuz ambiśis,",
			"and bru;tis iz en onurubul man.",
			"yu; ol did si; ðat on ðu lupurkul",
			"ai; þrai;s pri;zentid him u kiŋli; krau;n,",
			"wic hi; did þrai;s rufyu;z.wuz ðis ambiśun?",
			"yet bru;tis sez hi; wuz ambiśis,",
			"and śur hi; iz en onurubul man.",
			"ai; spi;k not tu; dispru;v wut bru;tis spo;k,",
			"but hi;r ai; am tu; spi;k wut ai; du; no;.",
			"yu; ol did luv him wuns,not wiþau;t coz.",
			"wut coz wiþho;ldz yu; ðen tu; mo;rn fo;r him?",
			"o; jujment,ðau; art fled tu; bru;tiś bi;sts,",
			"and men hav lost ðe;r ri;zun.be;r wiþ mi;.",
			"mai; hart iz in ðu kofin ðe;r wiþ si;zur,",
			"and ai; must poz til it kum bak tu; mi;."
		],
		"Latin" => [
			"Friends, Romans, countrymen, lend me your ears.",
			"I come to bury Caesar, not to praise him.",
			"The evil that men do lives after them;",
			"The good is oft interrèd with their bones —",
			"So let it be with Caesar. The noble Brutus",
			"Hath told you Caesar was ambitious.",
			"If it were so, it was a grievous fault,",
			"And grievously hath Caesar answered it.",
			"Here, under leave of Brutus and the rest —",
			"For Brutus is an honorable man;",
			"So are they all, all honorable men —",
			"Come I to speak in Caesar's funeral.",
			"He was my friend, faithful and just to me.",
			"But Brutus says he was ambitious,",
			"And Brutus is an honorable man.",
			"He hath brought many captives home to Rome,",
			"Whose ransoms did the general coffers fill.",
			"Did this in Caesar seem ambitious?",
			"When that the poor have cried, Caesar hath wept;",
			"Ambition should be made of sterner stuff.",
			"Yet Brutus says he was ambitious,",
			"And Brutus is an honorable man.",
			"You all did see that on the Lupercal",
			"I thrice presented him a kingly crown,",
			"Which he did thrice refuse. Was this ambition?",
			"Yet Brutus says he was ambitious,",
			"And sure he is an honorable man.",
			"I speak not to disprove what Brutus spoke,",
			"But here I am to speak what I do know.",
			"You all did love him once, not without cause;",
			"What cause withholds you then to mourn for him?",
			"O judgment, thou art fled to brutish beasts,",
			"And men have lost their reason! Bear with me;",
			"My heart is in the coffin there with Caesar,",
			"And I must pause till it come back to me."
		]
	];
	?>
</head>

<body>
	<h1>
		<i>Julius Caesar</i>
		<br>
		Act III, Scene II
		<br>
		(Lines <code>73</code>&ndash;<code>107</code>)
	</h1>
	<hr>
	<?php
	foreach (["AlphabetD", "Latin"] as $x) {
		echo "<h2>$x</h2><p class='$x'>" . join("<br>", $data[$x]) . "<p>";
	};
	?>
</body>

</html>