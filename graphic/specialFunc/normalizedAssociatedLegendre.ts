import { setModal, hslToRGB } from '../modules/util.js'
import { svg } from '../modules/svg.js'

import { pow } from '../modules/calc/functions.js'
import { add, sub, mul, div, neg, } from '../modules/calc/operators.js'
import { normalizedAssociatedLegendre } from '../modules/calc/specialFunctions.js'

const { wrapper , modal } = setModal(document.getElementById('modal-wrapper0'));
const svgTop = svg.setTop(document.getElementById('modal0'));

const L = 6;
const N = 2*L+1;
const graph = svgTop.makeGraph(-1, 1, -pow(L, 1/4), pow(L, 1/4));
for( let i=-L; i<=L; i++ ){
    graph.drawFunc(x=> normalizedAssociatedLegendre(i, L, x)).setAttribute({
        'stroke-width': 2,
        'stroke': hslToRGB(i*360/N, 100, 50)
    });
}
