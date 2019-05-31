#include "HelloDLL.h"

// Import system() into scope
int system(const char* command);

int main()
{
	HelloWorld();
	system("pause");
}