/** 
 * This example code does the following:
 * 		1) Asks the user for his/her name
 * 		2) Gets name that the user inputted
 * 		3) Prints the name back to the user
 * 		4) Opens a text file, 'example-text-file.txt', containing the text 'That name is stupid'
 * 		5) Prints text from text file
 */

#include <iostream>
#include <fstream>
#include <string>
#include "AdaptedConsole.hpp"

// In order for the library to work, you must use adaptedConsole::cin instead of std::cin
using adaptedConsole::cin;
// You can use the standard library for everything else though
using std::cout;
using std::endl;
using std::fstream;
using std::string;
using std::getline;


int main()
{
	// Prompt user for his/her name and use Emscripten-Console's 'cin' to get user input
	cout << "What is your name? " << endl;
	string name;
	cin >> name;

	// Print the users name
	cout << "Your name is: " << name << endl;

	// Instantiate handle to 'example-text-file.txt'
	// PREFACE ALL PATHS WITH '/' OR FILE HANDLING WON'T WORK
	fstream textFile = fstream("/example-text-file.txt");

	// Get first line of text from 'example-text-file.txt'
	string text;
	getline(textFile, text);

	// Print text from text file
	cout << text << endl;

	// Close file like a responsable human being
	fclose(textFile);
}