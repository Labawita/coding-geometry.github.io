Object.defineProperty(this, "VERSION",
{
    "value": "SERVER"
});

function $update()
{
    if (checkWindowSize)
    {
        if (innerWidth != 1000 || innerHeight != 600)
        {
            open(location.href, "", "width = 1000, height = 600");
            close();
            return;
        }
    }
    else if (!confirmed)
    {
        if (innerWidth != 1000 || innerHeight != 600)
        {
            if (confirm("U are not using the recommended window size (1000 x 600), do u wanna use it?"))
            {
                open(location.href, "", "width = 1000, height = 600");
                close();
                confirmed = true;
                localStorage.setItem("confirmed", true);
                return;
            }
            confirmed = true;
            localStorage.setItem("confirmed", true);
        }
    }
    setTimeout($update, 100);
}

confirmed = localStorage.getItem("confirmed");
if (confirmed == null)
{
    confirmed = false;
}
checkWindowSize = false;

([$textarea1, $textarea2] = document.querySelectorAll("textarea"))[0]
.placeholder = "Enter code";
[canvas] = document.querySelectorAll("canvas");
context = canvas.getContext("2d");

function $proccess()
{
    context.clearRect(0, 0, 600, 600);
    $textarea2.value = "";
    if ($textarea1.value === "")
    {
        //$textarea2.value = "Empty source code";
        //$textarea2.style.color = "#ffffff";
        return;
    }
    try
    {
        $proccess0();
        $textarea2.style.color = "#ffffff";
    }
    catch(e)
    {
        $textarea2.value = e.message + "\n\n" +
        "Click the 'Help' button for help";
        $textarea2.style.color = "#ff5555";
    }
}

