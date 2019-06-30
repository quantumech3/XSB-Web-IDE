CC = emcc
all: move_owl.c
	$(CC) move_owl.c -O2 -s USE_SDL=2 -s USE_SDL_IMAGE=2 -s SDL2_IMAGE_FORMATS='["png"]' --preload-file assets/owl.png -o move_owl.html

