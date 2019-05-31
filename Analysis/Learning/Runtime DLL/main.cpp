#include <windows.h>
#include <stdio.h>

typedef void (*MYPROC)();

int main()
{
	HINSTANCE hinstlib;
	MYPROC ProcUseless;

	hinstlib = LoadLibrary(TEXT("aDLL3.dll"));

	if(hinstlib != NULL)
		ProcUseless = (MYPROC) GetProcAddress(hinstlib, "DoSomethingUseless");
	else
	{
		printf("Failed to load DLL");
	}

	(ProcUseless)();
}