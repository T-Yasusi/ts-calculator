const namespaceURI='http://www.w3.org/2000/svg';

const createSVG=tag=>{ return document.createElementNS(namespaceURI, tag) }

export default createSVG;
