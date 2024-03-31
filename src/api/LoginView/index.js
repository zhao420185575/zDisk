import service from '@/api/request.js'

export const login = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/login', params)
            .then(res =>{
                console.log(res.data.data)
                resolve(true)
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