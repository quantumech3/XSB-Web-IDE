#include <emscripten.h>
#include <stdio.h>

// Tell the compiler not to eliminate this method as dead-code
EMSCRIPTEN_KEEPALIVE
int getNumber();