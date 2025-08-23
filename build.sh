#!/bin/bash
DEV_VUE=false
source ./dev.sh
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
	#log
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
laTeXBuild() {
	LaTeXBuilds() {
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
		XeTeX && MakeGloss && XeTeX
	}
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
	fi
}
pythonBuild() {
	echoColour "Building $(echoHighlight Fonts)..."
	pythonBuilds() {
		python3 script.py #> /dev/null 2>&1
	}
	if ! pythonBuilds; then
		errorColour "Failed to build $(errorHighlight Fonts)!"
		exit 1
	fi
}
vueBuild() {
	echoColour "Building $(echoHighlight "Vue Site")..."
	vueBuilds() {
		DIR=VUE
		cp assets/* $DIR/src/assets
		cd $DIR
		npm install > /dev/null 2>&1
		npm run build > /dev/null 2>&1
		if $DEV_VUE; then
			echoColour "Running $(echoHighlight "Vue Site")..."
			npm run dev
		fi
	}
	if ! vueBuilds; then
		errorColour "Failed to build $(errorHighlight "Vue Site")!"
		exit 1
	fi
}
main() {
    args=()
    for arg in "$@"; do
        if [[ "$arg" =~ ^-([a-zA-Z]{2,})$ ]]; then
            for ((i=0; i<${#BASH_REMATCH[1]}; i++)); do
                args+=("-${BASH_REMATCH[1]:i:1}")
            done
        else
            args+=("$arg")
        fi
    done
    set -- "${args[@]}"
	FONT_DIRS=(
		AbugidaR
		AlphabetD
	)
	for DIR in "${FONT_DIRS[@]}"; do
		cp $DIR/*.otf assets > /dev/null 2>&1
	done
	while [[ $# -gt 0 ]]; do
		case "$1" in
			# Individual Builds
			-p|--py)
				pythonBuild;;
			-l|--latex)
				laTeXBuild;;
			-v|--vue)
				vueBuild;;
			-A|--all)
				main -plv;;
			# Fallback
			*)
				errorColour "Unknown Argument $(errorHighlight $1)";;
		esac
		shift
	done
}
main "$@"
echo