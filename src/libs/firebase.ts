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
  apiKey: "AIzaSyANjkzMrj17herOoL5w-5fddIBQO2s_6GY",
  authDomain: "eptic-ro.firebaseapp.com",
  projectId: "eptic-ro",
  storageBucket: "eptic-ro.appspot.com",
  messagingSenderId: "516973874019",
  appId: "1:516973874019:web:f931118fd2b7f12295e156",
  measurementId: "G-QR933WDX98"
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
