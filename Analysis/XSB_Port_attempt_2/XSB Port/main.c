#include <cinterf.h>
#include <stdio.h>

int main()
{
	if(xsb_init_string("/"))
	{
		// xsb_get_init_error_message() returns the last error that occured while XSB initializes the runtime
        printf("++XSB failed to initialize with error: %s\n", xsb_get_init_error_message());
        exit(-1);
	}
	else // 2) If XSB successfully initialized
    {
        // Print 'XSB successfully initialized'
        printf("XSB successfully initialized!\n");
 
        // Load 'Hello world' script

        xsb_command_string("consult('hello.P').");

        // Terminate XSB
        xsb_close();
    }
}
