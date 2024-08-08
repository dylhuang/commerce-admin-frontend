import { dateType, delayLevels, gameAmountType, gameRewardType, bankNameOptions } from '@/api/common/constant.js';

export function searchType(value) {
    if (!value) {
        return [];
    }
    return gameAmountType.filter(item => {
        return value.includes(item.value);
    });
}

export function searchRewardType(value) {
    if (!value) {
        return [];
    }
    return gameRewardType.filter(item => {
        return value.includes(item.value);
    });
}



export function bankNameSearch(value) {
    if (!value) {
        return [];
    }
    return bankNameOptions.filter(item => {
        return value.includes(item);
    });
}
