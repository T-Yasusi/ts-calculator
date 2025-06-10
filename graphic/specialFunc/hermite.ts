import { setModal, hslToRGB } from '../modules/util.js'
import { svg } from '../modules/svg.js'

import { add, sub, mul, div, neg, } from '../modules/calc/operators.js'
import { exp, sqrt, pow, factorial } from '../modules/calc/functions.js'
import { hermite } from '../modules/calc/specialFunctions.js'

const { wrapper , modal } = setModal(document.getElementById('modal-wrapper0'));
const svgTop = svg.setTop(document.getElementById('modal0'));
const graph = svgTop.makeGraph(-2, 2, -1, 1);

const N = 10;

for( let i=0; i<N; i++ ){
    graph.drawFunc(x=> exp(-x*x)*hermite(i, x)/sqrt(factorial(i)*pow(2, i)*sqrt(Math.PI))).setAttribute({
        'stroke-width': 2,
        'stroke': hslToRGB(i*360/N, 100, 50)
    });
}
