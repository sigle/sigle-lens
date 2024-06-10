import { useAuthenticationStore } from "@/components/Authentication/store";
import { useModal } from "connectkit";
import { useAccount } from "wagmi";

export const useSignInWallet = () => {
  const { isConnected } = useAccount();
  const { setOpen: setConnectkitOpen } = useModal({
    onConnect: (address) => {
      if (!address) return;
      setSelectProfileOpen(true);
    },
    onDisconnect: () => {},
  });
  const setSelectProfileOpen = useAuthenticationStore(
    (state) => state.setSelectProfileOpen,
  );

  const signInWithWallet = async () => {
    if (isConnected) {
      setSelectProfileOpen(true);
      return;
    }
    setConnectkitOpen(true);
  };

  return {
    signInWithWallet,
  };
};
