namespace uikit.color_picker {

    export class colorPicker {

        public mapPicker: colorMapEvent;

        private submitOnEnter(e) {
            let keyboardKey = e.which || e.keyCode;

            if (keyboardKey == 13) {
                this.mapPicker.clickColor(0, -1, -1);
            }
        }
    }
}