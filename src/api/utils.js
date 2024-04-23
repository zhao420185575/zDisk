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