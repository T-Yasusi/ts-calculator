export default (self, x, y, r)=>{
    const circle=self._display.makeEllipse(self._display.x0+self._display.width*(x-self.xmin)/(self.xmax-self.xmin),
					   self._display.y0+self._display.height*(y-self.ymin)/(self.ymax-self.ymin),
					   self._display.width*r/(self.xmax-self.xmin),
					   self._display.height*r/(self.ymax-self.ymin),
					  );
    circle.setAttribute({'fill': 'none', 'stroke': 'red', 'stroke-width': 2});
    
    self._objects.push(circle);
    return circle;
}
