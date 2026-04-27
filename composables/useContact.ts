import conf from "~/conf/useConf";

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const useContact = () => {
  const isPending = useState<boolean>("contactPending", () => false);
  const { t } = useI18n();

  const sendMessage = async (
    contactData: ContactMessage
  ): Promise<{ success: boolean; error: any }> => {
    isPending.value = true;
    try {
      await $fetch(`${conf.api.baseUrl}${conf.api.services.ticket}`, {
        method: "POST",
        body: JSON.stringify(contactData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return {
        success: true,
        error: null,
      };
    } catch (error: any) {
      return {
        success: false,
        error: t("messages.general.contactError") || "Error sending message",
      };
    } finally {
      isPending.value = false;
    }
  };

  return {
    isPending,
    sendMessage,
  };
};
