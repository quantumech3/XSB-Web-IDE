#include <stdio.h>
#include <string.h>
#include <emscripten/fetch.h>
#include <cinterf.h>

int i = 0;

void read_async();

/**
 * Called when user input is successfully obtained through XHR
 */ 
void read_success(emscripten_fetch_t *fetch)
{
	// Empty character buffer
	char buff[256];

	// Obtain length of user input in characters. The first character of every command passed to C contains the length of the input
	int INPUT_LENGTH = (int)fetch->data[0];

	// Set every character of input buffer to ' '
	for(int i = 0; i < 40; i++)
		buff[i] = ' ';
	
	// Set buff to the value of the user's input
	for(int i = 0; i < INPUT_LENGTH; i++)
		buff[i] = fetch->data[i + 1];

	// Add null terminator at the end of input buffer so XSB doesnt overrun the users input, read garbage data and crash
	buff[INPUT_LENGTH] = '\0';

	// Print debug message if this program is compiled using 'debug_build' command
	#ifdef SHOULD_DEBUG
	printf("Attempting to execute command of length %i: %s\n", (int)INPUT_LENGTH, buff);
	#endif

	// Attempt to execute the user's XSB command. Print 'Yes' if the user's command is true, else print 'no'
	if(xsb_command_string(buff))
	{
		printf("\nno.\n");
	}
	else
	{
		printf("\nyes.\n");
	}
	
	emscripten_fetch_close(fetch);

	if (strlen(fetch->data) > 0 || i++ == 5) 
	{
		read_async();
	}
}

void read_fail(emscripten_fetch_t *fetch) 
{
	emscripten_fetch_close(fetch);
}

void read_async() 
{
	emscripten_fetch_attr_t attr;
	emscripten_fetch_attr_init(&attr);
	strcpy(attr.requestMethod, "GET");
	attr.attributes = EMSCRIPTEN_FETCH_LOAD_TO_MEMORY;
	attr.onsuccess = read_success;
	attr.onerror = read_fail;
	emscripten_fetch(&attr, "___terminal::read");
}

int main() 
{
	// Attempt to initialize XSB
	if(xsb_init_string("/"))
	{
		// Print error message if XSB fails to initialize
		printf("ERROR: XSB failed to initialize");
	}
	
	// Execute initial XSB command (XSB crashes when the first command you type is invalid)
	xsb_command_string("writeln('XSB successfully initialized!').");

	// Start user input loop
	read_async();
}
