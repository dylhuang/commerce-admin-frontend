//  装修
import { defineStore } from 'pinia';

export default defineStore('decoration', {
    state: () => {
        return {
            selectCodeTypeRow: {}
        };
    },
    getters: {},
    actions: {
        setSelectRow(data) {
            this.selectCodeTypeRow = data;
        },
    },
});
