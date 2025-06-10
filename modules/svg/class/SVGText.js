import SVGObject from './SVGObject.js'

export default class extends SVGObject{
    set text(content){ this._elem.innerHTML=content; }
    get text(){ this._elem.innerHTML; }
    
    right(){ this._elem.setAttribute('text-anchor', 'start'); return this; }
    center(){ this._elem.setAttribute('text-anchor', 'middle'); return this; }
    left(){ this._elem.setAttribute('text-anchor', 'end');  return this; }
    down(){ this._elem.setAttribute('dominant-baseline', 'hanging'); return this; }
    middle(){ this._elem.setAttribute('dominant-baseline', 'middle'); return this; }
    up(){ this._elem.setAttribute('dominant-baseline', 'ideographic'); return this; }
}