function $proccess0()
{
    var s = $textarea1.value.split("\n");
    for (var i in s)
    {
        var x = s[i];
        if (x === "" || x[0] === "#")
        {
            continue;
        }
        var y = x.split(" ");
        switch (y[0])
        {
            case "setpoint":
                var name = y[1], value = y[2];
                if (name == undefined
                ||  name === "")
                {
                    throw new Error("Syntax error: missing identifier (line " + [i*1 + 1][0] + ")");
                }
                if (value == undefined
                ||  value === "")
                {
                    throw new Error("Syntax error: missing value (line " + [i*1 + 1][0] + ")");
                }
                if (!$isIdentifier(name))
                {
                    throw new Error("Illegal identifier (line " + [i*1 + 1][0] + ")");
                }
                if (value.includes(","))
                {
                    var [a, b] = value.split(",");
                    Function("_" + name + " = Point(" + i + ", " + a + ", " + b + "); render(_" + name + ", '" + name + "');")();
                }
                else if ($isIdentifier(value))
                {
                    try
                    {
                        Function("_" + name + " = _" + value + "; render(_" + name + ");")();
                    }
                    catch(e)
                    {
                        throw new Error("Point " + value + " is not defined (line " + [i*1 + 1][0] + ")");
                    }
                }
                else
                {
                    throw new Error("Syntax error: expected other point or <x>,<y> (line " + [i*1 + 1][0] + ")");
                }
                break

            case "setvector":
                var name = y[1], value = y[2];
                if (name == undefined
                ||  name === "")
                {
                    throw new Error("Syntax error: missing identifier (line " + [i*1 + 1][0] + ")");
                }
                if (value == undefined
                ||  value === "")
                {
                    throw new Error("Syntax error: missing value (line " + [i*1 + 1][0] + ")");
                }
                if (!$isIdentifier(name))
                {
                    throw new Error("Illegal identifier (line " + [i*1 + 1][0] + ")");
                }
                if (value.includes(","))
                {
                    var [a, b] = value.split(",");
                    if (a === ""
                    ||  a == undefined)
                    {
                        throw new Error("Syntax error 113 (line " + [i*1 + 1][0] + ")");
                    }
                    if (b === ""
                    ||  b == undefined)
                    {
                        throw new Error("Syntax error 118 (line " + [i*1 + 1][0] + ")");
                    }
                    if ($isIdentifier(a) && $isIdentifier(b))
                    {
                        if (a === "" || b === "")
                        {
                            throw new Error("Syntax error 124 (line " + [i*1 + 1][0] + ")");
                        }
                        try
                        {
                            Function("__" + name + " = Vector(" + i + ", _" + a + ", _" + b + "); render(__" + name + ");")();
                        }
                        catch(e)
                        {
                            throw new Error(a + " or " + b + " is not defined (line " + [i*1 + 1][0] + ")");
                        }
                    }
                    else
                    {
                        throw new Error("Syntax error 137 (line " + [i*1 + 1][0] + ")");
                    }
                }
                else if ($isIdentifier(value))
                {
                    try
                    {
                        Function("__" + name + " = __" + value)();
                    }
                    catch(e)
                    {
                        throw new Error("Vector " + value + " is not defined (line " + [i*1 + 1][0] + ")");
                    }
                }
                else
                {
                    throw new Error("Syntax error: expected other vector or <p>,<q> (line " + [i*1 + 1][0] + ")");
                }
                break
            
            case "setcirc":
                var name = y[1], value = y[2];
                if (value.includes(","))
                {
                    var [a, b] = value.split(",");
                    if (a === ""
                    ||  a == undefined)
                    {
                        throw new Error("Syntax error: expected point (line " + [i*1 + 1][0] + ")");
                    }
                    if (b === ""
                    ||  b == undefined
                    ||  b != Number(b))
                    {
                        throw new Error("Syntax error: expected radius (line " + [i*1 + 1][0] + ")");
                    }
                    try
                    {
                        Function("___" + name + " = Circ(" + i + ", _" + a + ", " + b + "); render(___" + name + ");")();
                    }
                    catch(e)
                    {
                        throw new Error(a + " is not defined (line " + [i*1 + 1][0] + ")");
                    }
                }
                else
                {
                    if (name === ""
                    ||  name == undefined)
                    {
                        throw new Error("Syntax error: missing identifier (line " + [i*1 + 1][0] + ")");
                    }
                    if (value === ""
                    ||  value == undefined)
                    {
                        throw new Error("Syntax error: missing value (line " + [i*1 + 1][0] + ")");
                    }
                    else if ($isIdentifier(value))
                    {
                        try
                        {
                            Function("___" + name + " = ___" + value)();
                        }
                        catch(e)
                        {
                            throw new Error("Circ " + value + " is not defined (line " + [i*1 + 1][0] + ")");
                        }
                    }
                }
                break
            
            case "print":
                var xsp = x.split(" "),
                    xsl = xsp.length;
                for (var i = 1; i < xsl; i++)
                {
                    $textarea2.value += xsp[i];
                    if (i < xsl - 1)
                    {
                        $textarea2.value += " ";
                    }
                }
                break
            
            case "println":
                var xsp = x.split(" "),
                    xsl = xsp.length;
                for (var i = 1; i < xsl; i++)
                {
                    $textarea2.value += xsp[i];
                    if (i < xsl - 1)
                    {
                        $textarea2.value += " ";
                    }
                }
                $textarea2.value += "\n";
                break
            
            case "printpoint":
                var v = y[1];
                if (v === ""
                || v == undefined)
                {
                    throw new Error("Expected point (line " + [i*1 + 1][0] + ")");
                }
                if (!$isIdentifier(v))
                {
                    throw new Error("Expected point (line " + [i*1 + 1][0] + ")");
                }
                try
                {
                    var _var = Function("return _" + v + ";")(),
                        _varx = _var.x,
                        _vary = _var.y;
                    $textarea2.value += v + "(" + _varx + ", " + _vary + ")";
                }
                catch(e)
                {
                    throw new Error(v + " is not defined (line " + [i*1 + 1][0] + ")");
                }
                break
            
            case "printvector":
                var v = y[1];
                if (v === ""
                || v == undefined)
                {
                    throw new Error("Expected vector (line " + [i*1 + 1][0] + ")");
                }
                if (!$isIdentifier(v))
                {
                    throw new Error("Expected vector (line " + [i*1 + 1][0] + ")");
                }
                try
                {
                    var _var = Function("return __" + v + ";")(),
                        _varx = _var.u.x - _var.v.x,
                        _vary = _var.u.y - _var.v.y;
                    $textarea2.value += v + "[" + _varx + ", " + _vary + "]";
                }
                catch(e)
                {
                    throw new Error(v + " is not defined (line " + [i*1 + 1][0] + ")");
                }
                break
            
            case "printcirc":
                var v = y[1];
                if (v === ""
                || v == undefined)
                {
                    throw new Error("Expected circ (line " + [i*1 + 1][0] + ")");
                }
                if (!$isIdentifier(v))
                {
                    throw new Error("Expected circ (line " + [i*1 + 1][0] + ")");
                }
                try
                {
                    var _var = Function("return ___" + v + ";")(),
                        _varx = _var.point.x,
                        _vary = _var.point.y,
                        _varr = _var.radius;
                    $textarea2.value += v + "(" + _varx + ", " + _vary + ", r = " + _varr + ")";
                }
                catch(e)
                {
                    throw new Error(v + " is not defined (line " + [i*1 + 1][0] + ")");
                }
                break
            
            case "conf":
                var name = y[1], value = y[2];
                if (name === ""
                ||  name == undefined)
                {
                    throw new Error("Syntax error: conf name expected (line " + [i*1 + 1][0] + ")");
                }
                if (value === ""
                ||  value == undefined)
                {
                    throw new Error("Syntax error: conf value expected (line " + [i*1 + 1][0] + ")");
                }
                switch (name)
                {
                    case "point.autodisplay.info":
                        switch (value)
                        {
                            case "all":
                                autodisplayPointInfo = "all";
                                break
                            
                            case "name":
                                autodisplayPointInfo = "name";
                                break
                            
                            case "coords":
                                autodisplayPointInfo = "coords";
                                break
                            
                            case "none":
                                autodisplayPointInfo = "none";
                                break
                            
                            default:
                                    throw new Error("Invalid value (line " + [i*1 + 1][0] + ")");
                                break
                        }
                        break
                    case "rendering.scale":
                        var v = Number(value);
                        if (value === "0")
                        {
                            throw new Error("Value cannot be zero (line " + [i*1 + 1][0] + ")");
                        }
                        if (value != v)
                        {
                            throw new Error("Value must be a number (line " + [i*1 + 1][0] + ")");
                        }
                        if (v > 100)
                        {
                            throw new Error("Value is greater than 100 (line " + [i*1 + 1][0] + ")");
                        }
                        if (v < -100)
                        {
                            throw new Error("Value is less than -100 (line " + [i*1 + 1][0] + ")");
                        }
                        scale = v;
                        break
                    default:
                            throw new Error("Conf not found (line " + [i*1 + 1][0] + ")");
                        break
                }
                break
            
            case "setline":
                var name = y[1], value = y[2];
                if (name === ""
                ||  name == undefined)
                {
                    throw new Error("Syntax error: missing identifier (line " + [i*1 + 1][0] + ")");
                }
                if (value === ""
                ||  value == undefined)
                {
                    throw new Error("Syntax error: missing value (line " + [i*1 + 1][0] + ")");
                }
                if (!$isIdentifier(name))
                {
                    throw new Error("Syntax error (line " + [i*1 + 1][0] + ")");
                }
                if (value.includes(","))
                {
                    var [a, b] = value.split(",");
                    if (a === ""
                    || a == undefined)
                    {
                        throw new Error("Syntax error: Expected other or <point,angle> (line " + [i*1 + 1][0] + ")");
                    }
                    if (a === ""
                    || a == undefined)
                    {
                        throw new Error("Syntax error: Expected other or <point,angle> (line " + [i*1 + 1][0] + ")");
                    }
                    try
                    {
                        Function("____" + name + " = Line(" + i + ", _" + a + "," + b + "); render(____" + name + ");")();
                    }
                    catch(e)
                    {
                        throw e;
                        //new Error("Line " + value + " is not defined (line " + [i*1 + 1][0] + ")");
                    }
                }
                else if ($isIdentifier(value))
                {
                    try
                    {
                        Function("____" + name + " = ____" + value)();
                    }
                    catch(e)
                    {
                        throw new Error("Line " + value + " is not defined (line " + [i*1 + 1][0] + ")");
                    }
                }
                else
                {}
                break

            default:
                throw new Error("Command '" + y[0] + "' doesn't exist (line " + [i*1 + 1][0] + ")");
                break
        }
    }
}

