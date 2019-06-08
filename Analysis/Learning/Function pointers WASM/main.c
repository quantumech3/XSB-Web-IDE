#include <stdio.h>
#include <stdlib.h>
#include <emscripten.h>

// Define a type for a function pointer that retruns an integer and takes no arguements
typedef int (*intFPtr)();

// This method gets called by JS as a way to pass in the address of the JS method
EMSCRIPTEN_KEEPALIVE
void callFuncPtr(int rawFuncAddr)
{
	// Cast address to function pointer
	intFPtr func = (intFPtr)(rawFuncAddr);

	// Invoke the function pointer and print its result
	printf("%d\n", func());
}
