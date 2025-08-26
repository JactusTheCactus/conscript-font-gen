.PHONY: build all
DEV_VUE=false
-include dev.mk
all:
	-clear
	make build
build: VUE/*
	echo "Building Vue Site..."
	cp assets/* VUE/src/assets
	cd VUE
	npm install
	npm run build
	if $(DEV_VUE); then
		echo "Running Vue Site..."
		npm run dev
	fi