autodisplayPointInfo = "name";
scale = 10;

function $isIdentifier(identifier)
{
    var i = 0;
    for (var x of identifier)
    {
        switch (x)
        {
            case "0":
            if (i == 0)
            {
                return false;
            }
            break
            case "1":
            if (i == 0)
            {
                return false;
            }
            break
            case "2":
            if (i == 0)
            {
                return false;
            }
            break
            case "3":
            if (i == 0)
            {
                return false;
            }
            break
            case "4":
            if (i == 0)
            {
                return false;
            }
            break
            case "5":
            if (i == 0)
            {
                return false;
            }
            break
            case "6":
            if (i == 0)
            {
                return false;
            }
            break
            case "7":
            if (i == 0)
            {
                return false;
            }
            break
            case "8":
            if (i == 0)
            {
                return false;
            }
            break
            case "9":
            if (i == 0)
            {
                return false;
            }
            break
            case "a":
            break
            case "b":
            break
            case "c":
            break
            case "d":
            break
            case "e":
            break
            case "f":
            break
            case "g":
            break
            case "h":
            break
            case "i":
            break
            case "j":
            break
            case "k":
            break
            case "l":
            break
            case "m":
            break
            case "n":
            break
            case "o":
            break
            case "p":
            break
            case "q":
            break
            case "r":
            break
            case "s":
            break
            case "t":
            break
            case "u":
            break
            case "v":
            break
            case "w":
            break
            case "x":
            break
            case "y":
            break
            case "z":
            break
            default:
                return false;
            break
        }
        i++;
    }
    return true;
}

