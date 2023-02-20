
import { AxiosRequestConfig } from 'axios';
import data from '../config/axios-config.json'; // This should be the path of a docker volume folder
import { logger } from './winston.config';

const profile: string = process.env.DEPLOY_ENV || 'local'; // get profile from env variable

logger.info('Active axios profile : ' + profile);

const configData = data.config as { [key: string]: any };

const activeConfig: AxiosRequestConfig = configData[profile];

export { profile, activeConfig };