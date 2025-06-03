import { Diff } from './interface/Diff.js';

import forward from './diff/forward.js';
import central from './diff/central.js';
import backward from './diff/backward.js';

const diff: Diff = { forward, central, backward };
export default diff;