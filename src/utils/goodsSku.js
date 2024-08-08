function composeSkuList(skuData) {
    let skuList = [];
    for (const { list } of skuData) {
        skuList.push(list);
    }
    return skuList;
}

function cartesianProductOf() {
    return Array.prototype.reduce.call(
        arguments,
        function (a, b) {
            const result = [];
            a.forEach(item_a => {
                b.forEach(item_b => {
                    result.push(item_a.concat(item_b));
                });
            });
            return result;
        },
        [[]]
    );
}

export function makeGoodsSku(sku_list, product = false) {
    const skuList = composeSkuList(sku_list);
    const arr = cartesianProductOf(...skuList);
    return arr.map(item => {
        return {
            [product ? 'productSpecItems' : 'goodsSpecItems']: item,
            id: null,
            barCode: '',
            grossWeight: 0,
            netWeight: 0,
            image: '',
            price: 0,
            priceType: 0,
        };
    });
}
