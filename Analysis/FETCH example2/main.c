#include <stdio.h>
#include <string.h>
#include <emscripten/fetch.h>
#include <emscripten.h>
#include <cinterf.h>

#define TRUE 1
#define FALSE 0
#define bool int

int i = 0;
bool shouldExit = FALSE;



void read_async();

EMSCRIPTEN_KEEPALIVE
void exitNow()
{
    shouldExit = TRUE;
}

void read_success(emscripten_fetch_t *fetch) {
    char buff[40];

    for(int i = 0; i < 40; i++)
        buff[i] = ' ';

    strcpy(buff, fetch->data);
    

    printf("Attempting to execute command: %s\n", buff);
    if(xsb_command_string(buff))
    {
        printf("ERROR: XSB failed to execute command: %s\n", xsb_get_error_message());
    }

    emscripten_fetch_close(fetch);
    if ((strlen(fetch->data) > 0 || i++ == 5)) {
        read_async();
    }
}

void read_fail(emscripten_fetch_t *fetch) {
    emscripten_fetch_close(fetch);
}

void read_async() {
    emscripten_fetch_attr_t attr;
    emscripten_fetch_attr_init(&attr);
    strcpy(attr.requestMethod, "GET");
    attr.attributes = EMSCRIPTEN_FETCH_LOAD_TO_MEMORY;
    attr.onsuccess = read_success;
    attr.onerror = read_fail;

    if(!shouldExit)
        emscripten_fetch(&attr, "___terminal::read");
}

int main() {
    if(xsb_init_string("/"))
    {
        printf("ERROR: XSB failed to initialize");
    }
    read_async();
}
