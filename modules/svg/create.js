import createSVG from './createSVG.js'
import SVGRect from './class/SVGRect.js'
import SVGPath from './class/SVGPath.js'
import SVGLine from './class/SVGLine.js'
import SVGText from './class/SVGText.js'
import SVGEllipse from './class/SVGElipse.js'

export default {
    rect: (parent, x0, y0, x1, y1)=>{
	const rect=createSVG('rect');
//        console.log(parent.x0+parent.width*x0, parent.y0+parent.height*y0, parent.width*(x1-x0), parent.height*(y1-y0));
	const obj=new SVGRect(parent, rect);
	obj.setAttribute({'x': parent.x0+parent.width*x0,
			  'y': parent.y0+parent.height*y0,
			  'width': Math.abs(parent.width*(x1-x0)),
			  'height': Math.abs(parent.height*(y1-y0)) });
        return obj;
    },
    text: (parent, x, y, content)=>{
	const text=createSVG('text');
	const obj=new SVGText(parent, text);
	obj.setAttribute({'x': x, 'y': y });
	obj.text=content;
	return obj;
    },
    path: (parent, x_points, y_points)=>{
	const path=createSVG('path');
	let attrBody='M ';
	for( let i=0; i<x_points.length; i++ ){
//	    console.log(x_points[i], y_points[i]);
	    if( !Number.isFinite(x_points[i]) || !Number.isFinite(y_points[i]) ) continue;
	    attrBody+=(parent.x0+parent.width*x_points[i])+','+(parent.y0+parent.height*(1.0-y_points[i]))+' ';
	}
	const obj=new SVGPath(parent, path);
//	console.log(attrBody);
	obj.setAttribute({ 'fill': 'none',
			   'stroke-width': 1,
			   'stroke': 'black',
			   'd': attrBody });
	return obj;
    },
    line: (parent, x1, y1, x2, y2)=>{
	const line=createSVG('line');
	const obj=new SVGLine(parent, line);
	obj.setAttribute({ 'x1': parent.x0+x1,
			   'y1': parent.y0+y1,
			   'x2': parent.x0+x2,
			   'y2': parent.y0+y2 });
	return obj;
    },
    circle: (parent, x, y, r)=>{
	const circle=createSVG('circle');
	const obj=new SVGCircle(parent, circle);
	obj.setAttribute({ 'cx': x,
			   'cy': y,
			   'r': r });
	return obj;
    },
    ellipse: (parent, x, y, rx, ry)=>{
	const eclipse=createSVG('ellipse');
	const obj=new SVGEllipse(parent, eclipse);
	obj.setAttribute({ 'cx': x, 'cy':y, 'rx': rx, 'ry': ry });

	return obj;
    }
}
