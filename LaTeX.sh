cd LaTeX
rm main.aux main.glg main.glo main.gls main.log main.pdf main.toc main.xdy
xelatex main.tex
makeglossaries main
xelatex main.tex