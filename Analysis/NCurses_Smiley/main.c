#include <curses.h>
#include <stdlib.h>

int main()
{
	// Initialize NCurses
	initscr();

	// Hard coded smiley face
	char smiley[5][11] = {
		"  #     # ",
		"          ",
		"#        #",
		" #      # ",
		"  ######  "
	};

	// Print each row of 'smiley'
	for(int y = 0; y < 5; y++)
	{
		move(y, 0);
		printw(smiley[y]);
	}

	// Pause program until user input
	getch();

	// De-initialize NCurses
	endwin();
}