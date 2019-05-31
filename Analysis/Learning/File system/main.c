#include <stdio.h>

int main()
{
	// Attempt to open file
	FILE* file = fopen("text.txt", "r");

	// If file could not be opened then throw an error
	if(!file)
	{
		fprintf(stderr, "Could not open file!\n");
		return -1;
	}

	// Print contents of file
	while(!feof(file))
		printf("%c", fgetc(file));
	printf("\n");
	
	return 0;
}