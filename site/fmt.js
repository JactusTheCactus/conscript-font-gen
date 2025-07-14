document.addEventListener('DOMContentLoaded', () => {
	const elements = document.querySelectorAll('.AbugidaR');
	elements.forEach(el => {
		el.innerHTML = el.innerHTML
			.split('<br>')
			.map(line => `^${line}`)
			.join('<br>');
	});
});