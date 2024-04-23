import { service, responseMessage } from '@/api/request.js'


export const login = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/login', params, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(res =>{
                if(res.data.code === 200){
                    responseMessage(1, res.data.msg)
                    localStorage.setItem('token', res.data.data.token)
                    resolve(true)
                }
                else if(res.data.code === 404){
                    responseMessage(0, res.data.msg)
                    resolve(false)
                }
            })
            .catch(error =>{
                console.log(error)
                responseMessage(0, error.response.data.msg)
                reject(false)
            })
    })
}

export const register = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/register', params, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(res =>{
                if(res.data.code === 200){
                    responseMessage(1, res.data.msg)
                    resolve(true)
                }
                else if(res.data.code === 404){
                    responseMessage(0, res.data.msg)
                    resolve(true)
                }
                else if(res.data.code === 402){
                    responseMessage(0, res.data.msg)
                    resolve(false)
                }
            })
            .catch(error =>{
                console.log(error)
                responseMessage(0, error.response.data.msg)
                reject(false)
            })
    })
}

export const getCaptchaImg = () =>{
    return new Promise((resolve, reject) =>{
        service.get('/api/captcha', {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
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
        },{
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(res =>{
                resolve(res.data.data.emailID)
            })
            .catch(error =>{
                reject(false)
            })
    })
}
