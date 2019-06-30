#include <emscripten.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#define TRUE 1
#define FALSE 0

// Global render handles
SDL_Window* window;
SDL_Renderer* renderer;

struct ImgPos
{
	int x, y, w, h;
};

void render(void* arg)
{
	// Get data passed from main thread
	struct ImgPos* pos = arg;

	SDL_RenderClear(renderer);

	// Display owl.png
	SDL_Rect dest = {.x = pos->x, .y = pos->y, .w = pos->w, .h = pos->h};
	SDL_Texture* texture = IMG_LoadTexture(renderer, "assets/owl.png");
	if(!texture)
		printf("++Failed to load assets/owl.png");
	SDL_RenderCopy(renderer, texture, NULL, &dest);

	// Update position of image
	pos->x++;
}

int main()
{
	// Initialize SDL
	SDL_Init(SDL_INIT_VIDEO);

	// Create window and renderer handles
	SDL_CreateWindowAndRenderer(960, 720, 0, &window, &renderer);

	// Fill screen with green
	SDL_SetRenderDrawColor(renderer, 0, 64, 0, 255);

	// Launch render thread
	struct ImgPos pos = {.x = 0, .y = 0, .w = 100, .h = 100};
	emscripten_set_main_loop_arg(render, &pos, -1, TRUE);
}