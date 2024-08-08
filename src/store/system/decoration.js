//  装修
import { defineStore } from 'pinia';

export default defineStore('decoration', {
    state: () => {
        return {
            decorationModuleList: [],
            currentTmp: {
                nanoid: null,
                id: null,
                type: null,
                content: {},
            },
        };
    },
    getters: {},
    actions: {
        setCurrentTmp(data) {
            this.currentTmp = data;
        },
        setDecorationModuleList(data) {
            this.decorationModuleList = data;
        },
    },
});
