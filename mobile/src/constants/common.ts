import { Colors } from "./Colors";
const ApiUrl = 'http://localhost:3000/api';

export const UrlParamsReplace = (url: string, params: unknown = {}) => {
  let urlWithPrefix = `${ApiUrl}${url}`;
  if (params) {
    Object.keys(params).forEach(
      (key) => (urlWithPrefix = urlWithPrefix.replace(`:${key}`, params[key]))
    );
  }
  return urlWithPrefix;
};

export const LOGIN_OPTIONS = [
    {
        id: 1,
        name: 'Google',
        backgroundColor: Colors.support.error.dark
    },
    {
        id: 2,
        name: 'Apple',
        backgroundColor: Colors.neutral.dark.darkest
    },
    {
        id: 3,
        name: 'Facebook',
        backgroundColor: Colors.facebook
    }
]