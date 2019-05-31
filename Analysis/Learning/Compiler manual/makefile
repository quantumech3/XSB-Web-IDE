SRC = main.o

all: main.exe

main.exe: $(SRC)
	gcc $^ -o $@

%.o: %.c
	gcc -c $^ -o $@