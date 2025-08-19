<!DOCTYPE html>
<html>

<head>
	<link href="../../style.css" rel="stylesheet">
	<script src="../../fmt.js"></script>
	<?php
	$data = [
		"AbugidaR" => [
			"fre'ndz,ro;'minz,ku'ncri;men,le'nd mi;' yo;'r i;'rz.",
			"ai;' ku'm tu;' be'ri; si;'zur,no't tu;' pre;'z hi'm.",
			"ðu' i;'vul ða't me'n du;' li'vz a'ftur ðe'm.",
			"ðu' gu'd i'z o'ft intu'red wi'þ ðe;'r bo;'nz-",
			"so;' le't i't bi;' wi'þ si;'zur.ðu' no;'bul bru;'tis",
			"ha'þ to;'ld yu;' si;'zur wu'z ambi'śis.",
			"i'f i't wu'r so;',i't wu'z u' gri;'vis fo'lt,",
			"a'nd gri;'visli; ha'þ si;'zur a'nsurd i't.",
			"hi;'r,u'ndur li;'v u'v bru;'tis a'nd ðu' re'st-",
			"fo;'r bru;'tis i'z e'n o'nurubul ma'n.",
			"so;' a'r ðe;' o'l,o'l o'nurubul me'n-",
			"ku'm ai;' tu;' spi;'k i'n si;'zurs fyu;'nurul.",
			"hi;' wu'z mai;' fre'nd, fe;'þful a'nd ju'st tu;' mi;'.",
			"bu't bru;'tis se'z hi;' wu'z ambi'śis,",
			"a'nd bru;'tis i'z e'n o'nurubul ma'n.",
			"hi;' ha'þ bro't me'ni; ka'ptivz ho;'m tu;' ro;'m,",
			"hu;'z ra'nsumz di'd ðu' je'nurul ko'furz fi'l.",
			"di'd ði's i'n si;'zur si;'m ambi'śis?",
			"we'n ða't ðu' po;'r ha'v krai;'d,si;'zur ha'þ we'pt.",
			"ambi'śun śu'd bi;' me;'d u'v stu'rnur stu'f.",
			"ye't bru;'tis se'z hi;' wu'z ambi'śis,",
			"a'nd bru;'tis i'z e'n o'nurubul ma'n.",
			"yu;' o'l di'd si;' ða't o'n ðu' lu'purkul",
			"ai;' þrai;'s pri;ze'ntid hi'm u' ki'ŋli; krau;'n,",
			"wi'c hi;' di'd þrai;'s rufyu;'z.wu'z ði's ambi'śun?",
			"ye't bru;'tis se'z hi;' wu'z ambi'śis,",
			"a'nd śu'r hi;' i'z e'n o'nurubul ma'n.",
			"ai;' spi;'k no't tu;' dispru;'v wu't bru;'tis spo;'k,",
			"bu't hi;'r ai;' a'm tu;' spi;'k wu't ai;' du;' no;'.",
			"yu;' o'l di'd lu'v hi'm wu'ns,no't wiþau;'t co'z.",
			"wu't co'z wiþho;'ldz yu;' ðe'n tu;' mo;'rn fo;'r hi'm?",
			"o;' ju'jment,ðau;' a'rt fle'd tu;' bru;'tiś bi;'sts,",
			"a'nd me'n ha'v lo'st ðe;'r ri;'zun.be;'r wi'þ mi;'.",
			"mai;' ha'rt i'z i'n ð'u ko'fin ðe;'r wi'þ si;'zur,",
			"a'nd ai;' mu'st po'z ti'l i't ku'm ba'k tu;' mi;'."
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
	foreach(["AbugidaR","Latin"] as $x) {
		echo "<h2>$x</h2><p class='$x'>".join("<br>", $data[$x])."<p>";
	};
	?>
</body>

</html>