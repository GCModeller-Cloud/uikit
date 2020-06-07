var uikit;
(function (uikit) {
    var colorPicker;
    (function (colorPicker) {
        var instances = {};
        var colorPickerUI = /** @class */ (function () {
            function colorPickerUI(id, defaultColor) {
                if (defaultColor === void 0) { defaultColor = "#000000"; }
                this.id = id;
                this.setColor = DoNothing;
                var rect = $ts(id).getBoundingClientRect();
                var vm = this;
                defaultColor = "#" + defaultColor.replace(/[#]+/g, "");
                defaultColor = defaultColor.toLowerCase();
                this.display = this.createColorItem(defaultColor, false);
                this.display.style.border = "2px solid skyblue";
                this.color = defaultColor;
                this.container = $ts("<div>", { style: "display: none;" });
                this.pickerMenu = $ts("<div>", {
                    class: colorPicker.selectpicker,
                    style: "left: " + rect.left + "px; top: " + rect.top + "px;",
                    onclick: function () {
                        vm.display.style.zIndex = "999";
                        vm.hideOthers();
                    },
                    onblur: function () {
                        vm.hideThis();
                    },
                    onfocusout: function () {
                        vm.hideThis();
                    }
                }).display(this.display)
                    .appendElement(this.container);
                $ts(id).display(this.pickerMenu);
                instances[id] = this;
            }
            colorPickerUI.prototype.hookSetColor = function (action) {
                this.setColor = action;
                return this;
            };
            colorPickerUI.prototype.hideOthers = function () {
                var container = this.container;
                var ui = this;
                if (container.style.display == "none") {
                    container.style.display = "block";
                }
                else {
                    container.style.display = "none";
                }
                for (var id in instances) {
                    if (id != this.id) {
                        ui = instances[id];
                        container = ui.container;
                        container.style.display = "none";
                        ui.display.style.zIndex = "0";
                        ui.container.style.zIndex = "0";
                        ui.pickerMenu.style.zIndex = "0";
                    }
                }
            };
            colorPickerUI.prototype.hideThis = function () {
                if (this.container.style.display == "block") {
                    this.container.style.display = "none";
                }
            };
            colorPickerUI.prototype.createColorItem = function (color, hookEvt) {
                if (hookEvt === void 0) { hookEvt = true; }
                var vm = this;
                return this.createDisplayComponents($ts("<div>", {
                    onclick: function () {
                        if (hookEvt) {
                            vm.setDisplayColor(color);
                        }
                        colorPickerUI.hideAll();
                    },
                    class: "color-item"
                }), color);
            };
            colorPickerUI.prototype.setDisplayColor = function (color) {
                this.setColor(color);
                // set display color
                this.createDisplayComponents(this.display, color);
                this.color = color;
            };
            colorPickerUI.hideAll = function () {
                for (var id in instances) {
                    instances[id].display.style.zIndex = "10";
                    instances[id].container.style.zIndex = "10";
                    instances[id].pickerMenu.style.zIndex = "10";
                }
            };
            colorPickerUI.prototype.createDisplayComponents = function (div, color) {
                return div
                    .clear()
                    .appendElement("&nbsp;&nbsp;")
                    .appendElement($ts("<span>", {
                    style: "background-color: " + color + ";"
                }).display("&nbsp;&nbsp;&nbsp;&nbsp;"))
                    .appendElement("&nbsp;&nbsp;")
                    .appendElement($ts("<span>", {
                    class: "color-text"
                }).display(color));
            };
            colorPickerUI.prototype.addOptions = function (colors) {
                for (var _i = 0, colors_1 = colors; _i < colors_1.length; _i++) {
                    var color = colors_1[_i];
                    this.container.appendElement(this.createColorItem(color.toLowerCase()));
                }
                return this;
            };
            colorPickerUI.prototype.tryHandleMoreColors = function (handler) {
                if (!isNullOrUndefined(handler)) {
                    var item = this.createColorItem("#000000");
                    item.getElementsByClassName("color-text").item(0).innerHTML = "选择更多颜色...";
                    item.onclick = function () {
                        handler();
                    };
                    this.container.appendElement(item);
                }
                return this;
            };
            return colorPickerUI;
        }());
        colorPicker.colorPickerUI = colorPickerUI;
    })(colorPicker = uikit.colorPicker || (uikit.colorPicker = {}));
})(uikit || (uikit = {}));
var uikit;
(function (uikit) {
    var colorPicker;
    (function (colorPicker) {
        colorPicker.selectpicker = "selectpicker";
        function doStyle() {
            var htmlHead = $ts("&head");
            if (isNullOrUndefined($ts("#context-style"))) {
                htmlHead.appendElement($ts("<style>", {
                    id: "context-style"
                }).display("\n        ." + colorPicker.selectpicker + " {\n            width: 150px;\n            box-shadow: 2px 2px 5px lightgray;\n            border-style: solid;\n            border-width: 1px;\n            border-color: grey;\n            border-radius: 3px;\n            padding-left: 5px;\n            padding-right: 5px;\n            padding-top: 3px;\n            padding-bottom: 3px;\n            position: fixed;\n            background-color: white;\ntext-align: left !important;\n        }\n\n        .color-item:hover {\n        background-color: skyblue;\n    }\n\n        .color-item {\n            height: 24px;\n        }"));
            }
        }
        colorPicker.doStyle = doStyle;
    })(colorPicker = uikit.colorPicker || (uikit.colorPicker = {}));
})(uikit || (uikit = {}));
/// <reference path="../../build/linq.d.ts" />
/// <reference path="colorPicker.ts" />
/// <reference path="css.ts" />
var uikit;
(function (uikit) {
    var colorPicker;
    (function (colorPicker) {
        /**
         * @param setColor set color code, this lambda function argument
         *                 requires a string parameter for accept the
         *                 html code of the given color.
        */
        function fast(id, list, setColor, defaultColor, more) {
            if (defaultColor === void 0) { defaultColor = "#000000"; }
            if (more === void 0) { more = null; }
            return new colorPicker.colorPickerUI(id, defaultColor)
                .addOptions(list)
                .tryHandleMoreColors(more)
                .hookSetColor(setColor);
        }
        colorPicker.fast = fast;
    })(colorPicker = uikit.colorPicker || (uikit.colorPicker = {}));
})(uikit || (uikit = {}));
$ts(uikit.colorPicker.doStyle);
//# sourceMappingURL=uikit.fast_colorPicker.js.map