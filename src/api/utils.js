import { ElLoading } from 'element-plus'

var loadingInstance

export const startLoading = () =>{
    loadingInstance = ElLoading.service({
        text: '加载中',
        background: 'rgba(0, 0, 0, 0)',
    })
}

export const stopLoading = () =>{
    loadingInstance.close()
    loadingInstance = null
}

export const debounce = (fn, delay = 200) => {
    let timer = null
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, delay)
    }
}

export const throttle = (fn, delay) => {
    let timer
    return function(...args){
        let context = this
        if(timer) return;
        timer = setTimeout(function(){
            timer = null;
            fn.apply(context, args)
        }, delay);
    }
}

