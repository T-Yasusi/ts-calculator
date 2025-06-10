export default self=>{
    console.log('Entries :', self.entries);
    console.log('underflow =', self._underflow);
    for( let i=0; i<self._values.length; i++ ){
        console.log('i =', i, ' x =', 0.5*(self._bins[i]+self._bins[i+1]), ' y =', self._values[i]);
    }
    console.log('overflow =', self._overflow);
}

