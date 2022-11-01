 // Import the functions you need from the SDKs you need
 import firebase from "firebase/compat/app"
 import "firebase/compat/auth"
 import "firebase/compat/firestore"
//  import { getAnalytics } from "firebase/analytics";
 
 
 const firebaseConfig = {
   apiKey: "AIzaSyBfumr3ENPIBT1_0teeVxFyCoBV8UdQKjU",
   authDomain: "storedb-3cdbb.firebaseapp.com",
   projectId: "storedb-3cdbb",
   storageBucket: "storedb-3cdbb.appspot.com",
   messagingSenderId: "858808631142",
   appId: "1:858808631142:web:968623e9ca63d9673412a7",
   measurementId: "G-N1KDB3RT0P"
 };
 
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return('you are offline');
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  // const collectionRef = firestore.collection('users');

  const snapShot = await userRef.get();
  // const collectionSnapshot = await collectionRef.get()
  if (!snapShot.exists){ 
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName, 
        email,
         createdAt, 
         ...additionalData})
    } catch(error){
      console.log('error creating user', error.message)
    }
  }
  return userRef;
};
export const addCollectionAndDocument = async (collectionKey, objectToAdd) => {
  console.log(objectToAdd)
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  if (objectToAdd.length !== 0) {
    objectToAdd.forEach(obj => {
      console.log(obj.categoryId)
      const newDocRef = collectionRef.doc(obj.categoryId)
      //console.log(newDocRef)
      batch.set(newDocRef, obj)
    })
  }

  return await batch.commit()
}
export const postCollectionDocument = async ({tableName, action, objectToAdd}) => {
  const itemRef = firestore.collection(tableName);
  // const sample = await firestore.doc(`/${tableName}/${objectToAdd.categoryId}`).get() 
  // const {items} = sample.data()
  // const used = sample.exists
  // console.log(used)
  if (itemRef){ 
    try{
      if (tableName === "collections"){
        const {categoryId, id, ...otherVals} = objectToAdd
        const docSnapShot =  await itemRef.doc(categoryId).get()
        const docExists = docSnapShot.exists
        if (docExists){
          const docItems = docSnapShot.data().items
          if (action === "POST") docItems.push({...otherVals})
          else if (action === "UPDATE") docItems[`${id}`] = {...otherVals}
          await itemRef.doc(categoryId).update({items: docItems})
        }
        else{
          await itemRef.doc(categoryId).set({items:[{...otherVals}]})
        }

      } else {
        if (action === "POST") await itemRef.doc().set(objectToAdd)
        else if (action === "UPDATE"){
          const {id, ...otherVals} = objectToAdd
          const docSnapShot =  await itemRef.doc(id).get()
          const docExists = docSnapShot.exists
          if (docExists) itemRef.doc(id).update({...otherVals})
          
        }
      }
    } catch(error){
      console.log(`error creating ${objectToAdd.name} in ${tableName}` , error.message)
    }
  }
  return itemRef
}
export const convertCollectionsSnapshotToMap = (collections) => {
  // console.log(collections)
  const transformedCollection = collections.docs.map(doc => {
    // console.log(doc.data())
    const { items } = doc.data();
    Object.keys(items).map(key => items[key]['id'] = key)
    // Object.keys(items).map(key => items[key]['obj_key_id'] = key)  
    // items.map(itm => itm['id'] = doc.id)  

    // here we return what we want as our object content
    return {
      // encodeURI is passed a string & it ll giv back a string where any character e.g certain symbols or spaces 
      // that our url cannot handle, it ll convert them to a version that a user can understand
      // id: `${doc.id}`,
      // categoryName: encodeURI(categoryName.toLowerCase()),
      // categoryUrl,
      categoryId: `${doc.id}`,
      items
    }
  })

  // here we return our the same object but this time with the neccessary key
  // just like in shop_data
    
  // reduce() iterates
  // on first iteration {} is passed into accumulatedObject
  return transformedCollection.reduce(
    (accumulatedObject, collections) => {
      accumulatedObject[collections.categoryId] = collections;
      return accumulatedObject;
    }, {}
  )
}

export const convertCategorySnapshotToMap = (category) => {
  const transformedCategory = category.docs.map(doc => {
    // console.log(doc.id)
    const { name, url, parent, is_active, uniqueId, } = doc.data();
    return {
      id:  `${doc.id}`,
      name: encodeURI(name.toLowerCase()),
      url,
      parent,
      is_active,
      uniqueId,
    }
  })
  return transformedCategory.reduce(
    (accumulatedObject, categories) => {
      accumulatedObject[categories.id] = categories;
      return accumulatedObject;
    }, {}
  )
}
export const convertProductTypeSnapshotToMap = (productType) => {
  const transformedProductType = productType.docs.map(doc => {
    const { name, url, is_active, uniqueId, } = doc.data();
    return {
      id:  `${doc.id}`,
      name: encodeURI(name.toLowerCase()),
      url,
      is_active,
      uniqueId,
    }
  })
  return transformedProductType.reduce(
    (accumulatedObject, productTypes) => {
      accumulatedObject[productTypes.id] = productTypes;
      return accumulatedObject;
    }, {}
  )
}
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unSuscribe = auth.onAuthStateChanged(userAuth => {
      unSuscribe(); 
      resolve(userAuth);
    },
    reject)
  })
}
 // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;










// Object.keys(shop.collections_data).map(cat_key => {
//   shop.collections_data[cat_key]['items'].map(itm => {
//       itm['categoryId'] = cat_key
//       itm['categoryName'] = shop.category_data[cat_key].name
//       itm['categoryUrl'] = shop.category_data[cat_key].url
//       // if (!networkStatus){
//       //     itm['productTypeName'] = shop.product_type_data[itm.brandId].name
//       //     itm['productTypeUrl'] = shop.product_type_data[itm.brandId].url
//       //     shop.collections_data[cat_key]['categoryId'] = cat_key
//       //     itm['id'] = create_id
//       //     create_id ++
//       // } else {
//       //     itm['productTypeName'] = shop.product_type_data[itm.productTypeId].name
//       //     itm['productTypeUrl'] = shop.product_type_data[itm.productTypeId].url
//       // }
//   })
// })