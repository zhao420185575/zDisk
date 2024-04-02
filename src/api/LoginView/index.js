import service from '@/api/request.js'

export const login = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/login', params)
            .then(res =>{
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