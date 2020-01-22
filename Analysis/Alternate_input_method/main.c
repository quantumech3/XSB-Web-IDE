#include <emscripten.h>
#include <stdio.h>
#include <cinterf.h>

char inputBuffer[80];
char outputBuffer[80];

EMSCRIPTEN_KEEPALIVE
int getInputBufferPtr()
{
	return (int)inputBuffer;
}

EMSCRIPTEN_KEEPALIVE
void print()
{
	xsb_query_string_string_b(inputBuffer, outputBuffer, 80, NULL, ";\n");
	printf("\n%s\n", outputBuffer);
	xsb_close_query();
}

int main()
{
	xsb_init_string("/");
}