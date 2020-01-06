//
//  Matrix.cpp
//  Matrix Row Reducer
//
//  Created by Gabe Montague on 12/31/16.
//  Copyright © 2016 Gabe Montague. All rights reserved.
//

#include <iostream>
#include <string>

#include "AdaptedConsole.hpp"

using std::string;

int main(int argc, char const *argv[]) {
    
    using adaptedConsole::cin;
    using std::cout;
    using std::endl;
    
    bool success = false;
    
    while (!success) {
	cout << "mesage" << endl;
	string msg;
	cin >> msg;
	cout << msg << endl;
    }
    
    return 0;
}