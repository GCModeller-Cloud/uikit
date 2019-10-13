/// <reference path="../../build/linq.d.ts" />
declare namespace uikit.color_picker.view {
    /**
     * 生成亮度调整选择的表格
    */
    function hslLum_top(color: string): string;
    function hslTable(color: string, x: "hue" | "sat" | "light"): any;
}
declare namespace uikit.color_picker {
    class colorMapEvent {
        private changeColor;
        colorhex: string;
        color: string;
        colorObj: TypeScript.ColorManager.w3color;
        constructor(changeColor: Delegate.Sub);
        mouseOverColor(hex: string): void;
        mouseOutMap(): void;
        hh: number;
        clickColor(hex: number | string, seltop: number, selleft: number, html5?: number): void;
        wrongInput(): void;
        clearWrongInput(): void;
        changeRed(value: any): void;
        changeGreen(value: any): void;
        changeBlue(value: any): void;
        changeAll(): void;
    }
}
declare namespace uikit.color_picker {
    class colorPicker {
        mapPicker: colorMapEvent;
        private submitOnEnter;
    }
}
declare namespace uikit.color_picker.view {
    interface IpolyMap {
        coords: number[];
        color: string;
        offsets: number[];
    }
    function createPolyMap(evt: colorMapEvent, containerId: string): void;
    const colorMapBase64: string;
    const poly: IpolyMap[];
}
