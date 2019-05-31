EXEC = index.html

all: build

build:
	emcc main.c -o index.html

run:
	emrun --port 80 $(EXEC)

clean:
	rm *.exe *.html *.js *.wasm *.wast *.txt