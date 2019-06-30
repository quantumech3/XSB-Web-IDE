#include <emscripten.h>
#include <SDL2/SDL.h>
#include <stdio.h>

SDL_Window* window;
SDL_Renderer* renderer;

struct Color
{
	int r, g, b;
};

/**
 * Main loop for main.c
 * When the user holds the 'a' key: Image becomes more red
 * When the user holds the 'd' key: Image becomes less red
 */
void render(struct Color* bgColor)
{
	SDL_SetRenderDrawColor(renderer, bgColor->r, bgColor->g, bgColor->b, 255);
	SDL_RenderClear(renderer);

	SDL_Event event;

	if(SDL_PollEvent(&event))
	{
		// Test to see if the 'a' or 'd' keys were pressed
		switch(event.key.keysym.sym)
		{
			// In the case that the 'a' key is pressed
			case SDLK_a:
				bgColor->r++;
				break;
			// In the case that the 'd' key is pressed
			case SDLK_d:
				bgColor->r--;
				break;
		}
	}
}

int main()
{
	SDL_Init(SDL_INIT_VIDEO);

	SDL_CreateWindowAndRenderer(960, 720, 0, &window, &renderer);

	struct Color bgColor = {.r = 0, .g = 0, .b = 0};
	emscripten_set_main_loop_arg(render, &bgColor, -1, 1);
}