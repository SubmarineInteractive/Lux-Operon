import { common, homeBackground, experience } from './webgl';
import messages from './messages';

const homeBackgroundMerged = Object.assign({}, common, homeBackground );
const experienceMerged = Object.assign({}, common, experience );

export default { common, homeBackground: homeBackgroundMerged, experience: experienceMerged, messages };
