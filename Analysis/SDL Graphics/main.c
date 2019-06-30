#include <emscripten.h>
#include <SDL/SDL.h>
#include <stdio.h>
#include <string.h>

extern void InitVideo();
extern void Redraw();

extern char *text;
extern char *composition;
extern Sint32 cursor;
extern Sint32 selection_len;

void Loop()
{
	SDL_Event event;
	if (SDL_PollEvent(&event)) {
		switch (event.type) {
			case SDL_QUIT:
				/* Quit */
				break;
			case SDL_TEXTINPUT:
				/* Add new text onto the end of our text */
				strcat(text, event.text.text);
				break;
			case SDL_TEXTEDITING:
				/*
				Update the composition text.
				Update the cursor position.
				Update the selection length (if any).
				*/
				composition = event.edit.text;
				cursor = event.edit.start;
				selection_len = event.edit.length;
				break;
		}
	}
	Redraw();
}

int main(int argc, char *argv[])
{
    InitVideo();
    /* ... */

    SDL_StartTextInput();
	emscripten_set_main_loop(Loop, -1, 1);
    SDL_Quit();

    return 0;
}