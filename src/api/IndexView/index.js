import { service, responseMessage } from '@/api/request.js'

export const getFileArr = (params) =>{
    return new Promise((resolve, reject) =>{
        service.get(`/api/file/visitFile?currentPath=${params}`)
            .then(res =>{
                if(res.data.code === 200){
                    resolve(res.data.data)
                }
            })
            .catch(error =>{
                console.log(error)
                reject(false)
            })
    })
}

export const uploadFile = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post(`/api/file/uploadfile`, params)
            .then(res => {
                console.log(res)
            })
            .catch(error =>{
                console.log(error)
                reject(false)
            })
    })
}

export const verifySharding = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/file/verifySharding', params)
            .then(res => {
                resolve(res.data)
            })
            .catch(error =>{
            console.log(error)
            reject(false)
        })
    })
}