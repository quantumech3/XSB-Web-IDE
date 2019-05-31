#ifdef EXPORT
#define DLL __declspec(dllexport)
#else
#define DLL __declspec(dllimport)
#endif

// Bring printf method into scope
int __cdecl printf(const char* format);

DLL void HelloWorld();