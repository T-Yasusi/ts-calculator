import createSVG from '../createSVG.js'
import SVGGroup from './SVGGroup.js'

import constructor from './Histogram/constructor.js'
import fill from './Histogram/fill.js'
import consoleOut from './Histogram/consoleOut.js'
import drawLabelX from './util/drawLabelX.js'
import drawLabelY from './util/drawLabelY.js'


export default class Histogram{
    constructor(group, xmin, xmax, N){ constructor(this, group, xmin, xmax, N); }

    get xmin(){ return this._bins[0]; }
    get xmax(){ return this._bins[this._values.length]; }
    get ymin(){ return 0; }
    get ymax(){ const a=Math.max(...this._values); return 1.1*(a+Math.sqrt(a)); }
    svgX(x){ return this._display.x0+(this._display.width/(this.xmax-this.xmin))*(x-this.xmin); }
    svgY(y){ return this._display.y0+this._display.height*(1.0-(y-this.ymin)/(this.ymax-this.ymin)); }

    get array_y(){ return this._values; }
    get array_x(){
	const result=[];
	for( let i=0; i<this._values.length; i++ ) result.push(0.5*(this._bins[i]+this._bins[i+1]));
	return result;
    }
    
    drawLabelX(N=5){ drawLabelX(this, N) }
    drawLabelY(N=5){ drawLabelY(this, N) }

    get entries(){ return this._overflow+this._underflow+this._values.reduce((sum, a)=> sum+a); }
    fill(val){ fill(this, val); }
    consoleOut(){ consoleOut(this); }

    drawFunc(func, n=1000){
	const scaleX=1.0/(this._bins[this._values.length]-this._bins[0]);
	const dx=(this._bins[this._values.length]-this._bins[0])/n;
	const x_points=[], y_points=[];
	for( let x=this._bins[0]; x<this._bins[this._values.length]; x+=dx ){
	    x_points.push(scaleX*(x-this._bins[0]));
	    y_points.push(func(x)/this.ymax);
	}
	const path=this._display.makePath(x_points, y_points);
	return path;
    }
    
    draw(attr={ fill: 'none', strokeWidth: 1.5, stroke: 'black' }){
//	this.consoleOut();
	this._display.clearAll();

	for( let i=0; i<this._values.length; i++ ){
	    const rect=this._display.makeRect((this._bins[i]-this._bins[0])/(this._bins[this._values.length]-this._bins[0]), 1.0-this._values[i]/this.ymax,
					      (this._bins[i+1]-this._bins[0])/(this._bins[this._values.length]-this._bins[0]), 1.0);
	    rect.setAttribute(attr);
	}
	this.drawLabelX();
	this.drawLabelY();
    }

    draw_wErrBar(attr={ fill: 'none', strokeWidth: 1.5, stroke: 'black' }){
	this.draw();
	for( let i=0; i<this._values.length; i++ ){
	    const x=this._display.width*0.5*(this._bins[i]+this._bins[i+1]-2*this._bins[0])/(this._bins[this._values.length]-this._bins[0]);
	    const y=this._values[i];
	    const err=Math.sqrt(this._values[i]);
	    const line=this._display.makeLine(x, this._display.height*(1.0-(y+err)/(this.ymax)), x, this._display.height*(1.0-(y-err)/(this.ymax)));
	    line.setAttribute(attr);
	}
    }
}
