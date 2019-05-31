all: build

build:
	emcc main.cpp -o index.html --js-library cLib.js -s EXTRA_EXPORTED_RUNTIME_METHODS="["UTF8ToString"]"

run:
	emrun . --port 80

clean:
	rm *.wasm *.html

