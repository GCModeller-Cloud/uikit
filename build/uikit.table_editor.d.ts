/// <reference path="../../build/linq.d.ts" />
declare namespace uikit.table_editor {
    /**
     * @param filters the object field names
    */
    function fromData<T extends {}>(data: T[], divId: string, filters?: string[], opts?: editorConfig): tableEditor;
}
declare namespace uikit.table_editor {
    /**
     * 对表格之中的单行数据的编辑操作的对象
    */
    class editor {
        tr: HTMLTableRowElement;
        tbody: HTMLElement;
        table: tableEditor;
        /**
         * 操作按钮的表格的列对象
        */
        private editorActiontd;
        private divs;
        dropFlag: boolean;
        private _onremoves;
        /**
         * @param tr 进行数据编辑操作的行对象
        */
        constructor(tr: HTMLTableRowElement, tbody: HTMLElement, table: tableEditor);
        getElementById(id: string): HTMLElement;
        /**
         * 将符合id条件的html元素显示出来
        */
        show(id: string): void;
        /**
         * 隐藏掉目标html元素对象
        */
        hide(id: string): void;
        /**
         * 将表格内容的输入框隐藏掉
        */
        hideInputs(confirm?: boolean): void;
        /**
         * 点击编辑按钮之后显示表格的单元格内容编辑的输入框
        */
        showInputs(): void;
        /**
         * 确认添加新的表格行数据
        */
        confirmNew(): void;
        /**
         * 取消新增的行数据
        */
        cancelAddNew(): void;
        onDelete(action: Delegate.Sub): void;
        /**
         * 对当前的行数据进行删除
        */
        removeCurrent(): void;
        /**
         * 当前的行进入编辑模式
        */
        editThis(): void;
        /**
         * 确认对当前的行数据的编辑操作，并退出编辑模式
        */
        confirmEdit(confirm?: boolean): void;
    }
}
declare namespace uikit.table_editor {
    interface editorConfig {
        style?: string;
        className?: string;
        table_id?: string;
        tdConfig?: columnConfig[];
        warning?: Delegate.Action;
        deleteRow?: Delegate.Sub;
        showRowNumber: boolean;
        allowsAddNew: boolean;
        names?: buttonNames;
        clearContainer?: boolean;
    }
    interface buttonNames {
        remove: string;
        edit: string;
        OK: string;
        cancel: string;
        actions: string;
    }
    interface columnConfig {
        width?: string;
        lockEditor?: boolean;
        /**
         * the display title
        */
        title?: string;
        asUrl?: Delegate.Func<string>;
    }
    function defaultButtonNames(): buttonNames;
    function defaultConfig(): editorConfig;
    function contains(opts: editorConfig, i: number): boolean;
}
declare namespace uikit.table_editor {
    class tableEditor {
        headers: string[];
        opts: editorConfig;
        private tbody;
        private rows;
        /**
         * 只可以同时编辑一行数据，会利用这个开关来锁住再编辑的时候添加新的行数据或者编辑其他的行数据
        */
        edit_lock: boolean;
        table: HTMLTableElement;
        fieldHeaders: string[];
        /**
         * 行号(如果第一列是唯一的数字id，则可以调用这个属性来获取最后一行的id作为id递增计算的基础)
        */
        get keyIndex(): number;
        /**
         * 获取当前表格的行数
        */
        get nrows(): number;
        /**
         * 这个构造函数将会创建一个新的table对象
         *
         * @param id id value of a ``<div>`` tag.
         * @param headers the object field names.
        */
        constructor(id: string, headers: string[], opts?: editorConfig);
        addNew(value?: {}, hideInputs?: boolean): editor;
        private addNewInternal;
        private propertyValue;
        /**
         * 将目标表格中的文本读取出来以进行后续的操作
        */
        TableData<T extends {}>(keepsRowId?: boolean): T[];
        TableRows(): editor[];
        private createObject;
    }
}
declare namespace uikit.table_editor.template {
    /**
     * 定义了如何生成表格之中的行数据进行编辑操作的按钮的html用户界面
    */
    const editor_template: string;
}
