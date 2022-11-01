const GetPercentageAndPriceDifference = (item) => {
    const calc = ((item.discount_price / item.price) * 100)
    const discount_percent = (100 - calc)
    if (item.discount_price){
        const price_difference = item.price - item.discount_price
        return {discount_percent: discount_percent, price_difference: price_difference}
    }
    return {discount_percent: discount_percent, price_difference: 0}
}
export default GetPercentageAndPriceDifference