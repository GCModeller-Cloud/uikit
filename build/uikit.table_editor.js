var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/// <reference path="../../build/linq.d.ts" />
var uikit;
(function (uikit) {
    var table_editor;
    (function (table_editor) {
        function fromData(data, divId, filters, opts) {
            if (opts === void 0) { opts = table_editor.defaultConfig(); }
            var haveFilter = !isNullOrEmpty(filters);
            var headers = haveFilter ? filters : Object.keys(data[0]);
            var editor = new table_editor.tableEditor(divId, headers, opts);
            var lock = opts.allowsAddNew;
            var copy;
            editor.opts.allowsAddNew = true;
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var element = data_1[_i];
                if (haveFilter) {
                    copy = {};
                    for (var _a = 0, filters_1 = filters; _a < filters_1.length; _a++) {
                        var name_1 = filters_1[_a];
                        copy[name_1] = element[name_1];
                    }
                    element = copy;
                }
                editor.edit_lock = false;
                editor.addNew(element, true).confirmNew();
            }
            editor.opts.allowsAddNew = lock;
            return editor;
        }
        table_editor.fromData = fromData;
    })(table_editor = uikit.table_editor || (uikit.table_editor = {}));
})(uikit || (uikit = {}));
var uikit;
(function (uikit) {
    var table_editor;
    (function (table_editor) {
        /**
         * 对表格之中的单行数据的编辑操作的对象
        */
        var editor = /** @class */ (function () {
            /**
             * @param tr 进行数据编辑操作的行对象
            */
            function editor(tr, tbody, table) {
                this.tr = tr;
                this.tbody = tbody;
                this.table = table;
                this.dropFlag = false;
                var vm = this;
                var names = table.opts.names || table_editor.defaultButtonNames();
                var html = table_editor.template.editor_template
                    .replace("{1}", names.OK)
                    .replace("{2}", names.cancel)
                    .replace("{3}", names.remove)
                    .replace("{4}", names.edit)
                    .replace("{5}", names.OK);
                var td = $ts("<td>").display(html);
                this.editorActiontd = td;
                this.tr.appendChild(td);
                this.divs = td.getElementsByTagName("div");
                // 进行按钮的事件绑定
                this.getElementById("confirm").onclick = function () { vm.confirmNew(); };
                this.getElementById("cancel").onclick = function () { vm.cancelAddNew(); };
                this.getElementById("remove").onclick = function () { vm.removeCurrent(); };
                this.getElementById("edit").onclick = function () { vm.editThis(); };
                this.getElementById("ok").onclick = function () { vm.confirmEdit(); };
            }
            editor.prototype.getElementById = function (id) {
                var id_lower = id.toLowerCase();
                for (var i = 0; i < this.divs.length; i++) {
                    var div = this.divs[i];
                    if (div.id.toLowerCase() == id_lower) {
                        return div;
                    }
                    var abuttons = div.getElementsByTagName("a");
                    for (var j = 0; j < abuttons.length; j++) {
                        var a = abuttons[j];
                        if (a.id.toLowerCase() == id_lower) {
                            return a;
                        }
                    }
                }
                return null;
            };
            /**
             * 将符合id条件的html元素显示出来
            */
            editor.prototype.show = function (id) {
                this.getElementById(id).style.display = "block";
            };
            /**
             * 隐藏掉目标html元素对象
            */
            editor.prototype.hide = function (id) {
                this.getElementById(id).style.display = "none";
            };
            /**
             * 将表格内容的输入框隐藏掉
            */
            editor.prototype.hideInputs = function () {
                var tdList = this.tr.getElementsByTagName("td");
                var config = this.table.opts.tdConfig;
                // 最后一个td是editor的td，没有输入框
                // 所以在这里-1跳过最后一个td
                for (var i = 0; i < tdList.length - 1; i++) {
                    if ((!isNullOrEmpty(config)) && config.length > i && config[i].lockEditor) {
                        continue;
                    }
                    var td = tdList[i];
                    var textDisplay = td.getElementsByTagName("div")[0];
                    var inputBox = td.getElementsByTagName("input")[0];
                    if (textDisplay && inputBox) {
                        // 在这里进行编辑后的结果值的更新
                        if (!isNullOrUndefined(config[i].asUrl)) {
                            textDisplay.innerHTML = config[i].asUrl(inputBox.value);
                        }
                        else {
                            textDisplay.innerText = inputBox.value;
                        }
                        textDisplay.style.display = "block";
                        inputBox.style.display = "none";
                    }
                }
            };
            /**
             * 点击编辑按钮之后显示表格的单元格内容编辑的输入框
            */
            editor.prototype.showInputs = function () {
                var tdList = this.tr.getElementsByTagName("td");
                var config = this.table.opts.tdConfig;
                // 最后一个td是editor的td，没有输入框
                // 所以在这里-1跳过最后一个td
                for (var i = 0; i < tdList.length - 1; i++) {
                    if ((!isNullOrEmpty(config)) && config.length > i && config[i].lockEditor) {
                        continue;
                    }
                    var td = tdList[i];
                    var textDisplay = td.getElementsByTagName("div")[0];
                    var inputBox = td.getElementsByTagName("input")[0];
                    if (textDisplay && inputBox) {
                        inputBox.value = textDisplay.innerText;
                        inputBox.style.display = "block";
                        textDisplay.style.display = "none";
                    }
                }
            };
            /**
             * 确认添加新的表格行数据
            */
            editor.prototype.confirmNew = function () {
                this.hide("row-new-pending");
                this.show("remove-button");
                this.hideInputs();
                this.table.edit_lock = false;
            };
            /**
             * 取消新增的行数据
            */
            editor.prototype.cancelAddNew = function () {
                this.tr.remove();
                this.table.edit_lock = false;
            };
            /**
             * 对当前的行数据进行删除
            */
            editor.prototype.removeCurrent = function () {
                // this.dropFlag = true;
                if (isNullOrUndefined(this.table.opts.deleteRow)) {
                    this.tr.remove();
                }
                else {
                    this.table.opts.deleteRow(this.tr, this);
                }
            };
            /**
             * 当前的行进入编辑模式
            */
            editor.prototype.editThis = function () {
                this.showInputs();
                this.hide("remove-button");
                this.show("edit-button");
                this.table.edit_lock = true;
            };
            /**
             * 确认对当前的行数据的编辑操作，并退出编辑模式
            */
            editor.prototype.confirmEdit = function () {
                this.hideInputs();
                this.show("remove-button");
                this.hide("edit-button");
                this.table.edit_lock = false;
            };
            return editor;
        }());
        table_editor.editor = editor;
    })(table_editor = uikit.table_editor || (uikit.table_editor = {}));
})(uikit || (uikit = {}));
var uikit;
(function (uikit) {
    var table_editor;
    (function (table_editor) {
        function defaultButtonNames() {
            return {
                remove: "Remove",
                edit: "Edit",
                OK: "Okey",
                cancel: "Cancel",
                actions: "Actions"
            };
        }
        table_editor.defaultButtonNames = defaultButtonNames;
        function defaultConfig() {
            return {
                style: null,
                className: "table",
                tdConfig: null,
                warning: DoNothing,
                showRowNumber: false,
                allowsAddNew: true,
                names: defaultButtonNames()
            };
        }
        table_editor.defaultConfig = defaultConfig;
        function contains(opts, i) {
            return (isNullOrUndefined(opts.tdConfig) || opts.tdConfig.length <= i);
        }
        table_editor.contains = contains;
    })(table_editor = uikit.table_editor || (uikit.table_editor = {}));
})(uikit || (uikit = {}));
var uikit;
(function (uikit) {
    var table_editor;
    (function (table_editor) {
        var tableEditor = /** @class */ (function () {
            /**
             * 这个构造函数将会创建一个新的table对象
             *
             * @param id id value of a ``<div>`` tag.
            */
            function tableEditor(id, headers, opts) {
                if (opts === void 0) { opts = table_editor.defaultConfig(); }
                this.headers = headers;
                this.opts = opts;
                if (opts.showRowNumber) {
                    this.headers = ["NO."].concat(headers);
                }
                this.rows = [];
                var thead = $ts("<thead>");
                var tbody = $ts("<tbody>");
                var table = $ts("<table>").appendElement(thead).appendElement(tbody);
                $ts(id).clear().appendElement(table);
                if (!Strings.Empty(opts.style, true)) {
                    table.setAttribute("style", opts.style);
                }
                if (!Strings.Empty(opts.className, true)) {
                    table.className = opts.className;
                }
                var tr = $ts("<tr>");
                var addHeader = function (header, i) {
                    var th = $ts("<th>").display(header);
                    var config = table_editor.contains(opts, i) ? { lockEditor: false } : opts.tdConfig[i];
                    thead.appendChild(th);
                    if (!Strings.Empty(config.width)) {
                        th.setAttribute("style", config.width);
                    }
                    if (!Strings.Empty(config.title)) {
                        th.display(config.title);
                    }
                };
                thead.appendChild(tr);
                var names = headers;
                if (isNullOrUndefined(opts.names) || Strings.Empty(opts.names.actions, true)) {
                    names = names.concat(["actions"]);
                }
                else {
                    names = headers.concat([opts.names.actions]);
                }
                names.forEach(addHeader);
                this.tbody = tbody;
            }
            tableEditor.prototype.addNew = function (value, hideInputs) {
                if (value === void 0) { value = null; }
                if (hideInputs === void 0) { hideInputs = false; }
                if (this.edit_lock || !this.opts.allowsAddNew) {
                    if (!isNullOrUndefined(this.opts.warning)) {
                        this.opts.warning();
                    }
                    return null;
                }
                else {
                    var row = this.addNewInternal(value, hideInputs);
                    this.rows.push(row);
                    return row;
                }
            };
            tableEditor.prototype.addNewInternal = function (value, hideInputs) {
                // 根据header的数量来生成对应的列
                var i = this.rows.length + 1;
                var displayRowNumber = this.opts.showRowNumber;
                var tr = $ts("<tr>", {
                    id: "row-" + i
                });
                for (var _i = 0, _a = this.headers; _i < _a.length; _i++) {
                    var name_2 = _a[_i];
                    var td = $ts("<td>");
                    if (displayRowNumber) {
                        displayRowNumber = false;
                        td.innerText = i.toString();
                    }
                    else {
                        var text = $ts("<div>", { id: "text" });
                        // <input id="input-symbol" type="text" style="width: 65%" class="form-control"></input>
                        var input = $ts("<input>", {
                            id: "input-" + name_2,
                            type: "text",
                            style: "width: 85%",
                            class: "form-control"
                        });
                        if (!isNullOrUndefined(value)) {
                            text.display(value[name_2]);
                            input.asInput.value = value[name_2];
                        }
                        td.appendChild(input);
                        td.appendChild(text);
                        if (hideInputs) {
                            input.style.display = "none";
                        }
                    }
                    tr.appendChild(td);
                }
                this.tbody.appendChild(tr);
                this.edit_lock = true;
                return new table_editor.editor(tr, this.tbody, this);
            };
            /**
             * 将目标表格中的文本读取出来以进行后续的操作
            */
            tableEditor.prototype.TableData = function (keepsRowId) {
                if (keepsRowId === void 0) { keepsRowId = true; }
                var table = [];
                var trList = this.tbody.getElementsByTagName("tr");
                for (var i = 0; i < trList.length; i++) {
                    table.push(this.createObject(trList[i], keepsRowId));
                }
                return table;
            };
            tableEditor.prototype.TableRows = function () {
                return __spreadArrays(this.rows);
            };
            tableEditor.prototype.createObject = function (tr, keepsRowId) {
                var tdList = tr.getElementsByTagName("td");
                var row = {};
                var isRowId = this.opts.showRowNumber;
                for (var j = 0; j < tdList.length - 1; j++) {
                    var td = tdList[j];
                    var text = td.getElementsByTagName("div")[0];
                    if (isRowId) {
                        isRowId = false;
                        if (!keepsRowId) {
                            continue;
                        }
                    }
                    if (text) {
                        row[this.headers[j]] = text.innerText;
                    }
                    else {
                        row[this.headers[j]] = td.innerText;
                    }
                }
                return row;
            };
            return tableEditor;
        }());
        table_editor.tableEditor = tableEditor;
    })(table_editor = uikit.table_editor || (uikit.table_editor = {}));
})(uikit || (uikit = {}));
var uikit;
(function (uikit) {
    var table_editor;
    (function (table_editor) {
        var template;
        (function (template) {
            /**
             * 定义了如何生成表格之中的行数据进行编辑操作的按钮的html用户界面
            */
            template.editor_template = "\n        <div id=\"row-new-pending\">\n            <span class=\"label label-success\"><a href=\"" + executeJavaScript + "\" id=\"confirm\">{1}</a></span>&nbsp;\n            <span class=\"label label-warning\"><a href=\"" + executeJavaScript + "\" id=\"cancel\">{2}</a></span>\n        </div>\n        <div id=\"remove-button\" style=\"display:none;\">            \n            <span class=\"label label-warning\"><a href=\"" + executeJavaScript + "\" id=\"remove\">{3}</a></span>            \n            <span class=\"label label-info\"><a href=\"" + executeJavaScript + "\" id=\"edit\">{4}</a></span>          \n        </div>\n        <div id=\"edit-button\" style=\"display:none;\">            \n            <span class=\"label label-success\"><a href=\"" + executeJavaScript + "\" id=\"ok\">{5}</a></span>\n        </div>";
        })(template = table_editor.template || (table_editor.template = {}));
    })(table_editor = uikit.table_editor || (uikit.table_editor = {}));
})(uikit || (uikit = {}));
//# sourceMappingURL=uikit.table_editor.js.map