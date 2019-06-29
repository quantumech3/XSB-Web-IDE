#include <cinterf.h>
#include <stdio.h>

int main()
{
	if(xsb_init_string("/"))
	{
		fprintf(stderr, "++XSB failed to initialize");
	}
	else
	{
		for(int i = 0; i < 10; i++)
		{
			char* command = "          ";
			fgets(command, 10, stdin);
			xsb_command_string("");
		}
			
	}
	
}