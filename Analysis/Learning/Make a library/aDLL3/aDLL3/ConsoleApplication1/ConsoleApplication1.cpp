// ConsoleApplication1.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <Windows.h>

// Function pointer of type void that takes no arguements
typedef void (*VoidFuncPtr)();

int main()
{
	// Handle to DLL
	HINSTANCE dllHandle;
	
	// Function pointer that WILL BE pointing to 'DoSomethingUseless()'
	VoidFuncPtr dllDoSomethingUseless;

	// Attempt to load DLL into memory
	dllHandle = LoadLibrary(TEXT("aDLL3.dll"));

	if (dllHandle != NULL)
	{
		// Attempt to load 'DoSomethingUseless()' from the dll 'aDLL3.dll'
		dllDoSomethingUseless = (VoidFuncPtr)GetProcAddress(dllHandle, "DoSomethingUseless");

		if (dllDoSomethingUseless == NULL)
			printf("Failed to load DoSomethingUseless(): Error code %d", GetLastError());

		// Call 'DoSomethingUseless()' function from DLL
		(dllDoSomethingUseless)();

		// Close dll
		FreeLibrary(dllHandle);
	}	
	else
	{
		printf("Failed to load DLL: Error code %d", GetLastError());
	}
}
