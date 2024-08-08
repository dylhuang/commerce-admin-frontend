import { useRoute } from 'vue-router';

export function hasAuthBtn(value) {
    const route = useRoute();
    const metaAuths = route.meta.btns || [];
    return metaAuths.includes(value);
}
