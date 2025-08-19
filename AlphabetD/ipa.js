const data = {
	c: {
		width: 5,
		data: [
			{ script: "b", ipa: "b" },
			{ script: "c", ipa: "t͡ʃ" },
			{ script: "d", ipa: "d" },
			{ script: "d;", ipa: "ð" },
			{ script: "f", ipa: "f" },
			{ script: "g", ipa: "g" },
			{ script: "h", ipa: "h" },
			{ script: "j", ipa: "d͡ʒ" },
			{ script: "k", ipa: "k" },
			{ script: "l", ipa: "l" },
			{ script: "m", ipa: "m" },
			{ script: "n", ipa: "n" },
			{ script: "n;", ipa: "ŋ" },
			{ script: "p", ipa: "p" },
			{ script: "r", ipa: "ɹ" },
			{ script: "s", ipa: "s" },
			{ script: "s;", ipa: "ʃ" },
			{ script: "t", ipa: "t" },
			{ script: "t;", ipa: "θ" },
			{ script: "v", ipa: "v" },
			{ script: "w", ipa: "w" },
			{ script: "y", ipa: "j" },
			{ script: "z", ipa: "z" },
			{ script: "z;", ipa: "ʒ" }
		]
	},
	v: {
		width: 5,
		data: [
			{ script: "a", ipa: "ɐ" },
			{ script: "e", ipa: "ɛ" },
			{ script: "e;", ipa: "e" },
			{ script: "i", ipa: "ɪ" },
			{ script: "i;", ipa: "i" },
			{ script: "o", ipa: "ɔ" },
			{ script: "o;", ipa: "o" },
			{ script: "u", ipa: "ə" },
			{ script: "u;", ipa: "u" },
			{ script: "u;;", ipa: "ʊ" }
		]
	},
	g: {
		width: 3,
		data: [
			{ script: " ", ipa: "SPACE" },
			{ script: ".", ipa: "STOP" },
			{ script: ",", ipa: "COMMA" },
			{ script: "?", ipa: "QUESTION" },
			{ script: "...", ipa: "ELLIPSIS" },
			{ script: "-", ipa: "HYPHEN" }
		]
	}
};
{
	/*
		{
			const table = document.createElement("table");
			table.classList.add(
				"table",
				"page"
			);
			table.id = "example"
			{
				const tr = document.createElement("tr");
				{
					const th = document.createElement("th")
					th.colSpan = "100%"
					{
						const a = document.createElement("a")
						a.href = "#example"
						a.innerText = "Example"
						th.appendChild(a)
					}
					tr.appendChild(th)
				}
				table.appendChild(tr)
			}
			{
				const tr = document.createElement("tr");
				{
					const td = document.createElement("td")
					td.colSpan = "100%"
					td.className = "AlphabetD"
					td.innerText = "Alfubet di;."
					tr.appendChild(td)
				}
				table.appendChild(tr)
			}
			{
				const tr = document.createElement("tr");
				{
					const td = document.createElement("td")
					td.colSpan = "100%"
					td.className = "AlphabetD"
					td.innerText = "⟨AlphabetD⟩"
					{
						const br = document.createElement("br")
						td.appendChild(br)
					}
					{
						const span = document.createElement("span")
						span.className = "ipa"
						span.innerText = "ˈal.fə.ˌbɛt di"
						td.appendChild(span)
					}
					tr.appendChild(td)
				}
				table.appendChild(tr)
			}
			document.body.appendChild(table)
		}
	*/
}
{
	const table = document.createElement("table");
	table.classList.add(
		"table",
		"page"
	);
	table.id = "consonants"
	{
		const tr = document.createElement("tr");
		{
			const th = document.createElement("th")
			th.colSpan = data.c.width
			{
				const a = document.createElement("a")
				a.href = "#consonants"
				a.innerText = "Consonants"
				th.appendChild(a)
			}
			tr.appendChild(th)
		}
		table.appendChild(tr)
	}
	{
		table.innerHTML += "<tr>"
		data.c.data.forEach((letter, i) => {
			const td = document.createElement("td")
			td.className = "AlphabetD"
			td.innerText = letter.script
			table.appendChild(td)
			if (i % data.c.width) {
				table.innerHTML += ""
			}
		})
		table.innerHTML += "</tr>"
	}
	/*{
		const tr = document.createElement("tr");
		data.c.data.forEach(letter => {
			const td = document.createElement("td")
			td.innerText = `⟨${letter.script}⟩`
			{
				const br = document.createElement("br")
				td.appendChild(br)
			}
			{
				const span = document.createElement("span")
				span.className = "ipa"
				span.innerText = letter.ipa
				td.appendChild(span)
			}
			tr.appendChild(td)
		})
		table.appendChild(tr)
	}*/
	document.body.appendChild(table)
}