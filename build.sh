#!/bin/bash
PRE=(
	aux
	glg
	glo
	gls
	log
	pdf
	txt
	toc
	xdy
)
KEEP=(
	pdf
	log
)
POST=()
for ITEM in "${PRE[@]}"; do
    SKIP=false
    for RM in "${KEEP[@]}"; do
        if [[ "$ITEM" == "$RM" ]]; then
            SKIP=true
            break
        fi
    done
    if ! $SKIP; then
        POST+=("$ITEM")
    fi
done
R="\033[0;91m"
G="\033[0;92m"
B="\033[0;94m"
echoColour() {
	echo -e "$B> $1"
}
errorColour() {
	echo -e "$R! $1"
}
echoHighlight() {
	echo "$G$1$B"
}
errorHighlight() {
	echo "$G$1$R"
}
genericError() {
	errorColour "ERROR! ;-;"
}
XeTeX() {
	xelatex -interaction=nonstopmode "main.tex" > /dev/null 2>&1
	if [ $? -ne 0 ]; then
		genericError
		return 1
	fi
}
MakeGloss() {
	makeglossaries main > /dev/null 2>&1
	if [ $? -ne 0 ]; then
		genericError
		return 1
	fi
}
LaTeXBuilds() {
	XeTeX && MakeGloss && XeTeX
}
laTeXBuild() {
	echoColour "Building $(echoHighlight PDF)..."
	cd LaTeX
	for EXT in "${PRE[@]}"; do
		rm -f *."$EXT" > /dev/null 2>&1
	done
	if ! LaTeXBuilds; then
		errorColour "Something went wrong"
		errorColour "Please check the $(errorHighlight Logs)!"
		exit 1
	else
		for EXT in "${POST[@]}"; do
			rm -f *."$EXT" > /dev/null 2>&1
		done
		#code "main.pdf"
	fi
}
pythonBuild() {
	echoColour "Building $(echoHighlight Fonts)..."
	if ! python3 script.py > /dev/null 2>&1; then
		errorColour "Failed to build $(errorHighlight Fonts)!"
		exit 1
	fi
}
phpFiles=(
	index
	AbugidaR/ipa
	AbugidaR/ivlivs-caesar
	AlphabetD/ipa
	AlphabetD/ivlivs-caesar
)
phpBuilds() {
	for file in "${phpFiles[@]}"; do
		php=$file.php
		html=$file.html
		if ! php pages/$php > docs/$html; then
			errorColour "Could not compile $(errorHighlight $php)"
		else
			if [ "$(cat pages/$php)" == "" ]; then
				errorColour "$(errorHighlight $php) is Empty!"
			fi
		fi
	done
}
phpBuild() {
	echoColour "Building $(echoHighlight Pages)..."
	if ! phpBuilds; then
		errorColour "Failed to build $(errorHighlight Pages)!"
		exit 1
	else
		cp */*.otf docs/ > /dev/null 2>&1
	fi
}
main() {
	while [[ $# -gt 0 ]]; do
		case "$1" in
			-py)
				pythonBuild;;
			-php)
				phpBuild;;
			-latex)
				laTeXBuild;;
			*)
				errorColour "Unknown Argument $(errorHighlight $1)";;
		esac
		shift
	done
	echo
}
main -php #-py #-latex