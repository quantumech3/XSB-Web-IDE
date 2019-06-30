#include <emscripten.h>
#include <SDL2/SDL.h>
#include <stdio.h>

SDL_Window* window;
SDL_Renderer* renderer;

struct Color
{
	int r, g, b;
};

void render(void* data)
{
	struct Color* bgColor = data;

	SDL_SetRenderDrawColor(renderer, bgColor->r, bgColor->g, bgColor->b, 255);
	SDL_RenderClear(renderer);

	bgColor->r++;
}

int main()
{
	SDL_Init(SDL_INIT_VIDEO);

	SDL_CreateWindowAndRenderer(960, 720, 0, &window, &renderer);

	struct Color bgColor = {.r = 0, .g = 0, .b = 0};
	emscripten_set_main_loop_arg(render, &bgColor, -1, 1);
}