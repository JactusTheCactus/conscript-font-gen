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
DIR="LaTeX"
FILE="main"
R="\033[0;91m"
G="\033[0;92m"
B="\033[0;94m"
echoColour() {
	echo -e "$B>\t$1"
}
errorColour() {
	echo -e "$R!\t$1"
}
echoHighlight() {
	echo "$G$1$B"
}
errorHighlight() {
	echo "$G$1$R"
}
genError() {
	errorColour "ERROR!"
}
XeTeX() {
	echoColour "$(echoHighlight "XeTeX")..."
	xelatex -interaction=nonstopmode "$FILE.tex" > /dev/null 2>&1
	if [ $? -ne 0 ]; then
		genError
		return 1
	fi
}
MakeGloss() {
	echoColour "Making $(echoHighlight "Glossaries")..."
	makeglossaries $FILE > /dev/null 2>&1
	if [ $? -ne 0 ]; then
		genError
		return 1
	fi
}
main() {
	python script.py
	cd "$DIR"
	for EXT in "${PRE[@]}"; do
		rm -f *."$EXT" > /dev/null 2>&1
	done
	if XeTeX && MakeGloss && XeTeX; then
		echoColour "Clearing $(echoHighlight "Logs")..."
		for EXT in "${POST[@]}"; do
			rm -f *."$EXT" > /dev/null 2>&1
		done
		code "$FILE.pdf"
	else
		errorColour "Something went wrong"
		errorColour "Please check the $(errorHighlight "Logs")!"
		exit 1
	fi
	echo
}
main "$@"