function Point(i, x, y)
{
    if (isNaN(x)
    ||  x == undefined
    ||  x == Infinity
    ||  x == -Infinity
    ||  x === ""
    ||  x != Number(x)
    ||  typeof x != "number")
    {
        throw new Error("Expected number (line " + [i*1 + 1][0] + ")");
    }
    if (isNaN(y)
    ||  y == undefined
    ||  y == Infinity
    ||  y == -Infinity
    ||  y === ""
    ||  y != Number(y)
    ||  typeof y != "number")
    {
        throw new Error("Expected number (line " + [i*1 + 1][0] + ")");
    }
    if (points[x] == undefined)
    {
        points[x] = {};
    }
    if (points[x][y] == undefined)
    {
        points[x][y] = {x, y, type : "point"};
    }
    return points[x][y];
}

points = {};

function Vector(i, u, v)
{
    if (!v)
    {
        throw new Error("Expected point (line " + [i*1 + 1][0] + ")");
    }
    if (v.type != "point")
    {
        throw new Error("Expected point (line " + [i*1 + 1][0] + ")");
    }
    if (!u)
    {
        throw new Error("Expected point (line " + [i*1 + 1][0] + ")");
    }
    if (u.type != "point")
    {
        throw new Error("Expected point (line " + [i*1 + 1][0] + ")");
    }
    if (vectors[u.x] == undefined)
    {
        vectors[u.x] = {};
    }
    if (vectors[u.x][u.y] == undefined)
    {
        vectors[u.x][u.y] = {};
    }
    if (vectors[u.x][u.y][v.x] == undefined)
    {
        vectors[u.x][u.y][v.x] = {};
    }
    if (vectors[u.x][u.y][v.x][v.y] == undefined)
    {
        vectors[u.x][u.y][v.x][v.y] = {u, v, type : "vector"};
    }
    return vectors[u.x][u.y][v.x][v.y];
}

vectors = {};

function Line(i, point, angle)
{
    if (typeof point == typeof NaN
    ||  point == undefined)
    {
        throw new Error("Expected point (line " + [i*1 + 1][0] + ")");
    }
    if (point.type != "point")
    {
        throw new Error("Expected point (line " + [i*1 + 1][0] + ")");
    }
    if (isNaN(angle)
    ||  angle == undefined
    ||  angle == Infinity
    ||  angle == -Infinity
    ||  angle === ""
    ||  angle != Number(angle)
    ||  typeof angle != "number")
    {
        throw new Error("Expected angle (line " + [i*1 + 1][0] + ")");
    }
    if (lines[point] == undefined)
    {
        lines[point] = {};
    }
    if (lines[point][angle] == undefined)
    {
        lines[point][angle] = {point, angle, type : "line"};
    }
    return lines[point][angle];
}

lines = {};

