import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase,
    signInWithEmailAndPassword,
    signOut,
     onAuthStateChanged    } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDcCHWhJ7ghu6JRzP75-rOQvJYyK5vFmko",
    authDomain: "crwn-clothing-app-3b902.firebaseapp.com",
    projectId: "crwn-clothing-app-3b902",
    storageBucket: "crwn-clothing-app-3b902.appspot.com",
    messagingSenderId: "775519860090",
    appId: "1:775519860090:web:e4def07234c534ceeed2c3",
    measurementId: "G-K8LQSXVWNM"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);
export const db = getFirestore();
export const addCollectionAndDocument= async (collectionKey, objectsToAdd) => {
    const collectionRef= collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object)=>{
        const docRef=doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log("done")
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef= collection(db,'categories');
    const q= query(collectionRef)
    const querySnapshot = await getDocs(q);
    const categoryMap=querySnapshot.docs.reduce((acc, docSnapshot)=> {
        const {title, items}=docSnapshot.data();
        acc[title.toLowerCase()]=items;
        return acc;
    }, {});
    return categoryMap
}
export const createUserDocumentfromAuth = async (
    userAuth,
    additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }
        catch (error) {
            console.log(error.message, 'eroare')
        }
    }
    return userDocRef;
}

export const createUserWithEmailAndPassword = async (email, password) => {
    if (!password || !email) return;
    return await createUserWithEmailAndPasswordFirebase(auth, email, password);
}
export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!password || !email) return;
    return await signInWithEmailAndPassword(auth, email, password);
}
export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => 
        {onAuthStateChanged(auth, callback)}