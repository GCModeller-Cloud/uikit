namespace uikit.color_picker {

    export interface useColor { (color: TypeScript.ColorManager.w3color): void; }

    export class colorPicker {

        public mapPicker: colorMapEvent;
        public div: HTMLDivElement;

        public constructor(pickDiv: string, using: useColor) {
            let vm = this;

            this.div = $ts(pickDiv).any;
            this.mapPicker = new colorMapEvent(function (color) {
                $ts("#brightness").display(view.hslLum_top(color.toHexString(), vm.mapPicker));
                using(color);
            });
            this.createUI();
        }

        private createUI() {
            this.createMapPicker();
            this.createBrightnessTable();
        }

        private createBrightnessTable() {
            let div = $ts("<div>", { id: "lumtopcontainer" });

            div.append($ts("<div>", { id: "colornamDIV" }));
            div.append($ts("<div>", { id: "colorhexDIV" }));
            div.append($ts("<div>", { id: "colorrgbDIV" }));
            div.append($ts("<div>", { id: "colorhslDIV" }));

            div.append($ts("<div>", { id: "brightness" }));

            this.div.append(div);
        }

        private createMapPicker() {
            let div = $ts("<div>", { style: "text-align:center;" });
            let mapDiv = $ts("<div>");

            div.append($ts("<h3>").display("Pick a Color:"));
            div.append(mapDiv)

            view.createPolyMap(this.mapPicker, mapDiv);

            mapDiv.append($ts("<div>", {
                id: "selectedhexagon",
                style: "visibility: visible; position: relative; width: 21px; height: 21px; background-image: url('img_selectedcolor.gif'); top: -35px; left: 135px;"
            }));
            mapDiv.append($ts("<div>", {
                id: "divpreview",
                style: "visibility: hidden; background-color: rgb(255, 0, 0);"
            }).display("&nbsp;"));

            this.div.append(div);
        }
    }
}