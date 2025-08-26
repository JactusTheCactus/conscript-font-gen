.PHONY: all build dev gloss python vue xetex
DEV_VUE = false
ASSETS := $(wildcard assets/*)
VUE_ASSETS := $(patsubst assets/%, VUE/src/assets/%, $(ASSETS))
-include dev.mk
all : build
ifeq ($(DEV_VUE),true)
	make dev
endif
build : python latex vue
python : script.py AbugidaR/* AlphabetD/*
	python3 script.py
latex : LaTeX/**/*
	make xetex && \
	make gloss && \
	make xetex && \
	cd LaTeX && \
	rm -rf $(patsubst %,*.%, \
		aux \
		glg \
		glo \
		gls \
		log \
		txt \
		toc \
		xdy \
	)
xetex :
	cd LaTeX && \
	xelatex -interaction=nonstopmode "main.tex"
gloss :
	cd LaTeX && \
	makeglossaries main
vue : $(wildcard VUE/src/**/*) $(VUE_ASSETS)
	cd VUE && \
	npm install && \
	npm run build
dev :
	cd VUE && \
	npm run dev
VUE/src/assets/% : assets/%
	mkdir -p $(dir $@)
	cp $< $@