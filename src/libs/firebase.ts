import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  fetchAndActivate,
  getRemoteConfig as getRC,
  isSupported,
  type RemoteConfig,
} from "firebase/remote-config";
import {
  type Analytics,
  initializeAnalytics,
  setAnalyticsCollectionEnabled,
} from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm6LKcW_KIzU__h2Ur0mMZq160Gpe1Dac",
  authDomain: "eptic-website.firebaseapp.com",
  projectId: "eptic-website",
  storageBucket: "eptic-website.appspot.com",
  messagingSenderId: "325243281817",
  appId: "1:325243281817:web:a0592703d3c37105513308",
  measurementId: "G-9DWW2S7WD0",
};

let remoteConfig: RemoteConfig | undefined = undefined;
let analytics: Analytics | undefined = undefined;

const initialize = () => {
  if (import.meta.env.SSR) return undefined;

  const firebase = initializeApp(firebaseConfig);
  if (!analytics) {
    analytics = initializeAnalytics(firebase);
    setAnalyticsCollectionEnabled(analytics, true);
  }

  return firebase;
};

let firebase: FirebaseApp | undefined = initialize();

const getInstance = () => {
  if (import.meta.env.SSR) return undefined;
  if (!firebase) initialize();

  return firebase;
};

const getRemoteConfig = async () => {
  if (import.meta.env.SSR) return undefined;
  if (remoteConfig) return remoteConfig;

  remoteConfig = getRC(getInstance());

  remoteConfig.settings.minimumFetchIntervalMillis = 3_000;

  if (await isSupported()) {
    await fetchAndActivate(remoteConfig!);
  }

  return remoteConfig;
};

export default { firebase, getRemoteConfig, analytics };
