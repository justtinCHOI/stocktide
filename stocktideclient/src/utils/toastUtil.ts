
import { toast, Id, ToastOptions, ToastContent } from 'react-toastify';

class ToastManager {
  private static activeToasts: Map<string, Id> = new Map();
  private static dismissTimers: Map<string, NodeJS.Timeout> = new Map();

  static show(message: string, type: 'info' | 'success' | 'warning' | 'error', options?: ToastOptions<{}>) {
    // 이전 타이머가 있다면 제거
    const existingTimer = this.dismissTimers.get(message);
    if (existingTimer) {
      clearTimeout(existingTimer);
      this.dismissTimers.delete(message);
    }

    // 이전 동일 메시지 토스트가 있다면 업데이트
    const existingId = this.activeToasts.get(message);
    if (existingId) {
      toast.update(existingId, {
        render: message,
        type: type,
        isLoading: false,
        autoClose: 3000
      });
      return existingId;
    }

    // 새로운 토스트 생성
    const toastId = toast[type](message as ToastContent<{}>, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: message,
      style: {
        backgroundColor: '#333',
        color: 'white',
        fontSize: '0.9rem',
        borderRadius: '8px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
        minHeight: '48px'
      },
      ...options,
      onClose: (...args) => {
        const timer = setTimeout(() => {
          this.activeToasts.delete(message);
          this.dismissTimers.delete(message);
          if (options?.onClose) {
            options.onClose(...args);
          }
        }, 300); // 약간의 딜레이를 줘서 깜빡임 방지
        this.dismissTimers.set(message, timer);
      }
    });

    this.activeToasts.set(message, toastId);
    return toastId;
  }

  static info(message: string, options?: ToastOptions<{}>) {
    return this.show(message, 'info', {
      ...options,
      autoClose: options?.autoClose || 3000
    });
  }

  static success(message: string, options?: ToastOptions<{}>) {
    return this.show(message, 'success', {
      ...options,
      autoClose: options?.autoClose || 3000
    });
  }

  static warning(message: string, options?: ToastOptions<{}>) {
    return this.show(message, 'warning', {
      ...options,
      autoClose: options?.autoClose || 3000
    });
  }

  static error(message: string, options?: ToastOptions<{}>) {
    return this.show(message, 'error', {
      ...options,
      autoClose: options?.autoClose || 3000
    });
  }

  static dismiss(message?: string) {
    if (message) {
      const id = this.activeToasts.get(message);
      if (id) {
        const timer = setTimeout(() => {
          toast.dismiss(id);
          this.activeToasts.delete(message);
        }, 100);
        this.dismissTimers.set(message, timer);
      }
    } else {
      this.dismissAll();
    }
  }

  static dismissAll() {
    // 모든 타이머 클리어
    this.dismissTimers.forEach(timer => clearTimeout(timer));
    this.dismissTimers.clear();

    // 모든 토스트 제거
    toast.dismiss();
    this.activeToasts.clear();
  }

  static update(message: string, newMessage: string, type: 'info' | 'success' | 'warning' | 'error') {
    const toastId = this.activeToasts.get(message);
    if (toastId) {
      toast.update(toastId, {
        render: newMessage,
        type: type,
        isLoading: false,
        autoClose: 3000
      });
      this.activeToasts.delete(message);
      this.activeToasts.set(newMessage, toastId);
    }
  }

  // 컴포넌트 언마운트 시 정리
  static cleanup() {
    this.dismissTimers.forEach(timer => clearTimeout(timer));
    this.dismissTimers.clear();
    this.activeToasts.clear();
  }
}

export default ToastManager;