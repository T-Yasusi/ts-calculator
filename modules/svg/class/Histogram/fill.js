export default (hist, val)=>{
    if( val<hist._bins[0] ) hist._underflow+=1;
    if( hist._bins[hist._bins.length-1]<val ) hist._overflow+=1;

    for( let i=0; i<hist._bins.length-1; i++ ){
	if( hist._bins[i]<=val && val<=hist._bins[i+1] ){
	    hist._values[i]+=1;
	    return;
	}
    }
}
