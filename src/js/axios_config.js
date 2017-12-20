// 导入axios, 进行默认域名配置与开启跨域请求传送证书, 然后导出配置后的axios
import axios from 'axios';
import { domain } from './api_config.js';

axios.defaults.baseURL = domain;
axios.defaults.withCredentials = true;

export default axios;
