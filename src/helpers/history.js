import { createHistory, createHashHistory } from 'history';

export default (__DEV__) ? createHistory() : createHashHistory();