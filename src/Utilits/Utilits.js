export function convertArrayToSelectOptions(arr) {
    let newArr = [];
    arr.forEach(el=> newArr.push({
            value: el.id,
            label: el.name
        }));
    return newArr;
}

export function correctPrice(price) {
    return Math.trunc(price * 100) / 100;
}


export function filterArr(filteringArray, arr){
    let newArr = arr;
    filteringArray.forEach(el=> newArr.forEach((e,i)=> {
        if(el.id === e.customer_id){
            newArr[i].customerName = el.name;
        }
    }));
    return newArr;
}

export function filterProductsArr(productArr, productsInvoice){
    let newArr = productsInvoice;
    productArr.forEach(el=> newArr.forEach((e, i)=> {
        if(el.id === e.product_id){
            newArr[i].price = el.price;
            newArr[i].name = el.name;
        }
    }));
    return newArr;
}
