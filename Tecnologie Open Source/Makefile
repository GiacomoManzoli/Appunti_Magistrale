TEX = pdflatex -interaction=nonstopmode -halt-on-error -file-line-error

document:
	$(TEX) TecnologieOpenSource.tex


TEX = pdflatex -interaction=nonstopmode -halt-on-error -file-line-error

document:
	$(TEX) TecnologieOpenSource.tex
	biber TecnologieOpenSource
	$(TEX) TecnologieOpenSource.tex
	makeindex -s TecnologieOpenSource.ist -t TecnologieOpenSource.glg -o TecnologieOpenSource.gls TecnologieOpenSource.glo
	makeindex -s TecnologieOpenSource.ist -t TecnologieOpenSource.alg -o TecnologieOpenSource.acr TecnologieOpenSource.acn
	$(TEX) TecnologieOpenSource.tex
	$(TEX) TecnologieOpenSource.tex