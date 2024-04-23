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
                if(resa.data.code === 200){
                    resolve(res.data.data)
                }
            })
            .catch(error =>{
                console.log(error)
                responseMessage(0, error.response.data.msg)
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

export const downloadFile = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/api/file/FileDownload', { fileArr: params }, {
            responseType: 'blob'
        })
            .then(res => {
                // 创建一个 <a> 元素
                const header = res.headers.get('Content-Disposition')
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(res.data)
                const filenameWithEncoding = header.match(/filename="([^"]+)"/)[1]; // 使用正则表达式匹配文件名部分
                const filename = decodeURIComponent(filenameWithEncoding); // 解码文件名// 解码文件名

                link.download = filename // 设置下载文件的文件名
                link.style.display = 'none'

                // 将 <a> 元素添加到文档中
                document.body.appendChild(link)

                // 触发点击事件，开始下载文件
                link.click()

                // 下载完成后移除 <a> 元素
                document.body.removeChild(link)

                resolve(true)
            })
            .catch(error => {
                console.error('下载文件失败：', error)
                reject(false)
            })
    })
}


export const mergeFile = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/file/judgmentmerge', params, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                resolve(true)
            })
            .catch(error =>{
                console.log(error)
                reject(false)
            })
    })
}

export const createFolder = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/file/createnewfolder', params, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                resolve(true)
            })
            .catch(error =>{
                console.log(error)
                reject(false)
            })
    })
}



export const getShareFile = (params) =>{
    let pwd = ''
    if(params.pwd){
        pwd = `?pwd=${params.pwd}`
    }
    return new Promise((resolve, reject) =>{
        service.get(`/Share/${params.secret}${pwd}`)
            .then(res => {
                resolve(res.data.data)
            })
            .catch(error =>{
                console.log(error)
                reject(false)
            })
    })
}

export const deleteFile = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/file/deletefile', params,{
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                resolve(true)
            })
            .catch(error =>{
                console.log(error)
                reject(false)
            })
    })
}

export const reFileName = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/file/FileRenaming', params,{
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                resolve(true)
            })
            .catch(error =>{
                console.log(error)
                reject(false)
            })
    })
}

export const getShareKey = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/file/filesharing', params,{
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                resolve(res.data.data)
            })
            .catch(error =>{
                console.log(error)
                reject(false)
            })
    })
}

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        service.get('/api/PersonalCenter')
            .then(res => {
                resolve(res.data.data)
            })
            .catch(error => {
                console.log(error)
                reject(false)
            })
    })
}

export const updateUsername = (params) => {
    return new Promise((resolve, reject) => {
        service.post('/api/ChangeName', {
            newName: params
        }, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                if(res.data.code === 200){
                    resolve(true)
                }
            })
            .catch(error => {
                console.log(error)
                reject(false)
            })
    })
}

export const getEmailVerificationCode = (params) =>{
    return new Promise((resolve, reject) =>{
        service.post('/api/EmailVerificationCode', {
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
                console.log(error)
                reject(false)
            })
    })
}

export const updateUserPassword = ({ emailId, emailCode, newPassword }) => {
    return new Promise((resolve, reject) => {
        service.post('/api/ChangePassword', {
            emailId, emailCode, newPassword
        }, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            }
        })
            .then(res => {
                if(res.data.code === 200) {
                    responseMessage(1, res.data.data)
                }
                resolve(true)
            })
            .catch(error => {
                console.log('错误')
                reject(false)
            })
    })
}