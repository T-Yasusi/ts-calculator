export default (self, N)=>{
    self._axisX.clearAll();
    
    const log10=Math.floor(Math.log10(self.xmax-self.xmin));
    const base =Math.pow(10, log10)*0.1;
    const start=Math.ceil(self.xmin/(base))*base;
    const end=Math.floor(self.xmax/(base))*base;
    const dx=(end-start)/N;
    for( let x=start; x<=self.xmax; x+=dx){
        const text=self._axisX.makeText(self.svgX(x), self._axisX.y0, (Math.round(x/base)*base).toFixed(log10<=0 ? Math.abs(log10)+1 : 0));
        text.center().down();
    }
}
