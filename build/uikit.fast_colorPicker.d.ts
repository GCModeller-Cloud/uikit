/// <reference path="../../build/linq.d.ts" />
declare namespace uikit.colorPicker {
    class colorPickerUI {
        id: string;
        /**
         * the selected color displayer
        */
        private display;
        private pickerMenu;
        private container;
        private setColor;
        color: string;
        constructor(id: string, defaultColor?: string);
        hookSetColor(action: Delegate.Sub): colorPickerUI;
        private hideOthers;
        private hideThis;
        private createColorItem;
        setDisplayColor(color: string): void;
        private static hideAll;
        private createDisplayComponents;
        addOptions(colors: string[]): colorPickerUI;
        tryHandleMoreColors(handler: Delegate.Action): colorPickerUI;
    }
}
declare namespace uikit.colorPicker {
    const selectpicker: string;
    function doStyle(): void;
}
declare namespace uikit.colorPicker {
    /**
     * @param setColor set color code, this lambda function argument
     *                 requires a string parameter for accept the
     *                 html code of the given color.
    */
    function fast(id: string, list: string[], setColor: Delegate.Sub, defaultColor?: string, more?: Delegate.Action): colorPickerUI;
}
