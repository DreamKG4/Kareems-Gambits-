function checkRange(x,low,high)
{
	var x; var low; var high;
	var result = true;
	if (x < low || x > high)
		result = false;
	return result;
}
function charAtPlace(x, y, z)
{
	var x; var y; var z; var result = false;
	if (x.charAt(y-1) == z)
		result = true;
	return result;
}
function checkForChar(x, y)
{
	var x; var y; var i; var lgth; var result = false;
	lgth = x.length;
	for (i=0; i < lgth; i++)
	{
		if (x.charAt(i) == y)
			result = true;
	}
	return result;
}
function checkPercent(x, y, z)
{
	var x; var y; var z; var percent;
	percent = (y/100)*x;
	if (z == "y")
		return (x - percent);
	else
		return percent;
}
function checkWord(x,y)
{
	var x; var y; var spell = true;
	if (x != y)
		spell = false;
	return spell;
}
function buildTable(rows, cols, fill, style)
{	
	var rows; var cols; var fill; var ranNum;
	var i; var j; var style;
	document.write("<link href='" + style + "' rel='stylesheet' type='text/css' />");
	document.write("<div id='content'><p>&nbsp;</p>");
	document.write("<table width = '60%' border = '1' align = 'center' cellpadding = '5' cellspacing = '5'>");
	ranNum = (rows + 1) * (cols + 1);
	for (i = 0; i < rows; i++)
	{
		document.write("<tr>");
		for (j = 0; j < cols; j++)
		{
			if (fill == "empty")
				document.write("<td width = '" + (1/cols) + "%'><h1>&nbsp;<br /></h1> </td>");
			if (fill == "random")
			{
				entry = parseInt(Math.random()*ranNum)+1;
				document.write("<td width = '" + (1/cols) + "%'><h1>" + entry + "</h1></td>");
			}
			if (fill == "prompt")
			{
				entry = prompt("Enter a value for the cell in row " + (i + 1) + ", column " + (j + 1));
				document.write("<td width = '" + (1/cols) + "%'><p>" + entry + "</p></td>");
			}
		}
		document.write("</tr>");
	}
	document.write("</table> </div>");
}