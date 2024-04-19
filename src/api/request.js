import axios from 'axios'
import router from "@/router/index.js";
import {ElMessage} from "element-plus";

export const responseMessage = (status, msg) =>{
    switch (status){
        case 0:
            ElMessage({
                message: msg,
                type: 'error',
            })
            break
        case 1:
            ElMessage({
                message: msg,
                type: 'success',
            })
            break
        case 2:
            ElMessage({
                message: msg,
                type: 'warning',
            })
            break
        default:
            ElMessage({
                message: msg,
                type: 'info',
            })
    }
}

export const baseURL = 'http://10.205.103.88:8881'

export const service = axios.create({
    baseURL: baseURL,
});

const excludePaths = ['/api/login', '/api/register', '/api/captcha', '/api/mail'];

service.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
        config.headers.token = token;
    }

    if(config.url === '/api/checkToken'){ return config }

    if (!excludePaths.includes(config.url)) {
        return service.post('/api/checkToken')
            .then((res) => {
                // 如果 token 有效，继续发送原始请求
                return config;
            })
            .catch((error) => {
                // 如果 token 无效，跳转到登录页面
                router.push({ name: 'login' });
                console.error('Token 验证失败:', error);
                return Promise.reject(error);
            });
    }

    return config;
}, (error) => {
    // 请求错误的处理
    console.error('请求错误:', error);
    return Promise.reject(error);
});

