#include <stdio.h>
#include <unistd.h>

extern FILE *fdopen(int fildes, const char *type);

int main()
{
	// Creates 1 read and 1 write handle to a pipe
	// pipeHandles[0] = read
	// pipeHandles[1] = write
	int pipeHandles[2] = {0, 0};

	// Attempt to create pipes
	if(pipe(pipeHandles) == 0)
	{
		// Cast read end of pipeHandle to FILE handle
		// Allows C to treat a pipe like a file
		FILE* pipeOutput = fdopen(pipeHandles[0], "r");
		FILE* pipeInput = fdopen(pipeHandles[1], "w");

		fprintf(pipeOutput, "Hello world");
		
		fread()

		// 
		// MAKE SURE YOU TRY WITH BOTH GCC AND EMCC SINCE YOU ARE TRYING TO REPRODUCE THE ERROR
		// 
		// TODO: Reassign the stdin pipe handle like on line 533 of init_xsb.c
	}
}