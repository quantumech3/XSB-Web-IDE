#include <stdio.h>
#include <string.h>
#include <emscripten/fetch.h>
#include <cinterf.h>

int i = 0;

void read_async();

void read_success(emscripten_fetch_t *fetch) {
    char buff[40];
    int INPUT_LENGTH = (int)fetch->data[0];

    for(int i = 0; i < 40; i++)
        buff[i] = ' ';
    
    for(int i = 0; i < INPUT_LENGTH; i++)
        buff[i] = fetch->data[i + 1];

    buff[INPUT_LENGTH] = '\0';

    printf("Attempting to execute command of length %i: %s\n", (int)INPUT_LENGTH, buff);
    if(xsb_command_string(buff))
    {
        printf("no.");
    }
    else
    {
        printf("yes.");
    }
    

    emscripten_fetch_close(fetch);
    if (strlen(fetch->data) > 0 || i++ == 5) {
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
    emscripten_fetch(&attr, "___terminal::read");
}

int main() {
    if(xsb_init_string("/"))
    {
        printf("ERROR: XSB failed to initialize");
    }
    read_async();
}
