namespace uikit.color_picker {

    export class colorMapEvent {

        public colorhex = "#FF0000";
        public color = "#FF0000";
        public colorObj = new TypeScript.ColorManager.w3color(this.color);
        public hh = 0;

        public constructor(private changeColor: useColor) {

        }

        mouseOverColor(hex: string) {
            document.getElementById("divpreview").style.visibility = "visible";
            document.getElementById("divpreview").style.backgroundColor = hex;
            document.body.style.cursor = "pointer";
        }

        mouseOutMap() {
            if (this.hh == 0) {
                document.getElementById("divpreview").style.visibility = "hidden";
            } else {
                this.hh = 0;
            }
            document.getElementById("divpreview").style.backgroundColor = this.colorObj.toHexString();
            document.body.style.cursor = "";
        }
       
        clickColor(hex: number | string, seltop: number, selleft: number) {
            var c;
            var cObj: TypeScript.ColorManager.w3color;
            var colormap, areas, i, areacolor, cc;

            if (hex == 0) {
                c = document.getElementById("entercolor").value;
            } else {
                c = hex;
            }

            cObj = new TypeScript.ColorManager.w3color(c);

            this.colorhex = cObj.toHexString();

            if (cObj.valid) {
                this.clearWrongInput();
            } else {
                this.wrongInput();
                return;
            }

            let r = cObj.red;
            let g = cObj.green;
            let b = cObj.blue;

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
            } else {
                document.getElementById("divpreview").style.backgroundColor = cObj.toHexString();
                document.getElementById("selectedhexagon").style.visibility = "hidden";
            }
            document.getElementById("selectedcolor").style.backgroundColor = cObj.toHexString();
            document.getElementById('slideRed').value = r;
            document.getElementById('slideGreen').value = g;
            document.getElementById('slideBlue').value = b;
            this.changeRed(r); this.changeGreen(g); this.changeBlue(b);
            this.changeColor(this.colorObj);
            document.getElementById("fixed").style.backgroundColor = cObj.toHexString();
        }
        wrongInput() {
            document.getElementById("entercolorDIV").className = "has-error";
            document.getElementById("wronginputDIV").style.display = "block";
        }
        clearWrongInput() {
            document.getElementById("entercolorDIV").className = "";
            document.getElementById("wronginputDIV").style.display = "none";
        }
        changeRed(value) {
            document.getElementById('valRed').innerHTML = value;
            this.changeAll();
        }
        changeGreen(value) {
            document.getElementById('valGreen').innerHTML = value;
            this.changeAll();
        }
        changeBlue(value) {
            document.getElementById('valBlue').innerHTML = value;
            this.changeAll();
        }
        changeAll() {
            var r = document.getElementById('valRed').innerHTML;
            var g = document.getElementById('valGreen').innerHTML;
            var b = document.getElementById('valBlue').innerHTML;
            document.getElementById('change').style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
            document.getElementById('changetxt').innerHTML = "rgb(" + r + ", " + g + ", " + b + ")";
            document.getElementById('changetxthex').innerHTML = new TypeScript.ColorManager.w3color("rgb(" + r + "," + g + "," + b + ")").toHexString();
        }
    }
}