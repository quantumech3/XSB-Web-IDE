all: Main.exe

# Link object code with import library
Main.exe: Main.o HelloDLL.dll HelloDLL.lib
	gcc Main.o -o Main.exe -L . -lHelloDLL

# Compile object code
Main.o: Main.c 
	gcc -c Main.c -o Main.o

# Create DLL and import library
HelloDLL.lib HelloDLL.dll:
	gcc HelloDLL.c -shared -D EXPORT -Wl,--out-implib,HelloDLL.lib -o HelloDLL.dll

clean:
	rm *.lib
	rm *.dll
	rm *.o
	rm *.exe