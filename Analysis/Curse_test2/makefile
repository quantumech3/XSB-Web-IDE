run:
	emrun --port 8484 ./Out/
	
build:
	emcc main.c ./XSB/config/saved.o/xsb.o -o ./Out/index.js -Oz --pre-js ./prejs.js --preload-file "./XSB/XSB_DIR@/" -I ./XSB/emu -I ./XSB/config -s USE_PTHREADS=1 -s TOTAL_MEMORY=1024MB -v

simple_build:
	emcc main.c -o ./Out/index.js --pre-js prejs.js