import * as API from './index';
export default {
    getTestData(){
        return API.GET('/bigdata/bigscreen/water/count');
    }
}