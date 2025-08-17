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
DIR="LaTeX"
LATEX="main"
FONT="script"
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
	xelatex -interaction=nonstopmode "$LATEX.tex" > /dev/null 2>&1
	if [ $? -ne 0 ]; then
		genError
		return 1
	fi
}
MakeGloss() {
	echoColour "Making $(echoHighlight "Glossaries")..."
	makeglossaries $LATEX > /dev/null 2>&1
	if [ $? -ne 0 ]; then
		genError
		return 1
	fi
}
pythonBuild() {
	echoColour "Building $(echoHighlight "Fonts")..."
	python3 "$FONT.py" > /dev/null 2>&1
}
main() {
	if ! pythonBuild; then
		errorColour "Failed to build $(errorHighlight "Fonts")!"
	fi
	cd "$DIR"
	for EXT in "${PRE[@]}"; do
		rm -f *."$EXT" > /dev/null 2>&1
	done
	if XeTeX && MakeGloss && XeTeX; then
		echoColour "Clearing $(echoHighlight "Logs")..."
		for EXT in "${POST[@]}"; do
			rm -f *."$EXT" > /dev/null 2>&1
		done
		#code "$LATEX.pdf"
	else
		errorColour "Something went wrong"
		errorColour "Please check the $(errorHighlight "Logs")!"
		exit 1
	fi
	echo
}
main "$@"