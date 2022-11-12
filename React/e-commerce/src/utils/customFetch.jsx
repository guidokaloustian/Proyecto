let isOk = true;

export const customFetch = (time, task) => {
    return new Promise ((res, rej) => {
        setTimeout(() => {
            if(isOk) {
                res(task)
            } else {
                rej('No se pudo cargar.')
            }
        }, time)
    })
}