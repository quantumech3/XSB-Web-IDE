// This parser assumes preconditioning to get rid of whitespace

program =
	(statement _*)*

statement =
	atom '.' /
    operator '.' /
    functor '.' /
    atom _* operator _* statement /
    functor _* operator _* statement 

functor = 
	atom '(' _* ')' /
    atom '(' (atom _* ',' _*)* atom _* ')'

operator =
	',' / ';' / ':-' / '+' / '-' / '*' / '/'

atom = 
	[A-z] [0-z]*

_ "whitespace" = 
    ' ' / '\t' / '\n' / '\r'