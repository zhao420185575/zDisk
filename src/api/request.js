import axios from 'axios'
import router from "@/router/index.js";

const service = axios.create({
    baseURL: 'http://10.205.103.88:8881',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 5000
})

service.interceptors.request.use((config) =>{
    let formArr = ['/api/login']

    let token = `Bearer ${localStorage.getItem('token')}`

    token && (config.headers.Authorization = token)

    if(formArr.includes(config.url)){
        config.headers = {
            'Content-Type': 'application/json'
        }
    }
    return config;
})

// service.interceptors.response.use(response => {
//     if(response.data.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
//         let blob = new Blob([response.data], {
//             type: 'application/octet-stream'
//         })
//         response.data = blob
//         return response
//     }
//     if (response.data.status) {
//         // 数据正常，进行的逻辑功能
//         return response
//     }



// }, error => {
//     // 对响应错误做点什么
//     if(error.response.status === 0){
//         router.push( { name : 'login'} )
//     }
//     return Promise.reject(error)
// })

export default service