// Compiled with
// emcc main.c -o index.html -s USE_SDL=2 -s USE_SDL_TTF=2 -s USE_SDL_IMAGE=2 --preload-file FreeSans.ttf 

#include <emscripten.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>

SDL_Renderer* renderer;
SDL_Window* window;

void initSDL()
{
	// Init SDL
	SDL_Init(SDL_INIT_VIDEO);

	// Init True Type Font (VERY IMPORTANT!)
	TTF_Init();

	SDL_CreateWindowAndRenderer(500, 500, 0, &window, &renderer);
}

int main()
{
	// Initialize SDL and TTF (The font handler library)
	initSDL();

	// Load the 'Blazed font' with a 10pt sized font from the file system
	TTF_Font* font = TTF_OpenFont("FreeSans.ttf", 30);

	// Render white text 'Hi' with the 'Blazed' font
	SDL_Color white = {255,255,255,255};
	SDL_Surface* rawText = TTF_RenderText_Blended(font, "Hi", white);

	// Convert SDL_Surface to texture
	SDL_Texture* text = SDL_CreateTextureFromSurface(renderer, rawText);

	// Generate texture dimension metadata (Not mandatory but text looks bad without scaling information)
	SDL_Rect dest = {.x=0, .y=0, .w=50, .h=50};
	SDL_QueryTexture(text, NULL, NULL, &dest.w, &dest.h);

	SDL_RenderCopy(renderer, text, NULL, &dest);
}