#include <emscripten.h>
#include <src/webp/encode.h>
#include <bits/alltypes.h>
#include <stdlib.h>

int version()
{
	return WebPGetEncoderVersion();
}

uint8_t* createBuffer(int width, int height)
{
	return malloc(width * height);
}

void destroyBuffer(uint8_t* p)
{
	free(p);
}


int result[2];
int* encode(uint8_t* img_in, int width, int height, float quality)
{
	uint8_t* img_out;
	size_t size;

	size = WebPEncodeRGBA(img_in, width, height, width * 4, quality, &img_out);
	
	result[0] = size;
	result[1] = (int)img_out;

	return result;
}