function Circ(i, point, radius)
{
    if (typeof point == typeof NaN
    ||  point == undefined)
    {
        throw new Error("Expected point (line " + [i*1 + 1][0] + ")");
    }
    if (point.type != "point")
    {
        throw new Error("Expected point (line " + [i*1 + 1][0] + ")");
    }
    if (isNaN(radius)
    ||  radius == undefined
    ||  radius == Infinity
    ||  radius == -Infinity
    ||  radius === ""
    ||  radius != Number(radius)
    ||  typeof radius != "number")
    {
        throw new Error("Expected radius (line " + [i*1 + 1][0] + ")");
    }
    if (circs[point] == undefined)
    {
        circs[point] = {};
    }
    if (circs[point][radius] == undefined)
    {
        circs[point][radius] = {point, radius, type : "circ"};
    }
    return circs[point][radius];
}

circs = {};

function render(z, name)
{
    context.fillStyle = context.strokeStyle = "#000000";
    switch (z.type)
    {
        case "point":
            var {x, y} = z;
            context.fillRect(x * 300 / scale + 295, -y * 300 / scale + 299, 10, 2);
            context.fillRect(x * 300 / scale + 299, -y * 300 / scale + 295, 2, 10);
            switch (autodisplayPointInfo)
            {
                case "all":
                    context.fillText(name.toUpperCase() + "(" + z.x + ", " + z.y + ")", x * 300 / scale + 305, -y * 300 / scale + 295);
                    break
                case "name":
                    context.fillText(name.toUpperCase(), x * 300 / scale + 305, -y * 300 / scale + 295);
                    break
                case "coords":
                    context.fillText("(" + z.x + ", " + z.y + ")", x * 300 / scale + 305, -y * 300 / scale + 295);
                    break
            }
            break
        case "vector":
            var {u, v} = z;
            context.beginPath();
            context.moveTo(u.x * 300 / scale + 300, -u.y * 300 / scale + 300);
            context.lineTo(v.x * 300 / scale + 300, -v.y * 300 / scale + 300);
            context.strokeStyle = "#000000";
            context.stroke();
            context.closePath();
            break
        case "circ":
            var {point, radius} = z,
                {x, y} = point;
            context.beginPath();
            context.arc(x * 300 / scale + 300, -y * 300 / scale + 300, radius * 300 / scale, 0, 6.3);
            context.stroke();
            context.closePath();
            break
        case "line":
            context.beginPath();
            for (var i = -600; i < 600; i += 0.01)
            {
                var {x, y} = linePosition(z, i * 1.5);
                context.fillRect(x * 300 / scale + 300, -y * 300 / scale + 300, 1, 1);
            }
            context.stroke();
            context.closePath();
            break
        default:
            break
    }
}

abs = Math.abs;
cos = Math.cos;
sin = Math.sin;

function linePosition(l, variation)
{
    var {point, angle} = l,
        {x, y} = point;
    x += variation * cos(angle * 0.01745329252);
    y += variation * sin(angle * 0.01745329252);
    return {x, y};
}

$textarea1.value = localStorage.getItem("input");

$update();
$proccess();

window.onbeforeunload = function(e)
{
    localStorage.setItem("input", $textarea1.value);
};

$textarea1.readOnly = localStorage.getItem("canEdit") == "true";
changeTextareaReadonly();
changeTextareaReadonly();

function changeTextareaReadonly()
{
    if ($textarea1.readOnly = !$textarea1.readOnly)
    {
        $textarea1.style.backgroundColor = "#555555";
        localStorage.setItem("canEdit", "true");
    }
    else
    {
        $textarea1.style.backgroundColor = "#aaaaaa";
        localStorage.setItem("canEdit", "false");
    }
}

function reset()
{
    if (!confirm("U sure?"))
    {
        return;
    }
    $textarea1.value = "";
    confirmed = false;
    localStorage.removeItem("input");
    localStorage.removeItem("confirmed");
    localStorage.removeItem("canEdit");
    location.href = location.href;
}

function downloadCode()
{
    var b = new Blob([$textarea1.value], {"type": "text/plain"});
    var u = URL.createObjectURL(b);
    var a = document.createElement("a");
    a.href = u;
    a.download = new Date() + ".txt";
    a.click();
}
