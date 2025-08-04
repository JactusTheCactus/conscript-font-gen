#!/bin/bash
PRE=(
	aux
	glg
	glo
	gls
	log
	pdf
	toc
	xdy
)
POST=(
	aux
	glg
	glo
	gls
	log
	toc
	xdy
)
firstCompile() {
	echo "Step 1..."
	xelatex -interaction=nonstopmode main.tex > /dev/null 2>&1
	if [ $? -ne 0 ]; then
		echo -e "\tERROR!"
		return 1
	fi
}
glossCompile() {
	echo "Step 2..."
	makeglossaries main > /dev/null 2>&1
	if [ $? -ne 0 ]; then
		echo -e "\tERROR!"
		return 1
	fi
}
lastCompile() {
	echo "Step 3..."
	xelatex -interaction=nonstopmode main.tex > /dev/null 2>&1
	if [ $? -ne 0 ]; then
		echo -e "\tERROR!"
		return 1
	fi
}
main() {
	cd LaTeX
	for EXT in "${PRE[@]}"; do
		rm -f *."$EXT" > /dev/null 2>&1
	done
	rm -f main.aux main.glg main.glo main.gls main.log main.pdf main.toc main.xdy > /dev/null 2>&1
	if firstCompile && glossCompile && lastCompile; then
		echo -e "\nClearing Logs..."
		for EXT in "${POST[@]}"; do
			rm -f *."$EXT" > /dev/null 2>&1
		done
		code main.pdf
	else
		echo -e "\nSomething went wrong\nPlease check the logs"
		exit 1
	fi
	echo
}
main "$@"