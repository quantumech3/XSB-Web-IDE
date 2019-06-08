#include <stdio.h>
#include <emscripten.h>

// This JS method, add(), gets called by C methods to... 
// ..add 2 numbers
EM_JS(int, add, (int a, int b), {
	console.log("I am now adding 2 integers...")
	return a + b
});

int main()
{
	// Demonstrate the add() js method
	add(2, 5);

	// Demonstrate inline JS
	int a = 5;
	int b = 5;
	// Should print 10
	printf("%d\n", EM_ASM_INT({
		return $0 + $1;
	}, a, b));
}