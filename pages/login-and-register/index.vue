<template>
  <div class="container min-h-[600px]">
    <div class="max-w-lg mx-auto my-16 min-h-[600px] lg:my-24">
      <div class="flex flex-col items-center">
        <Logo class="mb-6 scale-125" />
        <h1 class="text-xl font-semibold lg:text-3xl">{{ formTitle }}</h1>
        <div v-if="formView === 'login'" class="my-2 text-center">
          {{ $t("messages.account.noAccount") }}
          <a
            class="font-semibold cursor-pointer text-primary"
            @click="navigate('register')"
          >
            {{ $t("messages.account.accountRegister") }} </a
          >.
        </div>
        <div v-if="formView === 'register'" class="my-2 text-center">
          {{ $t("messages.account.hasAccount") }}
          <a
            class="font-semibold cursor-pointer text-primary"
            @click="navigate('login')"
          >
            {{ $t("messages.general.please") }}
            {{ $t("messages.account.accountLogin") }}
          </a>
          .
        </div>
      </div>

      <form
        class="mt-6"
        @submit.prevent="handleFormSubmit(userInfo)"
        id="login-form"
      >
        <div class="w-full flex flex-row gap-4" v-if="formView === 'register'">
          <label for="name" class="w-full">
            {{ nameLabel }}
            <span class="text-red-500">*</span> <br />
            <input
              id="name"
              v-model="userInfo.name"
              :placeholder="inputPlaceholder.name"
              autocomplete="name"
              type="text"
              required
            />
          </label>
          <label for="last_name" class="w-full">
            {{ lastNameLabel }}
            <span class="text-red-500">*</span> <br />
            <input
              id="last_name"
              v-model="userInfo.last_name"
              :placeholder="inputPlaceholder.last_name"
              autocomplete="last_name"
              type="text"
              required
            />
          </label>
        </div>
        <p
          v-if="formView === 'forgotPassword'"
          class="text-sm text-gray-500 my-4"
        >
          {{ $t("messages.account.enterEmailOrUsernameForReset") }}
        </p>
        <label for="email">
          {{ usernameLabel }}
          <span class="text-red-500">*</span> <br />
          <input
            id="email"
            v-model="userInfo.email"
            :placeholder="inputPlaceholder.username"
            autocomplete="email"
            type="text"
            required
          />
        </label>
        <div class="w-full flex flex-row gap-4">
          <label
            for="password"
            v-if="formView !== 'forgotPassword'"
            class="w-full"
          >
            {{ passwordLabel }} <span class="text-red-500">*</span> <br />
            <PasswordInput
              id="password"
              className="border rounded-lg w-full p-3 px-4 bg-white"
              v-model="userInfo.password"
              :placeholder="inputPlaceholder.password"
              :autocomplete="
                formView === 'login' ? 'current-password' : 'new-password'
              "
              :required="true"
            />
          </label>
          <label
            for="passwordConfirm"
            v-if="formView === 'register'"
            class="w-full"
          >
            {{ passwordConfirmLabel }} <span class="text-red-500">*</span>
            <br />
            <PasswordInput
              id="password"
              className="border rounded-lg w-full p-3 px-4 bg-white"
              v-model="userInfo.passwordConfirm"
              :placeholder="inputPlaceholder.passwordConfirm"
              autocomplete="current-password"
              :required="true"
            />
          </label>
        </div>
        <Transition name="scale-y" mode="out-in">
          <div
            v-if="message"
            class="my-4 text-sm text-green-500"
            v-html="message"
          ></div>
        </Transition>
        <Transition name="scale-y" mode="out-in">
          <div
            v-if="errorMessage"
            class="my-4 text-sm text-red-500"
            v-html="errorMessage"
          ></div>
        </Transition>
        <button class="flex items-center justify-center gap-4 mt-4 text-lg">
          <LoadingIcon v-if="isPending" stroke="4" size="16" color="#fff" />
          <span>{{ buttonText }}</span>
        </button>
      </form>
      <div
        class="my-8 text-center cursor-pointer"
        @click="navigate('forgotPassword')"
        v-if="formView === 'login'"
      >
        {{ $t("messages.account.forgotPassword") }}
      </div>
      <div
        class="my-8 text-center cursor-pointer"
        @click="navigate('login')"
        v-if="formView === 'forgotPassword'"
      >
        {{ $t("messages.account.backToLogin") }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/types";

const { t } = useI18n(); // Internationalization function
const route = useRoute(); // Provides current route information
const router = useRouter(); // Router instance for programmatically navigating
const { cart, addToCart } = useCart(); // Cart functionalities
const { loginUser, isPending, registerUser, sendResetPasswordEmail } =
  useAuth(); // Authentication methods

// Reactive user information object
const userInfo = ref<User>({
  id: "",
  roles: ["Client"],
  name: "",
  last_name: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirm: "",
});

// Reactive variable to control the current form view state
const formView = ref("login");

// Reactive variable to store success or informational messages
const message = ref("");

// Reactive variable to store error messages
const errorMessage = ref("");
/**
 * Updates the form view based on the current route query.
 *
 * If the route query contains an 'action' parameter with value
 * 'forgotPassword', the form view is set to 'forgotPassword'. If the
 * 'action' parameter is set to 'register', the form view is set to
 * 'register'. Otherwise, the form view is set to 'login'.
 */
const updateFormView = () => {
  errorMessage.value = ""; // Clear any error messages when the form view changes
  if (route.query.action === "forgotPassword") {
    formView.value = "forgotPassword";
  } else if (route.query.action === "register") {
    formView.value = "register";
  } else {
    formView.value = "login";
  }
};
watch(route, updateFormView, { immediate: true });

/**
 * Logs in the user with the provided user information.
 *
 * @param {User} userInfo - The user information to be used for login.
 * @return {Promise<void>} A promise that resolves when the login is complete.
 *
 * The login function logs in the user by calling the loginUser mutation
 * and passing the user information as an argument. If the login is successful,
 * it clears any error messages and displays a success message. If the login
 * fails, it sets an error message.
 */
const login = async (userInfo: User) => {
  const result = await loginUser({
    email: userInfo.email,
    password: userInfo.password,
  });

  if (result) {
    if (result.success) {
      // If the user is logged in successfully, clear any error messages
      // and display a success message.
      errorMessage.value = "";
      message.value = t("messages.account.loggingIn");

      // If the user has products in their cart, add them to the cart
      // after logging in.
      if (cart.value && cart.value.products.length > 0) {
        addToCart(cart.value.products);
      }
    } else {
      // If the login fails, set an error message.
      errorMessage.value = result.error;
    }
  }
};

/**
 * Handles form submission based on the current form view.
 *
 * @param {User} userInfo - The user information to be processed.
 * @return {Promise<void>} A promise that resolves when the form submission is complete.
 */
const handleFormSubmit = async (userInfo: User) => {
  // Handle registration form submission
  if (formView.value === "register") {
    const response = await registerUser(userInfo);
    if (response.success) {
      // Clear any error messages and display success message
      errorMessage.value = "";
      message.value =
        t("messages.account.accountCreated") +
        " " +
        t("messages.account.loggingIn");
      // Redirect to email sent confirmation page
      router.push("/emailSended");
    } else {
      if(response.error === 'already registered'){
        errorMessage.value = t("messages.error.alreadyRegistered  ");
      }else{
        // Set error message if registration fails
        errorMessage.value = t("messages.error.notRegistered");
      }
    }
  } else if (formView.value === "forgotPassword") {
    // Handle password reset form submission
    await resetPassword(userInfo);
  } else {
    // Handle login form submission
    await login(userInfo);
  }
};

const resetPassword = async (userInfo: User) => {
  const result = await sendResetPasswordEmail(userInfo.email);
  isPending.value = false;
  if (result) {
    if (result.success) {
      isPending.value = false;
      return { success: true, error: null };
    }
    return {
      success: false,
      error:
        "There was an error sending the reset password email. Please try again later.",
    };
  }
};

/**
 * Changes the form view and updates the route query accordingly.
 *
 * @param {string} view - The view to navigate to. Can be one of "login", "register", or "forgotPassword".
 */
const navigate = (view: string) => {
  formView.value = view;
  if (view === "forgotPassword") {
    router.push({ query: { action: "forgotPassword" } });
  } else if (view === "register") {
    router.push({ query: { action: "register" } });
  } else {
    router.push({ query: {} });
  }
};

/**
 * Computes the title for the form based on the current form view.
 *
 * @return {string} The localized title for the form.
 */
const formTitle = computed(() => {
  // Determine the form title based on the current form view
  if (formView.value === "login") {
    return t("messages.account.loginToAccount");
  } else if (formView.value === "register") {
    return t("messages.account.accountRegister");
  } else if (formView.value === "forgotPassword") {
    return t("messages.account.forgotPassword");
  }
});

/**
 * Computes the text for the form button based on the current form view.
 */
const buttonText = computed(() => {
  if (formView.value === "login") {
    return t("messages.account.login");
  } else if (formView.value === "register") {
    return t("messages.account.register");
  } else if (formView.value === "forgotPassword") {
    return t("messages.account.sendPasswordResetEmail");
  }
});

/**
 * Computes the label for the "name" field based on the current locale.
 *
 * @returns {string} The label for the "name" field.
 */
const nameLabel = computed(() => t("messages.billing.firstName"));

/**
 * Computes the label for the "lastName" field based on the current locale.
 *
 * @returns {string} The label for the "lastName" field.
 */
const lastNameLabel = computed(() => t("messages.billing.lastName"));

/**
 * Computes the label for the "username" field based on the current locale.
 *
 * @returns {string} The label for the "username" field.
 */
const usernameLabel = computed(() => t("messages.account.emailOrUsername"));

/**
 * Computes the label for the "password" field based on the current locale.
 *
 * @returns {string} The label for the "password" field.
 */
const passwordLabel = computed(() => t("messages.account.password"));

/**
 * Computes the label for the "passwordConfirm" field based on the current locale.
 *
 * @returns {string} The label for the "passwordConfirm" field.
 */
const passwordConfirmLabel = computed(() =>
  t("messages.account.passwordConfirm")
);

/**
 * Computes the placeholder values for the input fields based on the current locale.
 *
 * @returns {object} An object containing the placeholder values for the input fields.
 */
const inputPlaceholder = computed(() => {
  return {
    email: "johndoe@email.com",
    name: "Jhon",
    last_name: "Doe Smith",
    username: "johndoe@email.com",
    password: "********",
    passwordConfirm: "********",
  };
});
</script>

<style lang="postcss" scoped>
input,
button {
  @apply border rounded-lg mb-4 w-full p-3 px-4 bg-white;
}

form button {
  @apply rounded-lg font-bold bg-gray-800 text-white py-3 px-8 hover:bg-gray-800;
}
</style>
