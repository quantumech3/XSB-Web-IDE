#include <iostream>
#include <string>
#include <fstream>
//#include "AdaptedConsole.hpp"

using std::string;
using std::getline;
using std::fstream;

int main()
{
	//using adaptedConsole::cin;
	using std::cout;
	using std::endl;

	// Load file
	string line;
	fstream file("/files/text.txt");

	// Get first line of file
	getline(file, line);

	// Print first line of file
	cout << line << endl;
}