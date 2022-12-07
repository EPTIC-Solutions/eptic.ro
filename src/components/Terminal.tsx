import FirebaseSingleton from "../libs/firebase";
import { getBoolean } from "firebase/remote-config";

FirebaseSingleton.initialize();
const remoteConfig = await FirebaseSingleton.getRemoteConfig();

const Terminal = () => {
  const show = remoteConfig ? getBoolean(remoteConfig, "show_terminal") : false;
  console.log(show);

  if (!show) return <></>;
  return (
    <div className="absolute px-2 text-right text-white -translate-x-1/2 bg-blue-500 top-2 left-1/2 rounded py-0.5">
      <a
        href="https://terminal.eptic.ro/?ref=eptic.ro"
        className="flex items-center justify-center font-mono"
      >
        Check out the new terminal app
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          className="ml-2 h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default Terminal;
