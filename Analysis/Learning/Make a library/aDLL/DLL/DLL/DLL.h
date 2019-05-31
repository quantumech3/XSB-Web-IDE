#pragma once
#ifdef DLL_EXPORT
#define DLL __declspec(dllexport)
#else
#define DLL __declspec(dllimport)
#endif

extern "C" DLL const char* HelloWorld();