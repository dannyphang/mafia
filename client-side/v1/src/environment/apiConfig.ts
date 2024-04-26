import env from './environment.json';

const isDev = true;

export const apiConfig = {
    baseUrl: isDev ? env.localBaseUrl : env.serverBaseUrl
};