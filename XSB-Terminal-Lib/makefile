build:
	emcc -o xsbInterpreter.js -s FETCH=1 -s NO_EXIT_RUNTIME=0 ./src/xsbInterpreter.c -s TOTAL_MEMORY=1024MB -s USE_PTHREADS=1 -I ./src/emu -I ./src/config --preload-file "./src/xsbDir@/" ./src/config/saved.o/xsb.o -Oz 

debug_build:
	emcc -o xsbInterpreter.js -s FETCH=1 -s NO_EXIT_RUNTIME=0 ./src/xsbInterpreter.c -s TOTAL_MEMORY=1024MB -s USE_PTHREADS=1 -I ./src/emu -I ./src/config --preload-file "./src/xsbDir@/" ./src/config/saved.o/xsb.o -Oz -DSHOULD_DEBUG