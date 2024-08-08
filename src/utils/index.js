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

export function searchDelayLevels(value) {
    console.log(value, 9999);
    if (null === value) {
        return [];
    }
    if (value === 0) {
        return delayLevels.filter(item => {
            return 1 <= item.value && item.value <= 4;
        });
    }
    if (value === 1) {
        return delayLevels.filter(item => {
            return 4 < item.value && item.value <= 16;
        });
    }
    if (value === 2) {
        return delayLevels.filter(item => {
            return 16 < item.value && item.value <= 33;
        });
    }
    return [];
}

export function bankNameSearch(value) {
    if (!value) {
        return [];
    }
    return bankNameOptions.filter(item => {
        return value.includes(item);
    });
}
