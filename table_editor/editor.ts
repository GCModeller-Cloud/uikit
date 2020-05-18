namespace uikit.table_editor {

    /**
     * 对表格之中的单行数据的编辑操作的对象
    */
    export class editor {

        /**
         * 操作按钮的表格的列对象
        */
        private editorActiontd: HTMLElement;
        private divs: NodeListOf<HTMLDivElement>;

        public dropFlag: boolean = false;

        /**
         * @param tr 进行数据编辑操作的行对象
        */
        constructor(public tr: HTMLTableRowElement, public tbody: HTMLElement, public table: tableEditor) {
            let vm = this;
            let names = table.opts.names;
            let html: string = template.editor_template
                .replace("{1}", names.OK)
                .replace("{2}", names.cancel)
                .replace("{3}", names.remove)
                .replace("{4}", names.edit)
                .replace("{5}", names.OK);
            let td = $ts("<td>").display(html);

            this.editorActiontd = td;
            this.tr.appendChild(td);
            this.divs = <any>td.getElementsByTagName("div");

            // 进行按钮的事件绑定
            this.getElementById("confirm").onclick = function () { vm.confirmNew() };
            this.getElementById("cancel").onclick = function () { vm.cancelAddNew() };
            this.getElementById("remove").onclick = function () { vm.removeCurrent() };
            this.getElementById("edit").onclick = function () { vm.editThis() };
            this.getElementById("ok").onclick = function () { vm.confirmEdit() };
        }

        public getElementById(id: string): HTMLElement {
            let id_lower = id.toLowerCase();

            for (var i = 0; i < this.divs.length; i++) {
                var div: HTMLElement = this.divs[i];

                if (div.id.toLowerCase() == id_lower) {
                    return div;
                }

                var abuttons = div.getElementsByTagName("a");

                for (var j = 0; j < abuttons.length; j++) {
                    var a: HTMLElement = abuttons[j];

                    if (a.id.toLowerCase() == id_lower) {
                        return a;
                    }
                }
            }

            return null;
        }

        /**
         * 将符合id条件的html元素显示出来
        */
        public show(id: string) {
            this.getElementById(id).style.display = "block";
        }

        /**
         * 隐藏掉目标html元素对象
        */
        public hide(id: string) {
            this.getElementById(id).style.display = "none";
        }

        /**
         * 将表格内容的输入框隐藏掉
        */
        public hideInputs() {
            let tdList = this.tr.getElementsByTagName("td");
            let config = this.table.opts.tdConfig;

            // 最后一个td是editor的td，没有输入框
            // 所以在这里-1跳过最后一个td
            for (var i = 0; i < tdList.length - 1; i++) {
                if ((!isNullOrEmpty(config)) && config.length > i && config[i].lockEditor) {
                    continue;
                }

                let td = tdList[i];
                let textDisplay: HTMLElement = td.getElementsByTagName("div")[0];
                let inputBox: HTMLInputElement = td.getElementsByTagName("input")[0];

                if (textDisplay && inputBox) {
                    textDisplay.innerText = inputBox.value;
                    textDisplay.style.display = "block";

                    inputBox.style.display = "none";
                }
            }
        }

        /**
         * 点击编辑按钮之后显示表格的单元格内容编辑的输入框
        */
        public showInputs() {
            let tdList = this.tr.getElementsByTagName("td");
            let config = this.table.opts.tdConfig;

            // 最后一个td是editor的td，没有输入框
            // 所以在这里-1跳过最后一个td
            for (let i = 0; i < tdList.length - 1; i++) {
                if ((!isNullOrEmpty(config)) && config.length > i && config[i].lockEditor) {
                    continue;
                }

                var td = tdList[i];
                var textDisplay: HTMLElement = td.getElementsByTagName("div")[0];
                var inputBox: HTMLInputElement = td.getElementsByTagName("input")[0];

                if (textDisplay && inputBox) {
                    inputBox.value = textDisplay.innerText;
                    inputBox.style.display = "block";

                    textDisplay.style.display = "none";
                }
            }
        }

        /**
         * 确认添加新的表格行数据
        */
        public confirmNew() {
            this.hide("row-new-pending");
            this.show("remove-button");
            this.hideInputs();
            this.table.edit_lock = false;
        }

        /**
         * 取消新增的行数据
        */
        public cancelAddNew() {
            this.tr.remove();
            this.table.edit_lock = false;
        }

        /**
         * 对当前的行数据进行删除
        */
        public removeCurrent() {
            // this.dropFlag = true;

            if (isNullOrUndefined(this.table.opts.deleteRow)) {
                this.tr.remove();
            } else {
                this.table.opts.deleteRow(this.tr, this);
            }
        }

        /**
         * 当前的行进入编辑模式
        */
        public editThis() {
            this.showInputs();
            this.hide("remove-button");
            this.show("edit-button");
            this.table.edit_lock = true;
        }

        /**
         * 确认对当前的行数据的编辑操作，并退出编辑模式
        */
        public confirmEdit() {
            this.hideInputs();
            this.show("remove-button");
            this.hide("edit-button");
            this.table.edit_lock = false;
        }
    }
}