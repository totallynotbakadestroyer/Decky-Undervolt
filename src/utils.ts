export function debounce(func: Function, ms: number) {
    let timeout: NodeJS.Timeout;
    return function() {
        clearTimeout(timeout);
        // @ts-ignore
        timeout = setTimeout(() => func.apply(this, arguments), ms);
    };
}