import { parseVec3 } from 'utils';

export default data => new THREE.CatmullRomCurve3( parseVec3( data ) );