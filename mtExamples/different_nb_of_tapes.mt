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
q0,a##->q0,#AB,RRR
q0,b##->q0,#BA,RRR
q0,###->q1,####,LRL

/* Initial tape */
aaabb