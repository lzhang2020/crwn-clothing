import { createSelector } from 'reselect';


const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
};

//const selectShop  = state => state.shop;


//下面的console.log根本就运行不出来！！！？？？ 在redux里不能用console.log??
//哈哈，运行出来了！
const selectShop  = state => {
    console.log("check state:", state);

     return(
    state.shop
    )
}




export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollection = collectionUrlParam =>{
    console.log("check collectionUrlParam:", collectionUrlParam)   //在export中也可以console.log
    return(
    createSelector(
        [selectCollections],
        collections =>
            collections.find(
                collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
            )

    )
    )
 };