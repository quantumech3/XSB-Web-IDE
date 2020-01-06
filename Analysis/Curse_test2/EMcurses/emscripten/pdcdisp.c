/* Public Domain Curses */

#include "pdcemscripten.h"

RCSID("$Id: pdcdisp.c,v 1.35 2008/07/14 04:24:52 wmcbrine Exp $")

#include <stdlib.h>
#include <string.h>

#ifdef CHTYPE_LONG

# define A(x) ((chtype)x | A_ALTCHARSET)

chtype acs_map[128] =
{
    A(0), A(1), A(2), A(3), A(4), A(5), A(6), A(7), A(8), A(9),
    A(10), A(11), A(12), A(13), A(14), A(15), A(16), A(17), A(18),
    A(19), A(20), A(21), A(22), A(23), A(24), A(25), A(26), A(27),
    A(28), A(29), A(30), A(31), ' ', '!', '"', '#', '$', '%', '&',
    '\'', '(', ')', '*',

    0x2192, 0x2190, 0x2191, 0x2193,

    '/',

    0x2588,

    '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=',
    '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z', '[', '\\', ']', '^', '_',

    0x2666, 0x2592,

    'b', 'c', 'd', 'e',

    0x00b0, 0x00b1, 0x2591, 0x00a4, 0x2518, 0x2510, 0x250c, 0x2514,
    0x253c, 0x23ba, 0x23bb, 0x2500, 0x23bc, 0x23bd, 0x251c, 0x2524,
    0x2534, 0x252c, 0x2502, 0x2264, 0x2265, 0x03c0, 0x2260, 0x00a3,
    0x00b7,

    A(127)
};

# undef A

#endif

/* draw a cursor at (y, x) */

void PDC_gotoyx(int row, int col)
{
    PDC_LOG(("PDC_gotoyx() - called: row %d col %d from row %d col %d\n",
             row, col, SP->cursrow, SP->curscol));

    EM_ASM_INT({
        term.cursorSet($0, $1);
    }, row, col);
}

/* update the given physical line to look like the corresponding line in
   curscr */

void PDC_transform_line(int lineno, int x, int len, const chtype *srcp)
{
    PDC_LOG(("PDC_transform_line() - called: lineno=%d\n", lineno));

    for (int j = 0; j < len; j++) {
       chtype ch = srcp[j];
       int style = 0;

#ifdef CHTYPE_LONG
       if (ch & A_ALTCHARSET && !(ch & 0xff80))
           ch = (ch & (A_ATTRIBUTES ^ A_ALTCHARSET)) | acs_map[ch & 0x7f];
#ifndef PDC_WIDE
       else
           ch &= ~0xFF00; /* Probably unnecessary */
#endif
#endif
       if (ch & A_REVERSE)
           style |= 1<<0;
       if (ch & A_UNDERLINE)
           style |= 1<<1;

       if (ch & A_COLOR) {
           short fg, bg;

           PDC_pair_content(PAIR_NUMBER(ch & A_COLOR), &fg, &bg);
#ifdef PDC_RGB
           static const unsigned char rgbtab[] = {
               0, 4, 2, 6, 1, 5, 3, 7, 8, 12, 10, 14, 9, 13, 11, 15
           };
           if (fg < sizeof(rgbtab)) fg = rgbtab[fg];
           if (bg < sizeof(rgbtab)) bg = rgbtab[bg];
#endif
           if (ch & A_BOLD)
               fg += 8;
           style |= (bg+1) << 16;
           style |= (fg+1) << 8;
       } else if (ch & A_BOLD) {
           style |= 1<<4;
       }

       EM_ASM_INT({
           term.setChar($0, $1, $2, $3);
       },
#ifdef CHTYPE_LONG
       ch & 0xFFFF,
#else
       ch & 0xFF,
#endif
       lineno, x+j, style);
    }
}
