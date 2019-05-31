#include <emscripten.h>

int main()
{
	// Create file pointer pointing to file.txt as text file
	FILE* fHandle = fopen("file.txt", "r");

	if(!fHandle)
		printf("Failed to load file");
	else
	{
		while(!feof(fHandle))
		{
			char n = fgetc(fHandle);
			printf("%c", n);
		}

		// Close file
		fclose(fHandle);
	}
	
	return 0;
}