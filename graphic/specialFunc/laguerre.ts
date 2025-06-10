import { setModal, hslToRGB } from '../modules/util.js'
import { svg } from '../modules/svg.js'

import { add, sub, mul, div, neg, } from '../modules/calc/operators.js'
import { sqrt, exp } from '../modules/calc/functions.js'
import { laguerre } from '../modules/calc/specialFunctions.js'

const { wrapper , modal } = setModal(document.getElementById('modal-wrapper0'));
const svgTop = svg.setTop(document.getElementById('modal0'));
const graph = svgTop.makeGraph(0, 5, -1, 1);

const N = 10;

for( let i=0; i<N; i++ ){
    graph.drawFunc(x=> laguerre(i, x)*sqrt(exp(-x))).setAttribute({
        'stroke-width': 2,
        'stroke': hslToRGB(i*360/N, 100, 50)
    });
}
