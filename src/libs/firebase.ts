import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  fetchAndActivate,
  getRemoteConfig as getRC,
  isSupported,
  type RemoteConfig,
} from "firebase/remote-config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm6LKcW_KIzU__h2Ur0mMZq160Gpe1Dac",
  authDomain: "eptic-website.firebaseapp.com",
  projectId: "eptic-website",
  storageBucket: "eptic-website.appspot.com",
  messagingSenderId: "325243281817",
  appId: "1:325243281817:web:a0592703d3c37105513308",
};

let firebaseInstance: FirebaseApp | undefined = undefined;
let remoteConfigInstance: RemoteConfig | undefined = undefined;

const initialize = () => {
  if (import.meta.env.SSR) return undefined;
  if (firebaseInstance) return firebaseInstance;

  firebaseInstance = initializeApp(firebaseConfig);
  return firebaseInstance;
};

const getInstance = () => {
  if (import.meta.env.SSR) return undefined;
  if (!firebaseInstance) initialize();

  return firebaseInstance;
};

const getRemoteConfig = async () => {
  if (import.meta.env.SSR) return undefined;
  if (remoteConfigInstance) return remoteConfigInstance;

  remoteConfigInstance = getRC(getInstance());
  remoteConfigInstance.settings.minimumFetchIntervalMillis = 3_000;

  if (await isSupported()) {
    await fetchAndActivate(remoteConfigInstance!);
  }

  return remoteConfigInstance;
};

export default { initialize, getRemoteConfig };
