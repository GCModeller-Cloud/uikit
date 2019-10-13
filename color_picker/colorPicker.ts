namespace uikit.color_picker {

  export class colorPicker {

    public colorhex = "#FF0000";
    public color = "#FF0000";
    public colorObj = w3color(color);

    mouseOverColor(hex) {
      document.getElementById("divpreview").style.visibility = "visible";
      document.getElementById("divpreview").style.backgroundColor = hex;
      document.body.style.cursor = "pointer";
    }

    mouseOutMap() {
      if (hh == 0) {
        document.getElementById("divpreview").style.visibility = "hidden";
      } else {
        hh = 0;
      }
      document.getElementById("divpreview").style.backgroundColor = colorObj.toHexString();
      document.body.style.cursor = "";
    }
    public hh = 0;
    clickColor(hex, seltop, selleft, html5) {
      var c, cObj, colormap, areas, i, areacolor, cc;
      if (html5 && html5 == 5) {
        c = document.getElementById("html5colorpicker").value;
      } else {
        if (hex == 0) {
          c = document.getElementById("entercolor").value;
        } else {
          c = hex;
        }
      }
      cObj = w3color(c);
      colorhex = cObj.toHexString();
      if (cObj.valid) {
        clearWrongInput();
      } else {
        wrongInput();
        return;
      }
      r = cObj.red;
      g = cObj.green;
      b = cObj.blue;
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
          if (areacolor.toLowerCase() == colorhex) {
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
      document.getElementById("html5colorpicker").value = cObj.toHexString();
      document.getElementById('slideRed').value = r;
      document.getElementById('slideGreen').value = g;
      document.getElementById('slideBlue').value = b;
      changeRed(r); changeGreen(g); changeBlue(b);
      changeColor();
      document.getElementById("fixed").style.backgroundColor = cObj.toHexString();
    }
function wrongInput() {
    document.getElementById("entercolorDIV").className = "has-error";
    document.getElementById("wronginputDIV").style.display = "block";
  }
  function clearWrongInput() {
    document.getElementById("entercolorDIV").className = "";
    document.getElementById("wronginputDIV").style.display = "none";
  }
  function changeRed(value) {
    document.getElementById('valRed').innerHTML = value;
    changeAll();
  }
  function changeGreen(value) {
    document.getElementById('valGreen').innerHTML = value;
    changeAll();
  }
  function changeBlue(value) {
    document.getElementById('valBlue').innerHTML = value;
    changeAll();
  }
  function changeAll() {
    var r = document.getElementById('valRed').innerHTML;
    var g = document.getElementById('valGreen').innerHTML;
    var b = document.getElementById('valBlue').innerHTML;
    document.getElementById('change').style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    document.getElementById('changetxt').innerHTML = "rgb(" + r + ", " + g + ", " + b + ")";
    document.getElementById('changetxthex').innerHTML = w3color("rgb(" + r + "," + g + "," + b + ")").toHexString();
  }

  function changeColor(value) {
    hslLum_top();
    hslTable("hue");
    hslTable("sat");
    hslTable("light");
  }
  window.onload = function () {
    var x = document.createElement("input");
    x.setAttribute("type", "color");
    if (x.type == "text") {
      document.getElementById("html5DIV").style.visibility = "hidden";
    }
  }
  function submitOnEnter(e) {
    keyboardKey = e.which || e.keyCode;
    if (keyboardKey == 13) {
      clickColor(0, -1, -1);
    }
  }
}
