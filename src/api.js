const delay = 100

export default {
    catalog: (args, cb) => {
        setTimeout(() => cb([]), delay)
    }
}
