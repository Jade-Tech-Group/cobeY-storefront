import type { Customer, User } from "~/types";
import type { Login } from "~/types";
import conf from "~/conf/useConf";
export const useAuth = () => {
  const user = useCookie<User | null>("user");
  const accessToken = useCookie<string | null>("accessToken");
  const isPending = useState<boolean>("isPending", () => false);
  // const { refreshCart } = useCart();
  const { clearAllCookies } = useHelpers();
  const { t } = useI18n();
  const router = useRouter();
  
  const loginUser = async (
    credentials: Login
  ): Promise<{ success: boolean; error: any } | undefined> => {
    isPending.value = true;
    try {
      const response: Customer | null = await $fetch(`${conf.api.baseUrl}${conf.api.services.auth.login}`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
      updateCustomer(response);
      // await refreshCart();
      return {
        success: true,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        error: t("messages.error.invalidUsernameAndPassword"),
      };
    } finally {
      isPending.value = false;
    }
  };

  // Log out the user
  const logoutUser = async (): Promise<{ success: boolean; error: any }> => {
    isPending.value = true;
    try {
      // await refreshCart();
      clearAllCookies();
      isPending.value = false;
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error };
    } finally {
      updateViewer(null);
      if (
        router.currentRoute.value.path === "/my-account" &&
        user.value === null
      ) {
        router.push("/my-account");
      } else {
        router.push("/");
      }
    }
  };

  // Register the user
  const registerUser = async (
    userInfo: User
  ): Promise<{ success: boolean; error: any }> => {
    isPending.value = true;
    try {
      await $fetch(
        `${conf.api.baseUrl}${conf.api.services.auth.register}`,
        {
          method: "POST",
          body: JSON.stringify(userInfo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      isPending.value = false;
      return { success: true, error: null };
    } catch (error: any) {
      isPending.value = false;
      return { success: false, error: t("messages.error.notRegistered") };
    }
  };
  // Update the user state
  const updateCustomer = (payload: Customer | null) => {
    user.value = payload;
    accessToken.value = payload?.accessToken ?? null;
    isPending.value = false;
  };

  const updateViewer = (payload: any): void => {

  };
  const sendResetPasswordEmail = async () => { };

  const resetPasswordWithKey = async ({
    key,
    login,
    password,
  }: {
    key: string;
    login: string;
    password: string;
  }) => { };

  const getDownloads = async () => { };

  return {
    user,
    accessToken,
    isPending,
    loginUser,
    updateCustomer,
    updateViewer,
    logoutUser,
    registerUser,
    sendResetPasswordEmail,
    resetPasswordWithKey,
    getDownloads,
  };
};
