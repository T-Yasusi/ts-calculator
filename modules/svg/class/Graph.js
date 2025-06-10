import constructor from './Graph/constructor.js'
import drawLine from './Graph/drawLine.js'
import drawFunc from './Graph/drawFunc.js'
import drawCircle from './Graph/drawCircle.js'

import drawLabelX from './util/drawLabelX.js'
import drawLabelY from './util/drawLabelY.js'

export default class Graph{
    constructor(group, xmin, xmax, ymin, ymax){ constructor(this, group, xmin, xmax, ymin, ymax) };

    get xmax(){ return this._xmax; }
    get xmin(){ return this._xmin; }
    get ymax(){ return this._ymax; }
    get ymin(){ return this._ymin; }
    set xmax(x){ this._xmax=x; }
    set xmin(x){ this._xmin=x; }
    set ymax(y){ this._ymax=y; }
    set ymin(y){ this._ymin=y; }
    
    svgX(x){ return this._display.x0+(this._display.width/(this._xmax-this._xmin))*(x-this._xmin); }
    svgY(y){ return this._display.y0+this._display.height*(1.0-(y-this._ymin)/(this._ymax-this._ymin)); } 
    
    drawLine(x1, y1, x2, y2){ return drawLine(this, x1, y1, x2, y2); }
    drawFunc(func, n=100){ return drawFunc(this, func, n); }
    drawCircle(x, y, r){ return drawCircle(this, x, y, r); }
    
    drawLabelX(N=5){ drawLabelX(this, N); }
    drawLabelY(N=5){ drawLabelY(this, N); }
    drawLabel(){ this.drawLabelX(); this.drawLabelY(); }
}
