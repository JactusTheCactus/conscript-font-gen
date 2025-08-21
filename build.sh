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
	if ! python3 script.py > /dev/null 2>&1; then
		errorColour "Failed to build $(errorHighlight Fonts)!"
		exit 1
	fi
}
phpBuild() {
	phpBuilds() {
		phpFiles=(
			index
			AbugidaR/ipa
			AbugidaR/ivlivs-caesar
			AlphabetD/ipa
			AlphabetD/ivlivs-caesar
		)
		for file in "${phpFiles[@]}"; do
			dir=site/PHP
			php=$file.php
			html=$file.html
			mkdir -p $dir
			mkdir -p $dir/AbugidaR
			mkdir -p $dir/AlphabetD
			cp docs/* $dir/
			if ! php pages/$php > $dir/$html; then
				errorColour "Could not compile $(errorHighlight $php)"
			else
				if [ "$(cat pages/$php)" == "" ]; then
					errorColour "$(errorHighlight $php) is Empty!"
				fi
			fi
		done
	}
	echoColour "Building $(echoHighlight "PHP Pages")..."
	if ! phpBuilds; then
		errorColour "Failed to build $(errorHighlight "PHP Pages")!"
		exit 1
	else
		cp */*.otf site/PHP/ > /dev/null 2>&1
	fi
}
svelteRun() {
	svelteBuild() {
		PROJECT=SVELTE
		cp docs/style.css $PROJECT/src/lib/assets
		cp AbugidaR/AbugidaR.otf $PROJECT/src/lib/assets
		cp AlphabetD/AlphabetD.otf $PROJECT/src/lib/assets
		(
			cd $PROJECT
			rm -rf $PROJECT/build
			npm run build #> /dev/null 2>&1
		)
		rm -rf site/$PROJECT
		mkdir site/$PROJECT > /dev/null 2>&1
		if -d $PROJECT/build; then
			cp -r $PROJECT/build/* site/$PROJECT
		fi
	}
	echoColour "Building $(echoHighlight "Svelte Site")..."
	if ! svelteBuild; then
		errorColour "Failed to build $(errorHighlight "Svelte Site")!"
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
	mkdir -p site
	while [[ $# -gt 0 ]]; do
		case "$1" in
			# Individual Builds
			-y|--py)
				pythonBuild;;
			-h|--php)
				phpBuild;;
			-l|--latex)
				laTeXBuild;;
			-s|--svelte)
				svelteRun;;
			# Group Builds
			-W|--web)
				echo "<!DOCTYPE html><html><head><link href='PHP/style.css' rel='stylesheet'></head><body><ul>" > index.html
				WEB=(
					PHP
					SVELTE
				)
				for I in "${WEB[@]}"; do
					echo "<li><a href='site/$I/index.html'>$I</a></li>" >> index.html
				done
				echo "</ul></body></html>" >> index.html
				main -hs;;
			-A|--all)
				main -yWl;;
			# Fallback
			*)
				errorColour "Unknown Argument $(errorHighlight $1)";;
		esac
		shift
	done
	echo
}
main "$@"