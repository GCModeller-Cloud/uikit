namespace uikit.table_editor {

    export class tableEditor {

        private headers: string[];
        private rowNumbers: number;
        private tbody: HTMLElement;
        private showRowNumber: boolean;

        public edit_lock: boolean;
        public warningEditLock: () => void;

        /**
         * 这个构造函数将会创建一个新的table对象
         * 
         * @param id id value of a ``<div>`` tag. 
        */
        constructor(headers: string[], id: string,
            style: string = null,
            className: string = null,
            tdWidth: string[] = null,
            warning: () => void = null,
            showRowNumber: boolean = true) {

            if (showRowNumber) {
                headers = ["NO."].concat(headers);
            }

            this.headers = headers;
            this.rowNumbers = 1;
            this.warningEditLock = warning;
            this.showRowNumber = showRowNumber;

            var thead = $ts("<thead>");
            var tbody = $ts("<tbody>");
            var table = $ts("<table>").appendElement(thead).appendElement(tbody);

            $ts(id).appendChild(table);

            if (style) {
                table.setAttribute("style", style);
            }
            if (className) {
                table.className = className;
            }

            let tr = $ts("<tr>");
            let addHeader = function (header: string, i: number) {
                var th = $ts("<th>").display(header);

                thead.appendChild(th);

                if (tdWidth) {
                    th.setAttribute("style", tdWidth[i]);
                }
            }

            thead.appendChild(tr);
            headers.forEach(addHeader);

            this.tbody = tbody;
        }

        public addNew(value: {} = null): editor {
            if (this.edit_lock) {
                if (!this.warningEditLock) {
                    this.warningEditLock();
                }

                return null;
            } else {
                return this.addNewInternal(value);
            }
        }

        private addNewInternal(value: {}): editor {
            // 根据header的数量来生成对应的列
            var tr = $ts("<tr>");
            var i = this.rowNumbers++;
            var displayRowNumber: boolean = this.showRowNumber;

            tr.id = `row-${i}`;

            for (let name of this.headers) {
                var td = $ts("<td>");

                if (displayRowNumber) {
                    displayRowNumber = false;
                    td.innerText = i.toString();
                } else {
                    var text = $ts("<div>", { id: "text" });
                    // <input id="input-symbol" type="text" style="width: 65%" class="form-control"></input>
                    var input = $ts("<input>", {
                        id: `input-${name}`,
                        type: "text",
                        style: "width: 85%",
                        class: "form-control"
                    });

                    if (!isNullOrUndefined(value)) {
                        text.display(value[name]);
                        input.asInput.value = value[name];
                    }

                    td.appendChild(input);
                    td.appendChild(text);
                }

                tr.appendChild(td);
            }

            this.tbody.appendChild(tr);
            this.edit_lock = true;

            return new editor(tr, this.tbody, this);
        }

        /**
         * 将目标表格中的文本读取出来以进行后续的操作
        */
        public TableData<T extends {}>(keepsRowId: boolean = true): T[] {
            var table: T[] = [];
            var trList = this.tbody.getElementsByTagName("tr");

            for (var i = 0; i < trList.length; i++) {
                table.push(this.createObject(trList[i], keepsRowId));
            }

            return table;
        }

        private createObject(tr: HTMLTableRowElement, keepsRowId: boolean): any {
            var tdList = tr.getElementsByTagName("td");
            var row: any = <any>{};
            var isRowId: boolean = this.showRowNumber;

            for (var j = 0; j < tdList.length - 1; j++) {
                var td = tdList[j];
                var text: HTMLElement = td.getElementsByTagName("div")[0];

                if (isRowId) {
                    isRowId = false;

                    if (!keepsRowId) {
                        continue;
                    }
                }

                if (text) {
                    row[this.headers[j]] = text.innerText;
                } else {
                    row[this.headers[j]] = td.innerText;
                }
            }

            return row;
        }
    }
}