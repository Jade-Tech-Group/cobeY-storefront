import { ref } from 'vue';

interface Toast {
  message: string;
  type: string;
  duration: number;
}

const toastList = ref<Toast[]>([]);

export const useToast = () => {
  const showToast = (message: string, type: string = 'info', duration: number = 3000) => {
    toastList.value.push({ message, type, duration });
    setTimeout(() => {
      toastList.value.shift();
    }, duration);
  };

  return { toastList, showToast };
};