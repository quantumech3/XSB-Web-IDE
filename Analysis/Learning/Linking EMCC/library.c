/**
 * Compiled with the following:
 * > emcc library.c -o library.wasm -s SIDE_MODULE=1
*/

#include "library.h"

int getNumber()
{
	// Show side module using a system library that the main module does not import
	printf("getNumber() is being called\n");
	
	// Return value to be printed by main module
	return 10;
}