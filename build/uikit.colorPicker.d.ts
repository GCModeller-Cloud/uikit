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
        hh: number;
        constructor(changeColor: useColor);
        mouseOverColor(hex: string): void;
        mouseOutMap(): void;
        clickColor(hex: number | string, seltop: number, selleft: number): void;
    }
}
declare namespace uikit.color_picker {
    interface useColor {
        (color: TypeScript.ColorManager.w3color): void;
    }
    class colorPicker {
        mapPicker: colorMapEvent;
        div: HTMLDivElement;
        constructor(pickDiv: string, using: useColor);
        private createUI;
        private createBrightnessTable;
        private createMapPicker;
    }
}
declare namespace uikit.color_picker.view {
    interface IpolyMap {
        coords: number[];
        color: string;
        offsets: number[];
    }
    function createPolyMap(evt: colorMapEvent, container: string | IHTMLElement): void;
    const colorMapBase64: string;
    const poly: IpolyMap[];
}
