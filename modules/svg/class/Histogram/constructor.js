import SVGGroup from '../SVGGroup.js'
import createSVG from '../../createSVG.js'

export default (self, group, xmin, xmax, N)=>{
    self._group=group;
    
    const [ x0, y0, width, height ] = [ 'x0', 'y0', 'width', 'height' ].map(a=> group[a]);
    self._display=new SVGGroup(group, createSVG('g'), x0+0.1*width, y0+0.1*height, 0.8*width, 0.8*height);
    self._axisX=new SVGGroup(group, createSVG('g'), x0+0.1*width, y0+0.9*height, 0.8*width, 0.1*height);
    self._axisY=new SVGGroup(group, createSVG('g'), x0+0.1*width, y0+0.1*height, 0.1*width, 0.8*height);
    self._frame=self._group.makeRect().setAttribute({
	'x': x0+0.1*width,
	'y': y0+0.1*height,
	'width': 0.8*width,
	'height': 0.8*height
    });

    self._frame.setAttribute({ 'fill': 'none', 'stroke': 'black' });
    self._bins=[];
    const dx=(xmax-xmin)/N
    for( let i=0; i<N; i++ ){ self._bins.push(xmin+i*dx); }
    self._bins.push(xmin+N*dx);
    self._values=new Array(N).fill(0);
//    console.log(self._bins);
    
    self._overflow=0;
    self._underflow=0;
}
