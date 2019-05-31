#include <stdio.h>

// Since this example is written in a CPP file, all externals must be declared as "C"
// If you wrote this in C, you would not have to sepcify this as 'extern'
extern "C"
{
	void closure();
}

// Invoke the example JS methods
int main()
{
	closure();
}