import SVGObject from './SVGObject.js'

export default class extends SVGObject{
    get svgX(){ return this._elem.getAttribute('cx'); }
    get svgY(){ return this._elem.getAttribute('cy'); }
    get svgR(){ return this._elem.getAttribute('r'); }

    set svgX(val){ return this._elem.setAttribute('cx', val); }
    set svgY(val){ return this._elem.setAttribute('cy', val); }
    set svgR(val){ return this._elem.setAttribute('r', val); }    
}
