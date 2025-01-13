declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        member: {
          email: string;
          password: string;
          name: string;
          confirmPassword: string;
          modify: string;
          info: string;
          delete: string;
          register: string;
        };
      };
    };
  }
}