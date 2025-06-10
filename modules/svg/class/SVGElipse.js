import SVGObject from './SVGObject.js'

export default class extends SVGObject{
    get svgX(){ return this._elem.getAttribute('cx'); }
    get svgY(){ return this._elem.getAttribute('cy'); }
    get svgRX(){ return this._elem.getAttribute('rx'); }
    get svgRY(){ return this._elem.getAttribute('ry'); }

    set svgX(val){ return this._elem.setAttribute('cx', val); }
    set svgY(val){ return this._elem.setAttribute('cy', val); }
    set svgRX(val){ return this._elem.setAttribute('rx', val); }
    set svgRY(val){ return this._elem.setAttribute('ry', val); }    
}
