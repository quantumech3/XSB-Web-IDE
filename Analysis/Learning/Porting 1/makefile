# Windows doesnt parse wildcards into their respective strings like a normal terminal, so I made a makefile to do it. I hate windows >:(

all:
	emcc webp.c $(wildcard libwebp/src/*/*.c) -I libwebp -s EXPORT_ALL=1 -s LINKABLE=1 -o index.html -s EXTRA_EXPORTED_RUNTIME_METHODS="["cwrap"]" --pre-js webp.js -s ALLOW_MEMORY_GROWTH=1

run:
	emrun --port 80 --no_browser .