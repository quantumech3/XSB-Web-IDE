/**
 * Compiled with the following:
 * > set EMCC_FORCE_STDLIBS=1
 * > emcc main.c -o main.js -s MAIN_MODULE=1
*/

#include "library.h"
#include <stdio.h>

int main()
{
	// Print value from getNumber()
	printf("%d\n", getNumber());
}