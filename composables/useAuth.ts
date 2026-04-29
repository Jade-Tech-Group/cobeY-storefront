import type { Customer, Profile, User } from "~/types";
import type { Login } from "~/types";
import conf from "~/conf/useConf";
export const useAuth = () => {
  const user = useCookie<User | null>("user");
  const accessToken = useCookie<string | null>("accessToken");
  const returnUrl = useCookie<string>("returnUrl");
  const isPending = useState<boolean>("isPending", () => false);
  const unlogging = useState<boolean>("isPending", () => false);
  const { refreshCart } = useCart();
  const { clearAllCookies } = useHelpers();
  const router = useRouter();

  const { t } = useI18n();

  const loginUser = async (
    credentials: Login
  ): Promise<{ success: boolean; error: any } | undefined> => {
    isPending.value = true;
    try {
      const response = await $fetch<any>(
        `${conf.api.baseUrl}${conf.api.services.auth.login}`,
        {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        }
      );
      await updateCustomer(response);
      refreshCart();
      router.push(returnUrl.value ?? "/my-account");
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
    try {
      // Notify API to clear refresh cookie too
      await $fetch(`${conf.api.baseUrl}/auth/logout`, { method: 'POST', credentials: 'include' });
      clearAllCookies();
      returnUrl.value = "/";
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error };
    } finally {
      refreshCart();
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
      await $fetch(`${conf.api.baseUrl}${conf.api.services.auth.register}`, {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      isPending.value = false;
      return { success: true, error: null };
    } catch (error: any) {
      isPending.value = false;
      return { success: false, error: "already registered" };
    }
  };
  // Update the user state
  const updateCustomer = async (payload: Customer | null) => {
    user.value = payload;
    accessToken.value = payload?.accessToken ?? null;
    isPending.value = false;
  };

  const sendResetPasswordEmail = async (
    email: string
  ): Promise<{ success: boolean; error: any }> => {
    try {
      isPending.value = true;
      await $fetch(
        `${conf.api.baseUrl}/${conf.api.services.auth.recoveryPass}?email=${email}&url=${window.location.origin}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      isPending.value = false;
    }
  };

  const resetPasswordWithKey = async ({
    key,
    login,
    password,
  }: {
    key: string;
    login: string;
    password: string;
  }) => {};

  return {
    user,
    accessToken,
    isPending,
    returnUrl,
    loginUser,
    updateCustomer,
    logoutUser,
    unlogging,
    registerUser,
    sendResetPasswordEmail,
    resetPasswordWithKey,
  };
};
