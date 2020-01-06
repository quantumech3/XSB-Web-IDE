/**
 * This example initializes NCurses, gets user input and prints user input to the center of the screen.
 */

#include <curses.h>
#include <stdlib.h>

int main()
{
	// Initialize NCurses
	initscr();

	// Get width and height of console window
	int winWidth, winHeight;
	getmaxyx(stdscr, winHeight, winWidth);

	// Prompt user for input
	printw("Please input some text: ");
	
	// Get input from user
	// (getstr() automatically calls refresh())
	char* input = malloc(128);
	getstr(input);

	// Print user input to the center of the screen
	move(winHeight / 2, winWidth / 2);
	printw("%s", input);

	// Refresh screen so printed text shows
	refresh();
	
	// Pause program until the user presses a key
	getch();

	// De-initialize NCurses
	endwin();
}