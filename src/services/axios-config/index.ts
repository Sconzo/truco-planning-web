import axios from 'axios'
import {Environment} from "../../utils/Environment";

const Api = axios.create({
  baseURL:Environment.SERVER_URL,
  responseType:"json",
  headers:{
    "Content-Type": "application/json",
  }
});


export { Api }
