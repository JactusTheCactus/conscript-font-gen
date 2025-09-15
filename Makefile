.PHONY: all build clean dev gloss js python vue xetex
SHELL := /bin/bash
DEV_VUE = false
ASSETS := $(wildcard assets/*)
VUE_ASSETS := $(patsubst assets/%, VUE/src/assets/%, $(ASSETS))
JS_DIR := openTypeJS
PYTHON := python3
VENV := vEnv
VENV_ACTIVATE := source $(VENV)/bin/activate
ABG := stratic
#-include dev.mk
all : build clean
ifeq ($(DEV_VUE),true)
	@make dev
endif
build : js#python latex vue
js :
	@sass style.scss style.css
	@node --trace-uncaught $(JS_DIR)/script.js
	-@$(VENV_ACTIVATE) && \
	fonttools feaLib \
	-o $(ABG).otf \
	$(ABG).fea \
	$(ABG).otf
python : script.py AbugidaR/* Cascadic/*
	@python3 script.py
	@cp AbugidaR/AbugidaR.otf assets && \
	cp Cascadic/Cascadic.otf assets
	@cp assets/* VUE/src/assets
latex : LaTeX/**/*
	@make xetex && \
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
	@cd LaTeX && \
	xelatex -interaction=nonstopmode "main.tex"
gloss :
	@cd LaTeX && \
	makeglossaries main
vue : $(wildcard VUE/src/**/*) $(VUE_ASSETS)
	@cd VUE && \
	npm install && \
	npm run build
dev :
	@cd VUE && \
	npm run dev
VUE/src/assets/% : assets/%
	@mkdir -p $(dir $@)
	@cp $< $@
clean :
	@rm -rf $(wildcard \
		.sass-cache \
		*.css.map \
	)