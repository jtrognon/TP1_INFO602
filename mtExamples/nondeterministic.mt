/*  States */
q0
q1

/*  Input symbols */
a
b

/*  Tape alphabet */
a
b
A
B
#

/*  Blank symbol */
#

/*  Initial state */
q0

/*  Final states */
q1

/*  Transitions */
q0,a->q0,A,R
q0,a->q1,A,R
q0,b->q0,B,R
q0,#->q1,#,L

/* Initial tape */
aaabb