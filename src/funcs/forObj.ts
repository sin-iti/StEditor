export function objForEach(obj: Object, fn: Function): void {//4360
    let key = void 0;//void 0 == undefined
    let result = void 0;
    for(key in obj) {
        if (obj.hasOwnProperty(key)) {
            result = fn.call(obj, key, obj[key]);
            if (result === false) {
                break;
            }
        }
    }
}
