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

        /**
         * @param tr 进行数据编辑操作的行对象
        */
        constructor(public tr: HTMLElement, public tbody: HTMLElement, public table: tableEditor) {
            let vm = this;
            let td = $ts("<td>").display(template.editor_template);

            this.editorActiontd = td;
            this.tr.appendChild(td);
            this.divs = td.getElementsByTagName("div");

            // 进行按钮的事件绑定
            this.getElementById("confirm").onclick = function () { vm.confirmNew() };
            this.getElementById("cancel").onclick = function () { vm.cancelAddNew() };
            this.getElementById("remove").onclick = function () { vm.removeCurrent() };
            this.getElementById("edit").onclick = function () { vm.editThis() };
            this.getElementById("ok").onclick = function () { vm.confirmEdit() };
        }

        public getElementById(id: string): HTMLElement {
            var id_lower = id.toLowerCase();

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
            var tdList = this.tr.getElementsByTagName("td");

            // 最后一个td是editor的td，没有输入框
            // 所以在这里-1跳过最后一个td
            for (var i = 0; i < tdList.length - 1; i++) {
                var td = tdList[i];
                var textDisplay: HTMLElement = td.getElementsByTagName("div")[0];
                var inputBox: HTMLInputElement = td.getElementsByTagName("input")[0];

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
            var tdList = this.tr.getElementsByTagName("td");

            // 最后一个td是editor的td，没有输入框
            // 所以在这里-1跳过最后一个td
            for (var i = 0; i < tdList.length - 1; i++) {
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
            this.tr.remove();
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