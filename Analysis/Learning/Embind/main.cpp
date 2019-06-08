#include <emscripten/bind.h>
#include <vector>

using namespace emscripten;

// Method that gets called by JS to return a vector
std::vector<int> returnVector()
{
	// Initialize vector with values {4, 5, 6}
	std::vector<int> vec;
	vec.push_back(4);
	vec.push_back(5);
	vec.push_back(6);

	return vec;
}

// Register vector and factory method
EMSCRIPTEN_BINDINGS(Module)
{
	register_vector<int>("vector<int>"); // <-- Register vector<int> as a JS datatype
										 	 // You are able to do the same thing with maps..
	function("returnVector", &returnVector); // as well. Just swap out 'register_vector' for 'register_map'
}