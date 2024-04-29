import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const fbStorage = getStorage();
const db = getFirestore(app);

const uploadToFirebase = async (uri, name, onProgress) => {
  const storage = getStorage();
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(storage, `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      }
    );
  });
};

// const uploadToFirebase = async (uri, name, onProgress) => {
//   const fetchResponse = await fetch(uri);
//   const theBlob = await fetchResponse.blob();

//   const imageRef = ref(getStorage(), `images/${name}`);

//   const uploadTask = uploadBytesResumable(imageRef, theBlob);

//   return new Promise((resolve, reject) => {
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         onProgress && onProgress(progress);
//       },
//       (error) => {
//         // Handle unsuccessful uploads
//         console.log(error);
//         reject(error);
//       },
//       async () => {
//         const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
//         resolve({
//           downloadUrl,
//           metadata: uploadTask.snapshot.metadata,
//         });
//       }
//     );
//   });
// };

export { app, auth, fbStorage, db, uploadToFirebase };
