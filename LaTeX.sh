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
	makeglossaries -interaction=nonstopmode main > /dev/null 2>&1
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
	rm -f main.pdf
	if firstCompile && glossCompile && lastCompile; then
		echo -e "\nClearing Logs..."
		rm -f main.aux main.glg main.glo main.gls main.log main.toc main.xdy > /dev/null 2>&1
	else
		echo -e "\nSomething went wrong\nPlease check the logs"
		exit 1
	fi
	echo
}
main "$@"