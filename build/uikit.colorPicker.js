var uikit;
(function (uikit) {
    var color_picker;
    (function (color_picker) {
        var view;
        (function (view) {
            var w3color = TypeScript.ColorManager.w3color;
            /**
             * 生成亮度调整选择的表格
            */
            function hslLum_top(color) {
                var i, a, match;
                var hslObj = new w3color(color);
                var h = hslObj.hue;
                var s = hslObj.sat;
                var l = hslObj.lightness;
                var arr = [];
                for (i = 0; i <= 20; i++) {
                    arr.push(new w3color("hsl(" + h + "," + s + "," + (i * 0.05) + ")"));
                }
                arr.reverse();
                a = "<h3 class='w3-center'>Lighter / Darker:</h3><table class='colorTable' style='width:100%;'>";
                match = 0;
                for (i = 0; i < arr.length; i++) {
                    if (match == 0 && Math.round(l * 100) == Math.round(arr[i].lightness * 100)) {
                        a += "<tr><td></td><td></td><td></td></tr>";
                        a += "<tr>";
                        a += "<td style='text-align:right;'><b>" + Math.round(l * 100) + "%&nbsp;</b></td>";
                        a += "<td style='background-color:" + new w3color(hslObj).toHexString() + "'><br><br></td>";
                        a += "<td>&nbsp;<b>" + new w3color(hslObj).toHexString() + "</b></td>";
                        a += "</tr>";
                        a += "<tr><td></td><td></td><td></td></tr>";
                        match = 1;
                    }
                    else {
                        if (match == 0 && l > arr[i].lightness) {
                            a += "<tr><td></td><td></td><td></td></tr>";
                            a += "<tr>";
                            a += "<td style='text-align:right;'><b>" + Math.round(l * 100) + "%&nbsp;</b></td>";
                            a += "<td style='background-color:" + new w3color(hslObj).toHexString() + "'></td>";
                            a += "<td>&nbsp;<b>" + new w3color(hslObj).toHexString() + "</b></td>";
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
                return a;
            }
            view.hslLum_top = hslLum_top;
            function hslTable(color, x) {
                var lineno, header, i, a, match, same, comp, loopHSL, HSL;
                var hslObj = new w3color(color);
                var h = hslObj.hue;
                var s = hslObj.sat;
                var l = hslObj.lightness;
                var arr = [];
                if (x == "hue") {
                    header = "Hue";
                    lineno = 24;
                }
                if (x == "sat") {
                    header = "Saturation";
                    lineno = 20;
                }
                if (x == "light") {
                    header = "Lightness";
                    lineno = 20;
                }
                for (i = 0; i <= lineno; i++) {
                    if (x == "hue") {
                        arr.push(new w3color("hsl(" + (i * 15) + "," + s + "," + l + ")"));
                    }
                    if (x == "sat") {
                        arr.push(new w3color("hsl(" + h + "," + (i * 0.05) + "," + l + ")"));
                    }
                    if (x == "light") {
                        arr.push(new w3color("hsl(" + h + "," + s + "," + (i * 0.05) + ")"));
                    }
                }
                if (x == "sat" || x == "light") {
                    arr.reverse();
                }
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
                        loopHSL = new w3color(arr[i]).hue;
                        HSL = h;
                        if (i == arr.length - 1) {
                            loopHSL = 360;
                        }
                        comp = (loopHSL > HSL);
                    }
                    if (x == "sat") {
                        loopHSL = Math.round(new w3color(arr[i]).sat * 100);
                        HSL = Number(s * 100);
                        HSL = Math.round(HSL);
                        comp = (loopHSL < HSL);
                        HSL = HSL + "%";
                        loopHSL = loopHSL + "%";
                    }
                    if (x == "light") {
                        loopHSL = Math.round(new w3color(arr[i]).lightness * 100);
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
                    if (comp) {
                        match++;
                    }
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
                return a;
            }
            view.hslTable = hslTable;
        })(view = color_picker.view || (color_picker.view = {}));
    })(color_picker = uikit.color_picker || (uikit.color_picker = {}));
})(uikit || (uikit = {}));
var uikit;
(function (uikit) {
    var color_picker;
    (function (color_picker) {
        var colorMapEvent = /** @class */ (function () {
            function colorMapEvent(changeColor) {
                this.changeColor = changeColor;
                this.colorhex = "#FF0000";
                this.color = "#FF0000";
                this.colorObj = new TypeScript.ColorManager.w3color(this.color);
                this.hh = 0;
            }
            colorMapEvent.prototype.mouseOverColor = function (hex) {
                document.getElementById("divpreview").style.visibility = "visible";
                document.getElementById("divpreview").style.backgroundColor = hex;
                document.body.style.cursor = "pointer";
            };
            colorMapEvent.prototype.mouseOutMap = function () {
                if (this.hh == 0) {
                    document.getElementById("divpreview").style.visibility = "hidden";
                }
                else {
                    this.hh = 0;
                }
                document.getElementById("divpreview").style.backgroundColor = this.colorObj.toHexString();
                document.body.style.cursor = "";
            };
            colorMapEvent.prototype.clickColor = function (hex, seltop, selleft, html5) {
                if (html5 === void 0) { html5 = null; }
                var c;
                var cObj;
                var colormap, areas, i, areacolor, cc;
                if (html5 && html5 == 5) {
                    c = document.getElementById("html5colorpicker").value;
                }
                else {
                    if (hex == 0) {
                        c = document.getElementById("entercolor").value;
                    }
                    else {
                        c = hex;
                    }
                }
                cObj = new TypeScript.ColorManager.w3color(c);
                this.colorhex = cObj.toHexString();
                if (cObj.valid) {
                    this.clearWrongInput();
                }
                else {
                    this.wrongInput();
                    return;
                }
                var r = cObj.red;
                var g = cObj.green;
                var b = cObj.blue;
                document.getElementById("colornamDIV").innerHTML = (cObj.toName() || "");
                document.getElementById("colorhexDIV").innerHTML = cObj.toHexString();
                document.getElementById("colorrgbDIV").innerHTML = cObj.toRgbString();
                document.getElementById("colorhslDIV").innerHTML = cObj.toHslString();
                if ((!seltop || seltop == -1) && (!selleft || selleft == -1)) {
                    colormap = document.getElementById("colormap");
                    areas = colormap.getElementsByTagName("AREA");
                    for (i = 0; i < areas.length; i++) {
                        areacolor = areas[i].getAttribute("onmouseover").replace('mouseOverColor("', '');
                        areacolor = areacolor.replace('")', '');
                        if (areacolor.toLowerCase() == this.colorhex) {
                            cc = areas[i].getAttribute("onclick").replace(')', '').split(",");
                            seltop = Number(cc[1]);
                            selleft = Number(cc[2]);
                        }
                    }
                }
                if ((seltop + 200) > -1 && selleft > -1) {
                    document.getElementById("selectedhexagon").style.top = seltop + "px";
                    document.getElementById("selectedhexagon").style.left = selleft + "px";
                    document.getElementById("selectedhexagon").style.visibility = "visible";
                }
                else {
                    document.getElementById("divpreview").style.backgroundColor = cObj.toHexString();
                    document.getElementById("selectedhexagon").style.visibility = "hidden";
                }
                document.getElementById("selectedcolor").style.backgroundColor = cObj.toHexString();
                document.getElementById("html5colorpicker").value = cObj.toHexString();
                document.getElementById('slideRed').value = r;
                document.getElementById('slideGreen').value = g;
                document.getElementById('slideBlue').value = b;
                this.changeRed(r);
                this.changeGreen(g);
                this.changeBlue(b);
                this.changeColor(this.colorObj);
                document.getElementById("fixed").style.backgroundColor = cObj.toHexString();
            };
            colorMapEvent.prototype.wrongInput = function () {
                document.getElementById("entercolorDIV").className = "has-error";
                document.getElementById("wronginputDIV").style.display = "block";
            };
            colorMapEvent.prototype.clearWrongInput = function () {
                document.getElementById("entercolorDIV").className = "";
                document.getElementById("wronginputDIV").style.display = "none";
            };
            colorMapEvent.prototype.changeRed = function (value) {
                document.getElementById('valRed').innerHTML = value;
                this.changeAll();
            };
            colorMapEvent.prototype.changeGreen = function (value) {
                document.getElementById('valGreen').innerHTML = value;
                this.changeAll();
            };
            colorMapEvent.prototype.changeBlue = function (value) {
                document.getElementById('valBlue').innerHTML = value;
                this.changeAll();
            };
            colorMapEvent.prototype.changeAll = function () {
                var r = document.getElementById('valRed').innerHTML;
                var g = document.getElementById('valGreen').innerHTML;
                var b = document.getElementById('valBlue').innerHTML;
                document.getElementById('change').style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
                document.getElementById('changetxt').innerHTML = "rgb(" + r + ", " + g + ", " + b + ")";
                document.getElementById('changetxthex').innerHTML = new TypeScript.ColorManager.w3color("rgb(" + r + "," + g + "," + b + ")").toHexString();
            };
            return colorMapEvent;
        }());
        color_picker.colorMapEvent = colorMapEvent;
    })(color_picker = uikit.color_picker || (uikit.color_picker = {}));
})(uikit || (uikit = {}));
var uikit;
(function (uikit) {
    var color_picker;
    (function (color_picker) {
        var colorPicker = /** @class */ (function () {
            function colorPicker() {
            }
            colorPicker.prototype.submitOnEnter = function (e) {
                var keyboardKey = e.which || e.keyCode;
                if (keyboardKey == 13) {
                    this.mapPicker.clickColor(0, -1, -1);
                }
            };
            return colorPicker;
        }());
        color_picker.colorPicker = colorPicker;
    })(color_picker = uikit.color_picker || (uikit.color_picker = {}));
})(uikit || (uikit = {}));
/// <reference path="../../build/linq.d.ts" />
var uikit;
(function (uikit) {
    var color_picker;
    (function (color_picker) {
        var view;
        (function (view) {
            function createPolyMap(evt, containerId) {
                var map = $ts("<map>", { id: "colormap", name: "colormap" });
                var img = $ts("<img>", {
                    style: "margin-right:2px;",
                    src: view.colorMapBase64,
                    usemap: "#colormap",
                    alt: "colormap"
                });
                // <area style="cursor:pointer" 
                //       shape="poly"
                //       coords="63,0,72,4,72,15,63,19,54,15,54,4" 
                //       onclick="clickColor('#003366',-200,54)"
                //       onmouseover="mouseOverColor('#003366')" 
                //       alt="#003366">
                $from(view.poly)
                    .Select(function (pdata) { return $ts("<area>", {
                    style: "cursor:pointer",
                    shape: "poly",
                    coords: pdata.coords.join(","),
                    alt: pdata.color,
                    onclick: function () {
                        evt.clickColor(pdata.color, pdata.offsets[0], pdata.offsets[1]);
                    },
                    onmouseover: function () {
                        evt.mouseOverColor(pdata.color);
                    }
                }); })
                    .ForEach(function (a) { return map.append(a); });
                $ts(containerId).display(img).append(map);
                $ts(containerId).style.margin = "auto";
                $ts(containerId).style.width = "236px";
            }
            view.createPolyMap = createPolyMap;
            view.colorMapBase64 = "";
            view.poly = [
                { coords: [63, 0, 72, 4, 72, 15, 63, 19, 54, 15, 54, 4], color: '#003366', offsets: [-200, 54] },
                { coords: [81, 0, 90, 4, 90, 15, 81, 19, 72, 15, 72, 4], color: '#336699', offsets: [-200, 72] },
                { coords: [99, 0, 108, 4, 108, 15, 99, 19, 90, 15, 90, 4], color: '#3366CC', offsets: [-200, 90] },
                { coords: [117, 0, 126, 4, 126, 15, 117, 19, 108, 15, 108, 4], color: '#003399', offsets: [-200, 108] },
                { coords: [135, 0, 144, 4, 144, 15, 135, 19, 126, 15, 126, 4], color: '#000099', offsets: [-200, 126] },
                { coords: [153, 0, 162, 4, 162, 15, 153, 19, 144, 15, 144, 4], color: '#0000CC', offsets: [-200, 144] },
                { coords: [171, 0, 180, 4, 180, 15, 171, 19, 162, 15, 162, 4], color: '#000066', offsets: [-200, 162] },
                { coords: [54, 15, 63, 19, 63, 30, 54, 34, 45, 30, 45, 19], color: '#006666', offsets: [-185, 45] },
                { coords: [72, 15, 81, 19, 81, 30, 72, 34, 63, 30, 63, 19], color: '#006699', offsets: [-185, 63] },
                { coords: [90, 15, 99, 19, 99, 30, 90, 34, 81, 30, 81, 19], color: '#0099CC', offsets: [-185, 81] },
                { coords: [108, 15, 117, 19, 117, 30, 108, 34, 99, 30, 99, 19], color: '#0066CC', offsets: [-185, 99] },
                { coords: [126, 15, 135, 19, 135, 30, 126, 34, 117, 30, 117, 19], color: '#0033CC', offsets: [-185, 117] },
                { coords: [144, 15, 153, 19, 153, 30, 144, 34, 135, 30, 135, 19], color: '#0000FF', offsets: [-185, 135] },
                {
                    coords: [162, 15, 171, 19, 171, 30, 162, 34, 153, 30, 153, 19], color: '#3333FF', offsets: [-185, 153]
                },
                {
                    coords: [180, 15, 189, 19, 189, 30, 180, 34, 171, 30, 171, 19], color: '#333399', offsets: [-185, 171]
                },
                {
                    coords: [45, 30, 54, 34, 54, 45, 45, 49, 36, 45, 36, 34], color: '#669999', offsets: [-170, 36]
                },
                {
                    coords: [63, 30, 72, 34, 72, 45, 63, 49, 54, 45, 54, 34], color: '#009999', offsets: [-170, 54]
                },
                {
                    coords: [81, 30, 90, 34, 90, 45, 81, 49, 72, 45, 72, 34], color: '#33CCCC', offsets: [-170, 72]
                },
                {
                    coords: [99, 30, 108, 34, 108, 45, 99, 49, 90, 45, 90, 34], color: '#00CCFF', offsets: [-170, 90]
                },
                {
                    coords: [117, 30, 126, 34, 126, 45, 117, 49, 108, 45, 108, 34], color: '#0099FF', offsets: [-170, 108]
                },
                {
                    coords: [135, 30, 144, 34, 144, 45, 135, 49, 126, 45, 126, 34], color: '#0066FF', offsets: [-170, 126]
                },
                {
                    coords: [153, 30, 162, 34, 162, 45, 153, 49, 144, 45, 144, 34], color: '#3366FF', offsets: [-170, 144]
                },
                {
                    coords: [171, 30, 180, 34, 180, 45, 171, 49, 162, 45, 162, 34], color: '#3333CC', offsets: [-170, 162]
                },
                {
                    coords: [189, 30, 198, 34, 198, 45, 189, 49, 180, 45, 180, 34], color: '#666699', offsets: [-170, 180]
                },
                {
                    coords: [36, 45, 45, 49, 45, 60, 36, 64, 27, 60, 27, 49], color: '#339966', offsets: [-155, 27]
                },
                {
                    coords: [54, 45, 63, 49, 63, 60, 54, 64, 45, 60, 45, 49], color: '#00CC99', offsets: [-155, 45]
                },
                {
                    coords: [72, 45, 81, 49, 81, 60, 72, 64, 63, 60, 63, 49], color: '#00FFCC', offsets: [-155, 63]
                },
                {
                    coords: [90, 45, 99, 49, 99, 60, 90, 64, 81, 60, 81, 49], color: '#00FFFF', offsets: [-155, 81]
                },
                {
                    coords: [108, 45, 117, 49, 117, 60, 108, 64, 99, 60, 99, 49], color: '#33CCFF', offsets: [-155, 99]
                },
                {
                    coords: [126, 45, 135, 49, 135, 60, 126, 64, 117, 60, 117, 49], color: '#3399FF', offsets: [-155, 117]
                },
                {
                    coords: [144, 45, 153, 49, 153, 60, 144, 64, 135, 60, 135, 49], color: '#6699FF', offsets: [-155, 135]
                },
                {
                    coords: [162, 45, 171, 49, 171, 60, 162, 64, 153, 60, 153, 49], color: '#6666FF', offsets: [-155, 153]
                },
                {
                    coords: [180, 45, 189, 49, 189, 60, 180, 64, 171, 60, 171, 49], color: '#6600FF', offsets: [-155, 171]
                },
                {
                    coords: [198, 45, 207, 49, 207, 60, 198, 64, 189, 60, 189, 49], color: '#6600CC', offsets: [-155, 189]
                },
                {
                    coords: [27, 60, 36, 64, 36, 75, 27, 79, 18, 75, 18, 64], color: '#339933', offsets: [-140, 18]
                },
                {
                    coords: [45, 60, 54, 64, 54, 75, 45, 79, 36, 75, 36, 64], color: '#00CC66', offsets: [-140, 36]
                },
                {
                    coords: [63, 60, 72, 64, 72, 75, 63, 79, 54, 75, 54, 64], color: '#00FF99', offsets: [-140, 54]
                },
                {
                    coords: [81, 60, 90, 64, 90, 75, 81, 79, 72, 75, 72, 64], color: '#66FFCC', offsets: [-140, 72]
                },
                {
                    coords: [99, 60, 108, 64, 108, 75, 99, 79, 90, 75, 90, 64], color: '#66FFFF', offsets: [-140, 90]
                },
                {
                    coords: [117, 60, 126, 64, 126, 75, 117, 79, 108, 75, 108, 64], color: '#66CCFF', offsets: [-140, 108]
                },
                {
                    coords: [135, 60, 144, 64, 144, 75, 135, 79, 126, 75, 126, 64], color: '#99CCFF', offsets: [-140, 126]
                },
                {
                    coords: [153, 60, 162, 64, 162, 75, 153, 79, 144, 75, 144, 64], color: '#9999FF', offsets: [-140, 144]
                },
                {
                    coords: [171, 60, 180, 64, 180, 75, 171, 79, 162, 75, 162, 64], color: '#9966FF', offsets: [-140, 162]
                },
                {
                    coords: [189, 60, 198, 64, 198, 75, 189, 79, 180, 75, 180, 64], color: '#9933FF', offsets: [-140, 180]
                },
                {
                    coords: [207, 60, 216, 64, 216, 75, 207, 79, 198, 75, 198, 64], color: '#9900FF', offsets: [-140, 198]
                },
                {
                    coords: [18, 75, 27, 79, 27, 90, 18, 94, 9, 90, 9, 79], color: '#006600', offsets: [-125, 9]
                },
                {
                    coords: [36, 75, 45, 79, 45, 90, 36, 94, 27, 90, 27, 79], color: '#00CC00', offsets: [-125, 27]
                },
                {
                    coords: [54, 75, 63, 79, 63, 90, 54, 94, 45, 90, 45, 79], color: '#00FF00', offsets: [-125, 45]
                },
                {
                    coords: [72, 75, 81, 79, 81, 90, 72, 94, 63, 90, 63, 79], color: '#66FF99', offsets: [-125, 63]
                },
                {
                    coords: [90, 75, 99, 79, 99, 90, 90, 94, 81, 90, 81, 79], color: '#99FFCC', offsets: [-125, 81]
                },
                {
                    coords: [108, 75, 117, 79, 117, 90, 108, 94, 99, 90, 99, 79], color: '#CCFFFF', offsets: [-125, 99]
                },
                {
                    coords: [126, 75, 135, 79, 135, 90, 126, 94, 117, 90, 117, 79], color: '#CCCCFF', offsets: [-125, 117]
                },
                {
                    coords: [144, 75, 153, 79, 153, 90, 144, 94, 135, 90, 135, 79], color: '#CC99FF', offsets: [-125, 135]
                },
                {
                    coords: [162, 75, 171, 79, 171, 90, 162, 94, 153, 90, 153, 79], color: '#CC66FF', offsets: [-125, 153]
                },
                {
                    coords: [180, 75, 189, 79, 189, 90, 180, 94, 171, 90, 171, 79], color: '#CC33FF', offsets: [-125, 171]
                },
                {
                    coords: [198, 75, 207, 79, 207, 90, 198, 94, 189, 90, 189, 79], color: '#CC00FF', offsets: [-125, 189]
                },
                {
                    coords: [216, 75, 225, 79, 225, 90, 216, 94, 207, 90, 207, 79], color: '#9900CC', offsets: [-125, 207]
                },
                {
                    coords: [9, 90, 18, 94, 18, 105, 9, 109, 0, 105, 0, 94], color: '#003300', offsets: [-110, 0]
                },
                {
                    coords: [27, 90, 36, 94, 36, 105, 27, 109, 18, 105, 18, 94], color: '#009933', offsets: [-110, 18]
                },
                {
                    coords: [45, 90, 54, 94, 54, 105, 45, 109, 36, 105, 36, 94], color: '#33CC33', offsets: [-110, 36]
                },
                {
                    coords: [63, 90, 72, 94, 72, 105, 63, 109, 54, 105, 54, 94], color: '#66FF66', offsets: [-110, 54]
                },
                {
                    coords: [81, 90, 90, 94, 90, 105, 81, 109, 72, 105, 72, 94], color: '#99FF99', offsets: [-110, 72]
                },
                {
                    coords: [99, 90, 108, 94, 108, 105, 99, 109, 90, 105, 90, 94], color: '#CCFFCC', offsets: [-110, 90]
                },
                {
                    coords: [117, 90, 126, 94, 126, 105, 117, 109, 108, 105, 108, 94], color: '#FFFFFF', offsets: [-110, 108]
                },
                {
                    coords: [135, 90, 144, 94, 144, 105, 135, 109, 126, 105, 126, 94], color: '#FFCCFF', offsets: [-110, 126]
                },
                {
                    coords: [153, 90, 162, 94, 162, 105, 153, 109, 144, 105, 144, 94], color: '#FF99FF', offsets: [-110, 144]
                },
                {
                    coords: [171, 90, 180, 94, 180, 105, 171, 109, 162, 105, 162, 94], color: '#FF66FF', offsets: [-110, 162]
                },
                {
                    coords: [189, 90, 198, 94, 198, 105, 189, 109, 180, 105, 180, 94], color: '#FF00FF', offsets: [-110, 180]
                },
                {
                    coords: [207, 90, 216, 94, 216, 105, 207, 109, 198, 105, 198, 94], color: '#CC00CC', offsets: [-110, 198]
                },
                {
                    coords: [225, 90, 234, 94, 234, 105, 225, 109, 216, 105, 216, 94], color: '#660066', offsets: [-110, 216]
                }, {
                    coords: [18, 105, 27, 109, 27, 120, 18, 124, 9, 120, 9, 109], color: '#336600', offsets: [-95, 9]
                }, {
                    coords: [36, 105, 45, 109, 45, 120, 36, 124, 27, 120, 27, 109], color: '#009900', offsets: [-95, 27]
                }, {
                    coords: [54, 105, 63, 109, 63, 120, 54, 124, 45, 120, 45, 109], color: '#66FF33', offsets: [-95, 45]
                }, {
                    coords: [72, 105, 81, 109, 81, 120, 72, 124, 63, 120, 63, 109], color: '#99FF66', offsets: [-95, 63]
                }, {
                    coords: [90, 105, 99, 109, 99, 120, 90, 124, 81, 120, 81, 109], color: '#CCFF99', offsets: [-95, 81]
                }, {
                    coords: [108, 105, 117, 109, 117, 120, 108, 124, 99, 120, 99, 109], color: '#FFFFCC', offsets: [-95, 99]
                }, {
                    coords: [126, 105, 135, 109, 135, 120, 126, 124, 117, 120, 117, 109], color: '#FFCCCC', offsets: [-95, 117]
                }, {
                    coords: [144, 105, 153, 109, 153, 120, 144, 124, 135, 120, 135, 109], color: '#FF99CC', offsets: [-95, 135]
                }, {
                    coords: [162, 105, 171, 109, 171, 120, 162, 124, 153, 120, 153, 109], color: '#FF66CC', offsets: [-95, 153]
                }, {
                    coords: [180, 105, 189, 109, 189, 120, 180, 124, 171, 120, 171, 109], color: '#FF33CC', offsets: [-95, 171]
                }, {
                    coords: [198, 105, 207, 109, 207, 120, 198, 124, 189, 120, 189, 109], color: '#CC0099', offsets: [-95, 189]
                }, {
                    coords: [216, 105, 225, 109, 225, 120, 216, 124, 207, 120, 207, 109], color: '#993399', offsets: [-95, 207]
                }, {
                    coords: [27, 120, 36, 124, 36, 135, 27, 139, 18, 135, 18, 124], color: '#333300', offsets: [-80, 18]
                }, {
                    coords: [45, 120, 54, 124, 54, 135, 45, 139, 36, 135, 36, 124], color: '#669900', offsets: [-80, 36]
                }, {
                    coords: [63, 120, 72, 124, 72, 135, 63, 139, 54, 135, 54, 124], color: '#99FF33', offsets: [-80, 54]
                }, {
                    coords: [81, 120, 90, 124, 90, 135, 81, 139, 72, 135, 72, 124], color: '#CCFF66', offsets: [-80, 72]
                }, {
                    coords: [99, 120, 108, 124, 108, 135, 99, 139, 90, 135, 90, 124], color: '#FFFF99', offsets: [-80, 90]
                }, {
                    coords: [117, 120, 126, 124, 126, 135, 117, 139, 108, 135, 108, 124], color: '#FFCC99', offsets: [-80, 108]
                }, {
                    coords: [135, 120, 144, 124, 144, 135, 135, 139, 126, 135, 126, 124], color: '#FF9999', offsets: [-80, 126]
                }, {
                    coords: [153, 120, 162, 124, 162, 135, 153, 139, 144, 135, 144, 124], color: '#FF6699', offsets: [-80, 144]
                }, {
                    coords: [171, 120, 180, 124, 180, 135, 171, 139, 162, 135, 162, 124], color: '#FF3399', offsets: [-80, 162]
                }, {
                    coords: [189, 120, 198, 124, 198, 135, 189, 139, 180, 135, 180, 124], color: '#CC3399', offsets: [-80, 180]
                }, {
                    coords: [207, 120, 216, 124, 216, 135, 207, 139, 198, 135, 198, 124], color: '#990099', offsets: [-80, 198]
                }, {
                    coords: [36, 135, 45, 139, 45, 150, 36, 154, 27, 150, 27, 139], color: '#666633', offsets: [-65, 27]
                }, {
                    coords: [54, 135, 63, 139, 63, 150, 54, 154, 45, 150, 45, 139], color: '#99CC00', offsets: [-65, 45]
                }, {
                    coords: [72, 135, 81, 139, 81, 150, 72, 154, 63, 150, 63, 139], color: '#CCFF33', offsets: [-65, 63]
                }, {
                    coords: [90, 135, 99, 139, 99, 150, 90, 154, 81, 150, 81, 139], color: '#FFFF66', offsets: [-65, 81]
                }, {
                    coords: [108, 135, 117, 139, 117, 150, 108, 154, 99, 150, 99, 139], color: '#FFCC66', offsets: [-65, 99]
                },
                {
                    coords: [126, 135, 135, 139, 135, 150, 126, 154, 117, 150, 117, 139], color: '#FF9966', offsets: [-65, 117]
                },
                {
                    coords: [144, 135, 153, 139, 153, 150, 144, 154, 135, 150, 135, 139], color: '#FF6666', offsets: [-65, 135]
                },
                {
                    coords: [162, 135, 171, 139, 171, 150, 162, 154, 153, 150, 153, 139], color: '#FF0066', offsets: [-65, 153]
                },
                {
                    coords: [180, 135, 189, 139, 189, 150, 180, 154, 171, 150, 171, 139], color: '#CC6699', offsets: [-65, 171]
                }, {
                    coords: [198, 135, 207, 139, 207, 150, 198, 154, 189, 150, 189, 139], color: '#993366', offsets: [-65, 189]
                }, {
                    coords: [45, 150, 54, 154, 54, 165, 45, 169, 36, 165, 36, 154], color: '#999966', offsets: [-50, 36]
                }, {
                    coords: [63, 150, 72, 154, 72, 165, 63, 169, 54, 165, 54, 154], color: '#CCCC00', offsets: [-50, 54]
                }, {
                    coords: [81, 150, 90, 154, 90, 165, 81, 169, 72, 165, 72, 154], color: '#FFFF00', offsets: [-50, 72]
                }, {
                    coords: [99, 150, 108, 154, 108, 165, 99, 169, 90, 165, 90, 154], color: '#FFCC00', offsets: [-50, 90]
                }, {
                    coords: [117, 150, 126, 154, 126, 165, 117, 169, 108, 165, 108, 154], color: '#FF9933', offsets: [-50, 108]
                }, {
                    coords: [135, 150, 144, 154, 144, 165, 135, 169, 126, 165, 126, 154], color: '#FF6600', offsets: [-50, 126]
                }, {
                    coords: [153, 150, 162, 154, 162, 165, 153, 169, 144, 165, 144, 154], color: '#FF5050', offsets: [-50, 144]
                }, {
                    coords: [171, 150, 180, 154, 180, 165, 171, 169, 162, 165, 162, 154], color: '#CC0066', offsets: [-50, 162]
                }, {
                    coords: [189, 150, 198, 154, 198, 165, 189, 169, 180, 165, 180, 154], color: '#660033', offsets: [-50, 180]
                }, {
                    coords: [54, 165, 63, 169, 63, 180, 54, 184, 45, 180, 45, 169], color: '#996633', offsets: [-35, 45]
                }, {
                    coords: [72, 165, 81, 169, 81, 180, 72, 184, 63, 180, 63, 169], color: '#CC9900', offsets: [-35, 63]
                }, {
                    coords: [90, 165, 99, 169, 99, 180, 90, 184, 81, 180, 81, 169], color: '#FF9900', offsets: [-35, 81]
                }, {
                    coords: [108, 165, 117, 169, 117, 180, 108, 184, 99, 180, 99, 169], color: '#CC6600', offsets: [-35, 99]
                }, {
                    coords: [126, 165, 135, 169, 135, 180, 126, 184, 117, 180, 117, 169], color: '#FF3300', offsets: [-35, 117]
                }, {
                    coords: [144, 165, 153, 169, 153, 180, 144, 184, 135, 180, 135, 169], color: '#FF0000', offsets: [-35, 135]
                }, {
                    coords: [162, 165, 171, 169, 171, 180, 162, 184, 153, 180, 153, 169], color: '#CC0000', offsets: [-35, 153]
                }, {
                    coords: [180, 165, 189, 169, 189, 180, 180, 184, 171, 180, 171, 169], color: '#990033', offsets: [-35, 171]
                }, {
                    coords: [63, 180, 72, 184, 72, 195, 63, 199, 54, 195, 54, 184], color: '#663300', offsets: [-20, 54]
                }, {
                    coords: [81, 180, 90, 184, 90, 195, 81, 199, 72, 195, 72, 184], color: '#996600', offsets: [-20, 72]
                }, {
                    coords: [99, 180, 108, 184, 108, 195, 99, 199, 90, 195, 90, 184], color: '#CC3300', offsets: [-20, 90]
                }, {
                    coords: [117, 180, 126, 184, 126, 195, 117, 199, 108, 195, 108, 184], color: '#993300', offsets: [-20, 108]
                }, {
                    coords: [135, 180, 144, 184, 144, 195, 135, 199, 126, 195, 126, 184], color: '#990000', offsets: [-20, 126]
                }, {
                    coords: [153, 180, 162, 184, 162, 195, 153, 199, 144, 195, 144, 184], color: '#800000', offsets: [-20, 144]
                }, {
                    coords: [171, 180, 180, 184, 180, 195, 171, 199, 162, 195, 162, 184], color: '#993333', offsets: [-20, 162]
                }
            ];
        })(view = color_picker.view || (color_picker.view = {}));
    })(color_picker = uikit.color_picker || (uikit.color_picker = {}));
})(uikit || (uikit = {}));
//# sourceMappingURL=uikit.colorPicker.js.map