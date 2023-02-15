/**
 * Created by lizhiyuan on 2019/11/4.
 */
import axios from "axios";
import { ElMessage } from 'element-plus'
import qs from 'qs';
import * as util from '../util/util';
const messageType={
    'INFO':'info',
    'WARN':'warn',
    'ERROR':'error'
}
//请求拦截器
axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
// 响应拦截器
axios.interceptors.response.use(
    (res) => {
        if (res.data.statusCode === 0) {
            if (res.data.message !== "成功") {
                ElMessage.success(res.data.message);
            }
            return Promise.resolve(res);
        } else {
            const msgType = messageType[res.data.msgType];
            ElMessage[msgType](res.data.message);
            return Promise.reject(res);
        }
    },
    (error) => {
        if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            ElMessage.error(error.response.data.message);
        }
        if (error.response && error.response.status === 401) {
        }
        return Promise.reject(error);
    }
);
//基地址
let base = util.baseUrl;
//通用方法
export const POST = (url, params = {}) => {
    return axios
        .post(`${base}${url}`, params, {
            transformRequest: [
                function (data) {
                    let formData = new URLSearchParams();
                    Object.keys(data).forEach((key) =>
                        formData.append(key, data[key])
                    );
                    return formData;
                },
            ],
        })
        .then((res) => res.data);
};
export const POST_DOWN = (url, params = {}) => {
    return axios
        .post(`${base}${url}`, params, {
            transformRequest: [
                function (data) {
                    let formData = new URLSearchParams();
                    Object.keys(data).forEach((key) =>
                        formData.append(key, data[key])
                    );
                    return formData;
                },
            ],
            responseType: "arraybuffer",
        })
        .then((res) => res.data);
};
export const POST_JSON = (url, params = {}) => {
    return axios.post(`${base}${url}`, params).then((res) => res.data);
};
export const GET = (url, params = {}) => {
    return axios
        .get(`${base}${url}`, {
            params: params,
            paramsSerializer:{
                serialize:function (params){
                    return qs.stringify(params, { indices: false });
                }
            }
        })
        .then((res) => (res ? res.data : res));
};

export const GET_DOWN = (url, params = {}) => {
    return axios
        .get(`${base}${url}`, {
            params: params,
            paramsSerializer:{
                serialize:function (params){
                    return qs.stringify(params, { indices: false });
                }
            },
            responseType: "blob",
        })
        .then((res) => (res ? res.data : res));
};
export const PUT = (url, params={}) => {
    return axios.put(`${base}${url}`, params, {
        transformRequest: [function (data) {
            let formData = new URLSearchParams();
            Object.keys(data).forEach(key => formData.append(key, data[key]));
            return formData;
        }]
    }).then(res => res.data)
};

export const PUT_JSON = (url, params={}) => {
    return axios.put(`${base}${url}`, params).then(res => res.data)
};

export const DELETE = (url, params={}) => {
    return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
};

export const PATCH = (url, params={}) => {
    return axios.patch(`${base}${url}`, params).then(res => res.data)
};
