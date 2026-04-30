export default defineNuxtPlugin((nuxtApp) => {
  // Ensure cookies are sent by default
  const api = $fetch.create({
    credentials: 'include',
    onResponseError: async (ctx): Promise<void> => {
      const { response, request, options } = ctx;
      // Only handle 401 once and avoid loops
      if (response.status === 401 && !(options as any)._retried) {
        try {
          // Attempt to refresh access token using refresh cookie
          const conf = (await import('~/conf/useConf')).default;
          const data = await $fetch(
            `${conf.api.baseUrl}/auth/refresh`,
            { method: 'POST', credentials: 'include' }
          ) as { accessToken: string | null };
          if (data?.accessToken) {
            // Save new access token
            const accessToken = useCookie<string | null>('accessToken');
            accessToken.value = data.accessToken;
            // Retry original request with Authorization header if used
            const newOptions = { ...options, headers: { ...(options.headers || {}) }, _retried: true } as any;
            if (newOptions.headers && accessToken.value) {
              if (!newOptions.headers['Authorization']) {
                newOptions.headers['Authorization'] = `Bearer ${accessToken.value}`;
              }
            }
            // Issue the request again to warm caches; original promise will still reject
            // because onResponseError cannot alter the original resolution.
            // Do not await to avoid double-handling errors.
            void $fetch.raw(request as any, newOptions as any);
          }
        } catch (e) {
          // If refresh fails, clear token and let the error bubble up
          const accessToken = useCookie<string | null>('accessToken');
          accessToken.value = null;
        }
      }
    },
  });

  // Make this instance the global $fetch so the rest of the app benefits from the defaults & interceptors
  (globalThis as any).$fetch = api as typeof $fetch;
});
