#include <emscripten.h>

int main()
{
	// Open the launch file
	FILE* file = fopen(".vscode/launch.json", "r");

	// Close the launch file like a good lawbiding citizen
	fclose(file);
}