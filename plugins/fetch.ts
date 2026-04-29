export default defineNuxtPlugin((nuxtApp) => {
  // Ensure cookies are sent by default
  nuxtApp.$fetch.defaults.credentials = 'include';

  nuxtApp.$fetch.onResponseError(async (ctx) => {
    const { response, request, options } = ctx;
    // Only handle 401 once and avoid loops
    if (response.status === 401 && !(options as any)._retried) {
      try {
        // Attempt to refresh access token using refresh cookie
        const conf = (await import('~/conf/useConf')).default;
        const data = await $fetch<{ accessToken: string | null }>(
          `${conf.api.baseUrl}/auth/refresh`,
          { method: 'POST', credentials: 'include' }
        );
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
          return await $fetch.raw(request, newOptions);
        }
      } catch (e) {
        // If refresh fails, clear token and let the error bubble up
        const accessToken = useCookie<string | null>('accessToken');
        accessToken.value = null;
      }
    }
  });
});
