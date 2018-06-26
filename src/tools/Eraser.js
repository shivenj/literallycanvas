/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Eraser;
import Pencil from "./Pencil";
import { createShape } from "../core/shapes";


export default (Eraser = (function() {
    Eraser = class Eraser extends Pencil {
        static initClass() {
  
            this.prototype.name = "Eraser";
            this.prototype.iconName = "eraser";
        }

        makePoint(x, y, lc) {
            return createShape("Point", {x, y, size: this.strokeWidth, color: "#000"});
        }
        makeShape() { return createShape("ErasedLinePath") }
    };
    Eraser.initClass();
    return Eraser;
})());
