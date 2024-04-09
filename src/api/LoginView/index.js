import { service, responseMessage } from '@/api/request.js'
import { ElMessage } from 'element-plus'

export const login = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/login', params)
            .then(res =>{
                if(res.data.code === 200){
                    responseMessage(1, res.data.msg)
                    resolve(true)
                }
                else if(res.data.code === 404){
                    responseMessage(0, res.data.msg)
                    resolve(true)
                }
            })
            .catch(error =>{
                console.log(error)
                reject(false)
            })
    })
}

export const register = (params) =>{
    console.log(params)
    return new Promise((resolve, reject) =>{
        service.post('/api/register', params)
            .then(res =>{
                if(res.data.code === 200){
                    responseMessage(1, res.data.msg)
                    resolve(res)
                }
                else if(res.data.code === 404){
                    responseMessage(0, res.data.msg)
                    resolve(res)
                }

            })
            .catch(error =>{
                console.log(error)
                reject(false)
            })
    })
}

export const getCaptchaImg = () =>{
    return new Promise((resolve, reject) =>{
        service.get('/api/captcha')
            .then(res =>{
                resolve(res.data.data)
            })
            .catch(error =>{

            })
    })
}

export const getEmailCode = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/mail', {
            email: params
        })
            .then(res =>{
                resolve(res.data.data.emailID)
            })
            .catch(error =>{
                reject(false)
            })
    })

}