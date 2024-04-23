export const debounce = (fn, delay = 200) => {
    let timer = null
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, delay)
    }
}