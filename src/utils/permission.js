const btns = localStorage.getItem('permission');
export function hasAuthBtn(value) {
    const metaAuths = btns || [];
    return metaAuths.includes(value);
}
