export default (self, x1, y1, x2, y2)=>{
    const a=(y2-y1)/(x2-x1);
    const b=y1-a*x1;
    let xmin = self._display.width*(x1-self.xmin)/(self.xmax-self.xmin);
    let ymin = self._display.height*(1.0-(y1-self.ymin)/(self.ymax-self.ymin));
    let xmax = self._display.width*(x2-self.xmin)/(self.xmax-self.xmin);
    let ymax = self._display.height*(1.0-(y2-self.ymin)/(self.ymax-self.ymin));
    // if( x1<self.xmin ){
    // 	xmin = self.xmin;
    // 	ymin = self._display.height*(1.0-(y1-(y1-y2)/(x1-x2)*(x1-xmin))/(self.ymax-self.ymin));
    // }
    // if( self.xmax<x2 ){
    // 	xmax = self.xmax;
    // 	ymax = self._display.height*(1.0-(y1-(y1-y2)/(x1-x2)*(x1-xmax))/(self.ymax-self.ymin));
    // }
    
    const line=self._display.makeLine(xmin, ymin, xmax, ymax);

    line.setAttribute({'stroke-width': 2, 'stroke': 'red'});
    self._objects.push(line);
    
    return line;
}
