document.addEventListener('DOMContentLoaded', () => {
	document
		.querySelectorAll('.AbugidaR')
		.forEach(el => {
			el.innerHTML = el.innerHTML
				.split('<br>')
				.map(line => `^${line}`)
				.map(line => line.replace(/\^ /, " "))
				.join('<br>');
		});
	document
		.querySelectorAll('.AlphabetD')
		.forEach(el => {
			el.innerHTML = el.innerHTML
				.split('<br>')
				.map(line => line.replace(/ /, " "))
				.join('<br>');
		});
});