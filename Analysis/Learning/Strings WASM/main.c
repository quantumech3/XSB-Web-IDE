#include <stdio.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
void cprint(char* string)
{
	printf("%s\n", string);
}