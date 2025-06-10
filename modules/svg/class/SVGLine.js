import SVGObject from './SVGObject.js'

export default class extends SVGObject{
    get svgX1(){ return this._elem.getAttribute('x1'); }
    get svgY1(){ return this._elem.getAttribute('y1'); }
    get svgX2(){ return this._elem.getAttribute('x2'); }
    get svgY2(){ return this._elem.getAttribute('y2'); }
    set svgX1(val){ this._elem.setAttribute('x1', val); }
    set svgY1(val){ this._elem.setAttribute('y1', val); }
    set svgX2(val){ this._elem.setAttribute('x2', val); }
    set svgY2(val){ this._elem.setAttribute('y2', val); }
}
