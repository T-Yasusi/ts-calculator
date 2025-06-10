export default (self, N)=>{
    self._axisY.clearAll();
    
    const log10=Math.floor(Math.log10(self.ymax-self.ymin));
    const base= Math.pow(10, log10)*0.1;
    const start=Math.ceil(self.ymin/(base))*base;
    const end=Math.floor(self.ymax/(base))*base;
    const dy=(end-start)/N;
    for( let y=start; y<=self.ymax; y+=dy){
        const text=self._axisY.makeText(self._axisY.x0, self.svgY(y), (Math.round(y/base)*base).toFixed(log10<=0 ? Math.abs(log10)+1 : 0));
        text.left().middle();
    }
}
