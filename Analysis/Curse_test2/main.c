#include <cinterf.h>
#include <stdio.h>

#ifdef EMSCRIPTEN
#include <emscripten.h>
#endif


int main()
{
	if(xsb_init_string("/"))
		printf("++XSB failed to initialize with error: %s", xsb_get_error_message());
	else
	{
		printf("Closing XSB");
		xsb_close();
	}

	return 0;
}