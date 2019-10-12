/// <reference path="../../build/linq.d.ts" />

namespace uikit.table_editor {

    export function fromData<T extends {}>(data: T[], divId: string): tableEditor {
        let headers = Object.keys(data[0]);
        let editor = new tableEditor(headers, divId);

        for (let element of data) {
            editor.edit_lock = false;
            editor.addNew(element).confirmNew();
        }

        return editor;
    }
}