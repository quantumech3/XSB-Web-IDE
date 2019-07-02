#include <SDL2/SDL.h>
#include <SDL2/SDL_opengl.h>
#include "SDL_console.h"

SDL_Window* window;
SDL_GLContext* glContext;
Console_tty* console;
SDL_Event e;

int inputHandler(const char* text, void* data, char** output);

int main()
{
	// Initialize SDL
	SDL_Init(SDL_INIT_VIDEO);

	// Initialize an OpenGL window
	window = SDL_CreateWindow("Console", 0, 0, 500, 500, SDL_WINDOW_OPENGL);
	if(!window)
		fprintf(stderr, "++Failed to initialize SDL Window");

	// Initialize GL context
	glContext = SDL_GL_CreateContext(window);
	if(!glContext)
		fprintf(stderr, "++Failed to initialize glContext");
	
	// Initialize console
	console = Console_Create
	(
		window, 
		"font.ttf",
		16,
		SDLK_ESCAPE,
		inputHandler,
		NULL
	);

	// SDL loop
	while(1)
	{
		// Handle SDL events
		while(SDL_PollEvent(&e))
		{
			switch(e.type)
			{
				case SDL_QUIT:
					exit(0);
			}
		}

		// Render console update
		Console_Draw(console);
		SDL_GL_SwapWindow(window);
	}
}

int inputHandler(const char* text, void* data, char** output)
{
	return 0;
}