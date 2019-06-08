#include <stdio.h>

// Handle to 'text.txt'
FILE* file;

int main()
{
	// Create new 'text.txt' file
	file = fopen("text.txt", "w+");

	// Write 'Hello world' to it
	fwrite("Hello world\n", sizeof(char), 13, file);

	// Close file handler
	fclose(file);

	// Get read handle to file
	file = fopen("text.txt", "r");

	// Print contents of file
	while(!feof(file))
	{
		printf("%c", fgetc(file));
	}

	// Print newline to make Emscripten happy
	printf("\n");

	// Close file handler like a good boy
	fclose(file);
}