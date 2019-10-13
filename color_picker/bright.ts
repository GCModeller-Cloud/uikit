namespace uikit.color_picker.view {

    export function brightAdjustment(baseColor: string) {

    }

    function hslLum_top() {
        var i, a, match;
        var color = document.getElementById("colorhexDIV").innerHTML;
        var hslObj = w3color(color);
        var h = hslObj.hue;
        var s = hslObj.sat;
        var l = hslObj.lightness;
        var arr = [];
        for (i = 0; i <= 20; i++) {
            arr.push(w3color("hsl(" + h + "," + s + "," + (i * 0.05) + ")"));
        }
        arr.reverse();
        a = "<h3 class='w3-center'>Lighter / Darker:</h3><table class='colorTable' style='width:100%;'>";
        match = 0;
        for (i = 0; i < arr.length; i++) {
            if (match == 0 && Math.round(l * 100) == Math.round(arr[i].lightness * 100)) {
                a += "<tr><td></td><td></td><td></td></tr>";
                a += "<tr>";
                a += "<td style='text-align:right;'><b>" + Math.round(l * 100) + "%&nbsp;</b></td>";
                a += "<td style='background-color:" + w3color(hslObj).toHexString() + "'><br><br></td>";
                a += "<td>&nbsp;<b>" + w3color(hslObj).toHexString() + "</b></td>";
                a += "</tr>";
                a += "<tr><td></td><td></td><td></td></tr>";
                match = 1;
            } else {
                if (match == 0 && l > arr[i].lightness) {
                    a += "<tr><td></td><td></td><td></td></tr>";
                    a += "<tr>";
                    a += "<td style='text-align:right;'><b>" + Math.round(l * 100) + "%&nbsp;</b></td>";
                    a += "<td style='background-color:" + w3color(hslObj).toHexString() + "'></td>";
                    a += "<td>&nbsp;<b>" + w3color(hslObj).toHexString() + "</b></td>";
                    a += "</tr>";
                    a += "<tr><td></td><td></td><td></td></tr>";
                    match = 1;
                }
                a += "<tr>";
                a += "<td style='width:40px;text-align:right;'>" + Math.round(arr[i].lightness * 100) + "%&nbsp;</td>";
                a += "<td style='cursor:pointer;background-color:" + arr[i].toHexString() + "' onclick='clickColor(\"" + arr[i].toHexString() + "\")'></td>";
                a += "<td style='width:80px;'>&nbsp;" + arr[i].toHexString() + "</td>";
                a += "</tr>";
            }
        }
        a += "</table>";
        document.getElementById("lumtopcontainer").innerHTML = a;
    }

    function hslTable(x) {
        var lineno, header, i, a, match, same, comp, loopHSL, HSL;
        var color = document.getElementById("colorhexDIV").innerHTML;
        var hslObj = w3color(color);
        var h = hslObj.hue;
        var s = hslObj.sat;
        var l = hslObj.lightness;
        var arr = [];
        if (x == "hue") { header = "Hue"; lineno = 24; }
        if (x == "sat") { header = "Saturation"; lineno = 20; }
        if (x == "light") { header = "Lightness"; lineno = 20; }
        for (i = 0; i <= lineno; i++) {
            if (x == "hue") { arr.push(w3color("hsl(" + (i * 15) + "," + s + "," + l + ")")); }
            if (x == "sat") { arr.push(w3color("hsl(" + h + "," + (i * 0.05) + "," + l + ")")); }
            if (x == "light") { arr.push(w3color("hsl(" + h + "," + s + "," + (i * 0.05) + ")")); }
        }
        if (x == "sat" || x == "light") { arr.reverse(); }
        a = "<h3>" + header + "</h3>";
        a += "<div class='w3-responsive'>";
        a += "<table class='w3-table-all colorTable' style='width:100%;white-space: nowrap;font-size:14px;'>";
        a += "<tr>";
        a += "<td style='width:150px;'></td>";
        a += "<td style='text-align:right;text-transform:capitalize;'>" + x + "&nbsp;</td>";
        a += "<td>Hex</td>";
        a += "<td>Rgb</td>";
        a += "<td>Hsl</td>";
        a += "</tr>";
        match = 0;
        for (i = 0; i < arr.length; i++) {
            same = 0;
            if (x == "hue") {
                loopHSL = w3color(arr[i]).hue;
                HSL = h;
                if (i == arr.length - 1) { loopHSL = 360; }
                comp = (loopHSL > HSL);
            }
            if (x == "sat") {
                loopHSL = Math.round(w3color(arr[i]).sat * 100);
                HSL = Number(s * 100);
                HSL = Math.round(HSL);
                comp = (loopHSL < HSL);
                HSL = HSL + "%";
                loopHSL = loopHSL + "%";
            }
            if (x == "light") {
                loopHSL = Math.round(w3color(arr[i]).lightness * 100);
                HSL = Number(l * 100);
                HSL = Math.round(HSL);
                comp = (loopHSL < HSL);
                HSL = HSL + "%";
                loopHSL = loopHSL + "%";
            }
            if (HSL == loopHSL) {
                match++;
                same = 1;
            }
            if (comp) { match++; }
            if (match == 1) {
                a += "<tr class='w3-green'>";
                a += "<td style='background-color:" + hslObj.toHexString() + "'></td>";
                a += "<td style='text-align:right;'><b>" + HSL + "&nbsp;</b></td>";
                a += "<td><b>" + hslObj.toHexString() + "</b></td>";
                a += "<td><b>" + hslObj.toRgbString() + "</b></td>";
                a += "<td><b>" + hslObj.toHslString() + "</b></td>";
                a += "</tr>";
                match = 2;
            }
            if (same == 0) {
                a += "<tr>";
                a += "<td style='cursor:pointer;background-color:" + arr[i].toHexString() + "' onclick='clickColor(\"" + arr[i].toHexString() + "\")'></td>";
                a += "<td style='text-align:right;'>" + loopHSL + "&nbsp;</td>";
                a += "<td>" + arr[i].toHexString() + "</td>";
                a += "<td>" + arr[i].toRgbString() + "</td>";
                a += "<td>" + arr[i].toHslString() + "</td>";
                a += "</tr>";
            }
        }
        a += "</table></div>";
        if (x == "hue") { document.getElementById("huecontainer").innerHTML = a; }
        if (x == "sat") { document.getElementById("hslsatcontainer").innerHTML = a; }
        if (x == "light") { document.getElementById("hsllumcontainer").innerHTML = a; }

    }
}