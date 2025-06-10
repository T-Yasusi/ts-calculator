import createSVG from './createSVG.js'
import SVGGroup from './class/SVGGroup.js'

export default htmlElem=>{
//    console.log(selector);
 //   const parent=document.querySelector(selector);
    while( htmlElem.firstChild ) htmlElem.removeChild(htmlElem.firstChild);
    
    const [ width, height ] = [ htmlElem.clientWidth, htmlElem.clientHeight ];
    const svg=createSVG('svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewbox', `0 0 ${width} ${height}`);
    htmlElem.appendChild(svg);
    const top=new SVGGroup(htmlElem, svg, 0, 0, width, height);
    return top;
}

