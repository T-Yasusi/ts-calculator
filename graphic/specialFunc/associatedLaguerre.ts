import { setModal, hslToRGB } from '../modules/util.js'
import { svg } from '../modules/svg.js'

import { exp, pow, sqrt, factorial } from '../modules/calc/functions.js'
import { add, sub, mul, div, neg, } from '../modules/calc/operators.js'
import { associatedLaguerre } from '../modules/calc/specialFunctions.js'

const { wrapper , modal } = setModal(document.getElementById('modal-wrapper0'));
const svgTop = svg.setTop(document.getElementById('modal0'));

const L = 6;
const N = L+1;
const graph = svgTop.makeGraph(0, 50, -L*L, L*L);
for( let i=0; i<=L; i++ ){
    let factor = 1;
    for( let j=i+1; j>L; j-- ) factor *= i;
    graph.drawFunc(x=> exp(-x/2)*pow(x, i/2)*associatedLaguerre(i, L, x)/sqrt(factor)).setAttribute({
//    graph.drawFunc(x=> associatedLaguerre(i, L, x)).setAttribute({
        'stroke-width': 2,
        'stroke': hslToRGB(i*360/N, 100, 50)
    });
}
