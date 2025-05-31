import * as Babel from '@babel/standalone';
import operatorOverloadPlugin from '/plugins/operator_overload.js';
import transformStaticImportToDynamic from '/plugins/transform-static-import-to-dynamic.js';

export default function(code, fileName = 'file.ts'){
    return Babel.transform(code, {
        presets: [ 'typescript' ],
        plugins: [ operatorOverloadPlugin,
                   transformStaticImportToDynamic ],
        filename: fileName,
    }).code;
}
