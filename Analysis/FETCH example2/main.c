#include <stdio.h>
#include <string.h>
#include <emscripten/fetch.h>
#include <cinterf.h>

int i = 0;

void read_async();

void read_success(emscripten_fetch_t *fetch) {
    
    printf("Attempting to execute command");
    if(xsb_command_string(fetch->data))
    {
        printf("ERROR: XSB failed to execute command");
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
