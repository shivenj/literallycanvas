import { ToolWithStroke } from "./base";
import { createShape } from "../core/shapes";


class Pencil extends ToolWithStroke {

    begin(x, y, lc) {
        this.color = lc.getColor("primary");
        this.currentShape = this.makeShape();
        this.currentShape.addPoint(this.makePoint(x, y, lc));
        return this.lastEventTime = Date.now();
    }

    continue(x, y, lc) {
        const timeDiff = Date.now() - this.lastEventTime;

        if (timeDiff > this.eventTimeThreshold) {
            this.lastEventTime += timeDiff;
            this.currentShape.addPoint(this.makePoint(x, y, lc));
            return lc.drawShapeInProgress(this.currentShape);
        }
    }

    end(x, y, lc) {
        lc.saveShape(this.currentShape);
        return this.currentShape = undefined;
    }

    makePoint(x, y, lc) {
        return createShape("Point", {x, y, size: this.strokeWidth, color: this.color});
    }
    makeShape() { return createShape("LinePath") }
}

Pencil.name = "Pencil";
Pencil.iconName = "pencil";
Pencil.eventTimeThreshold = 10;


export default Pencil;