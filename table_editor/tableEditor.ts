namespace uikit.table_editor {

    export class tableEditor {

        private tbody: HTMLElement;
        private rows: editor[];

        /**
         * 只可以同时编辑一行数据，会利用这个开关来锁住再编辑的时候添加新的行数据或者编辑其他的行数据
        */
        public edit_lock: boolean;

        /**
         * 这个构造函数将会创建一个新的table对象
         * 
         * @param id id value of a ``<div>`` tag. 
        */
        constructor(id: string, public headers: string[], public opts: editorConfig = defaultConfig()) {
            if (opts.showRowNumber) {
                this.headers = ["NO."].concat(headers);
            }

            this.rows = [];

            let thead = $ts("<thead>");
            let tbody = $ts("<tbody>");
            let table = $ts("<table>").appendElement(thead).appendElement(tbody);

            $ts(id).clear().appendElement(table);

            if (!Strings.Empty(opts.style, true)) {
                table.setAttribute("style", opts.style);
            }
            if (!Strings.Empty(opts.className, true)) {
                table.className = opts.className;
            }

            let tr = $ts("<tr>");
            let addHeader = function (header: string, i: number) {
                let th = $ts("<th>").display(header);
                let config: columnConfig = contains(opts, i) ? <columnConfig>{ lockEditor: false } : opts.tdConfig[i];

                thead.appendChild(th);

                if (!Strings.Empty(config.width)) {
                    th.setAttribute("style", config.width);
                }
                if (!Strings.Empty(config.title)) {
                    th.display(config.title);
                }
            }

            thead.appendChild(tr);
            headers.concat([opts.names.actions]).forEach(addHeader);

            this.tbody = tbody;
        }

        public addNew(value: {} = null, hideInputs: boolean = false): editor {
            if (this.edit_lock || !this.opts.allowsAddNew) {
                if (!isNullOrUndefined(this.opts.warning)) {
                    this.opts.warning();
                }

                return null;
            } else {
                let row = this.addNewInternal(value, hideInputs);
                this.rows.push(row);
                return row;
            }
        }

        private addNewInternal(value: {}, hideInputs: boolean): editor {
            // 根据header的数量来生成对应的列
            let tr = $ts("<tr>");
            let i = this.rows.length + 1;
            let displayRowNumber: boolean = this.opts.showRowNumber;

            tr.id = `row-${i}`;

            for (let name of this.headers) {
                let td = $ts("<td>");

                if (displayRowNumber) {
                    displayRowNumber = false;
                    td.innerText = i.toString();
                } else {
                    let text = $ts("<div>", { id: "text" });
                    // <input id="input-symbol" type="text" style="width: 65%" class="form-control"></input>
                    let input = $ts("<input>", {
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

                    if (hideInputs) {
                        input.style.display = "none";
                    }
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
            let table: T[] = [];
            let trList = this.tbody.getElementsByTagName("tr");

            for (let i = 0; i < trList.length; i++) {
                table.push(this.createObject(trList[i], keepsRowId));
            }

            return table;
        }

        public TableRows(): editor[] {
            return [...this.rows];
        }

        private createObject(tr: HTMLTableRowElement, keepsRowId: boolean): any {
            let tdList = tr.getElementsByTagName("td");
            let row: any = <any>{};
            let isRowId: boolean = this.opts.showRowNumber;

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