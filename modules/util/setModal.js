export default function setModal(wrapper, closeFunc){
//    console.log(closeFunc);
    if( !wrapper ) throw new Error('setModal no Wrapper Element');
    if( wrapper.children.length !== 1 ) throw new Error('setModal Illegal HTMLElements');
    const modal=wrapper.children[0];
    modal.addEventListener('click', (event)=> { event.stopPropagation(); }); 
    
    wrapper.style.display='block';
    wrapper.addEventListener('click', ()=>{	
	wrapper.style.display='none';
	if( typeof closeFunc === 'function' ) closeFunc();
    });
    
    return { modal, wrapper }
}
