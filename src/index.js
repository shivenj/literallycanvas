import "./ie_customevent";
import "./ie_setLineDash";

import LiterallyCanvasModel from "./core/LiterallyCanvas";
import defaultOptions from "./core/defaultOptions";

import { defineCanvasRenderer, renderShapeToCanvas, renderShapeToContext } from "./core/canvasRenderer";
import { defineSVGRenderer, renderShapeToSVG } from "./core/svgRenderer";
import { defineShape, createShape, JSONToShape, shapeToJSON } from "./core/shapes";
import {
    addImageOnload,
    last,
    classSet,
    matchElementSize,
    combineCanvases,
    renderShapes,
    renderShapesToSVG,
    getBoundingRect,
    getDefaultImageRect,
    getBackingScale,
    getGUID,
    requestAnimationFrame,
    cancelAnimationFrame,
} from "./core/util";
import renderSnapshotToImage from "./core/renderSnapshotToImage";
import renderSnapshotToSVG from "./core/renderSnapshotToSVG";

import { localize } from "./core/localization";

import Ellipse from "./tools/Ellipse";
import Eraser from "./tools/Eraser";
import Eyedropper from "./tools/Eyedropper";
import Line from "./tools/Line";
import Pan from "./tools/Pan";
import Pencil from "./tools/Pencil";
import Polygon from "./tools/Polygon";
import Rectangle from "./tools/Rectangle";
import Text from "./tools/Text";
import SelectShape from "./tools/SelectShape";
import {Tool, ToolWithStroke} from "./tools/base";

// @ifdef INCLUDE_GUI
import LiterallyCanvasReactComponent from "./reactGUI/LiterallyCanvas";
import initReactDOM from "./reactGUI/initDOM";
import "./optionsStyles/font";
import "./optionsStyles/stroke-width";
import "./optionsStyles/line-options-and-stroke-width";
import "./optionsStyles/polygon-and-stroke-width";
import "./optionsStyles/stroke-or-fill";
import "./optionsStyles/null";
import { defineOptionsStyle } from "./optionsStyles/optionsStyles";
// @endif

var conversion = {
    snapshotToShapes(snapshot) {
        snapshot.shapes.map((shape) => JSONToShape(shape));
    },
    snapshotJSONToShapes(json) { conversion.snapshotToShapes(JSON.parse(json)) }
};


const tools = {
    Pencil,
    Eraser,
    Line,
    Rectangle,
    Ellipse,
    Text,
    Polygon,
    Pan,
    Eyedropper,
    SelectShape,

    Tool,
    ToolWithStroke,
};


const defaultTools = defaultOptions.tools;
let defaultImageURLPrefix = defaultOptions.imageURLPrefix;
const setDefaultImageURLPrefix = function(newDefault) {
    defaultImageURLPrefix = newDefault;
    defaultOptions.imageURLPrefix = newDefault;
};


const init = function(el, opts) {
    if (opts == null) { opts = {} }
    for (let opt in defaultOptions) {
        if (!(opt in opts)) {
            opts[opt] = defaultOptions[opt];
        }
    }

    // Destroy all children of the element we're using

    for (let child of el.children) {
        el.removeChild(child);
    }

    // @ifdef INCLUDE_GUI
    return initReactDOM(el, opts);
    // @endif
    // @ifndef INCLUDE_GUI
    return initWithoutGUI(el, opts);
    // @endif
};


var initWithoutGUI = function(el, opts) {
    const originalClassName = el.className;
    if ([" ", " "].join(el.className).indexOf(" literally ") === -1) {
        el.className = el.className + " literally";
    }

    if (el.className.indexOf("toolbar-hidden") === -1) {
        el.className = el.className + " toolbar-hidden";
    }

    if ("imageSize" in opts && "height" in opts.imageSize) {
        el.style.height = opts.imageSize.height + "px";
    }

    const drawingViewElement = document.createElement("div");
    drawingViewElement.className = "lc-drawing";
    el.appendChild(drawingViewElement);

    const lc = new LiterallyCanvasModel(drawingViewElement, opts);
    lc.teardown = function() {
        lc._teardown();
        for (let child of el.children) {
            el.removeChild(child);
        }
        el.className = originalClassName;
    };

    if ("onInit" in opts) {
        opts.onInit(lc);
    }

    return lc;
};


const registerJQueryPlugin = _$ =>
    _$.fn.literallycanvas = function(opts) {
        if (opts == null) { opts = {} }
        this.each((ix, el) => {
            el.literallycanvas = init(el, opts);
        });
        return this;
    }
;


// non-browserify compatibility
if (typeof window !== "undefined") {
    window.LC = {init};
    if (window.$) {
        registerJQueryPlugin(window.$);
    }
}

const snapshotToShapes = conversion.snapshotToShapes;
const snapshotJSONToShapes = conversion.snapshotJSONToShapes;

// This one is for backward compatibility
const util = {
    addImageOnload,
    last,
    classSet,
    matchElementSize,
    combineCanvases,
    renderShapes,
    renderShapesToSVG,
    getBoundingRect,
    getDefaultImageRect,
    getBackingScale,
    getGUID,
    requestAnimationFrame,
    cancelAnimationFrame,
};

export {
    init, registerJQueryPlugin, util, tools,
    setDefaultImageURLPrefix, defaultTools,
    // @ifdef INCLUDE_GUI
    defineOptionsStyle,
    LiterallyCanvasReactComponent,
    // @endif

    defineShape,
    createShape,
    JSONToShape,
    shapeToJSON,

    defineCanvasRenderer,
    renderShapeToContext,
    renderShapeToCanvas,
    renderShapes as renderShapesToCanvas,

    defineSVGRenderer,
    renderShapeToSVG,
    renderShapesToSVG,

    snapshotToShapes,
    snapshotJSONToShapes,

    renderSnapshotToImage,
    renderSnapshotToSVG,

    localize,
};