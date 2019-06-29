#include <stdio.h>

int main()
{
	for(int i = 0; i < 10; i++)
	{
		char* input = "                                ";
		fgets(input, 33, stdin);
		printf("%s\n", input);
	}

}