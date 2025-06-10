import SVGObject from './SVGObject.js'

export default class extends SVGObject{
    get svgWidth(){ return this._elem.getAttribute('width'); }
    get svgHeight(){ return this._elem.getAttribute('height'); }
    get svgX(){ return this._elem.getAttribute('x'); }
    get svgY(){ return this._elem.getAttribute('y'); }
    set svgWidth(val){ this._elem.setAttribute('width', val); }
    set svgHeight(val){ this._elem.setAttribute('height', val); }
    set svgX(val){ this._elem.setAttribute('x', val); }
    set svgY(val){ this._elem.setAttribute('y', val); }
}
