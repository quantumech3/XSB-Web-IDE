#include <ncurses.h>
#include <math.h>

#define ESC_KEY 27

using namespace std;

int main()
{	
	initscr();

	int scrW, scrH; // Screen width and height
	getmaxyx(stdscr, scrH, scrW); // Get width and height of 'standard' master window

	// Print text in center of screen
	mvprintw(scrH / 2, scrW / 2, "Hello this is in the center of the screen");

	int cursorX, cursorY;
	getyx(stdscr, cursorY, cursorX); // Get position of cursor relative to the standard window

	char* str;
	getstr(str);
	printw(str);

	getch();
	endwin();

	return 0;
}