export default (self, func, n)=>{
//    console.log(self._xmin, self._xmax);
    const x_points=[], y_points=[];
    const dx=(self._xmax-self._xmin)/n;
    for( let i=0; i<=n; i++ ){
        x_points.push(self._xmin+i*dx);
        y_points.push(func(self._xmin+i*dx));	
    }

    const scaleX=1.0/(self._xmax-self._xmin);
    const scaleY=1.0/(self._ymax-self._ymin);
    for( let i=0; i<x_points.length; i++ ){
	x_points[i]=scaleX*(x_points[i]-self._xmin);
        y_points[i]=scaleY*(y_points[i]-self._ymin);
    }
    const path=self._display.makePath(x_points, y_points);
    self.drawLabelX();
    self.drawLabelY();

    self._objects.push(path);
    return path;
}
