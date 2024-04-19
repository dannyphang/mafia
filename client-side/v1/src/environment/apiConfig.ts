import env from './environment.json';

const isDev = false;

export const apiConfig = {
    baseUrl: isDev ? env.localBaseUrl : env.serverBaseUrl
};