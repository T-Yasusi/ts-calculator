import { setModal, hslToRGB } from '../modules/util.js'
import { svg } from '../modules/svg.js'

import { add, sub, mul, div, neg, } from '../modules/calc/operators.js'
import { legendre } from '../modules/calc/specialFunctions.js'

const { wrapper , modal } = setModal(document.getElementById('modal-wrapper0'));
const svgTop = svg.setTop(document.getElementById('modal0'));
const graph = svgTop.makeGraph(-1, 1, -1, 1);

const N = 10;

for( let i=0; i<N; i++ ){
    graph.drawFunc(x=> legendre(i, x)).setAttribute({
        'stroke-width': 2,
        'stroke': hslToRGB(i*360/N, 100, 50)
    });
}
