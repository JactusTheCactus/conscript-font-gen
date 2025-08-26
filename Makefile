.PHONY: all build dev
DEV_VUE = false
ASSETS := $(wildcard assets/*)
VUE_ASSETS := $(patsubst assets/%, VUE/src/assets/%, $(ASSETS))
-include dev.mk
all :
ifeq ($(DEV_VUE),true)
	make dev
else 
	make build
endif
build : $(wildcard VUE/src/**/*) $(VUE_ASSETS)
	-clear
	cd VUE && \
	npm install && \
	npm run build
dev : build
	-clear
	cd VUE && \
	npm run dev
VUE/src/assets/% : assets/%
	mkdir -p $(dir $@)
	cp $< $@