#include <emscripten.h>
#include <stdio.h>

EMSCRIPTEN_KEEPALIVE
int sum_arr(int* arr, int length)
{
	int sum = 0; 

	for(int i = 0; i < length; i++)
	{
		printf("%d\n", arr[i]);
		sum += arr[i];
	}
	
	return sum;
}