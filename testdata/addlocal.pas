program locals(input, output);
    procedure addlocal;
    var i: integer; (*The variable i is local to the procedure addlocal*)
    begin
	i:=i+1;
    writeln(i:5);
    end; (*of addlocal*)
begin
    addlocal
end.