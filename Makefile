.PHONY: all vue dev
DEV_VUE = false
ASSETS := $(wildcard assets/*)
VUE_ASSETS := $(patsubst assets/%, VUE/src/assets/%, $(ASSETS))
-include dev.mk
all :
ifeq ($(DEV_VUE),false)
	make vue
else 
	make dev
endif
vue : $(wildcard VUE/src/**/*) $(VUE_ASSETS)
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