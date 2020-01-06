SOURCE_NAME=main
EXEC=$(SOURCE_NAME).out
SOURCE_FILE=$(SOURCE_NAME).cpp

all: clean build

build:
	g++ $(SOURCE_FILE) -o $(EXEC) -lncurses -lm

clean:
	rm *.out

run:
	./$(EXEC)