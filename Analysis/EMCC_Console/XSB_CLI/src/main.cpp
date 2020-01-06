#include <iostream>
#include <string>
#include "AdaptedConsole.hpp"

extern "C"
{
	#include "cinterf.h"
}

using adaptedConsole::cin;
using std::cout;
using std::endl;
using std::string;

int main()
{
	if(!xsb_init_string("/"))
	{
		string userInput;
		while(cin >> userInput)
		{
			char* input = (char*)userInput.c_str();
			// Pass user input into XSB interpreter
			xsb_command_string(input);
		}
	}
	else
	{
		// Print XSB initialization error
		std::cerr << "XSB failed to initialize";
	}
}