
#include <iostream>
#include <string>

#include "AdaptedConsole.hpp"
using std::string;

int main(int argc, char const *argv[])
{
	using std::cout;
	using std::endl;
	using adaptedConsole::cin;

	//cout << num << endl;
	string buff;
	cout << "Enter the number of rows: ";
	cin >> buff;
	cout << "yay";

	return 0;
}