import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

const host = `${API_SERVER_HOST}/api/member`;

export const loginPost = async (loginParam) => {
  const header = {
    headers: { "Content-Type": "x-www-form-urlencoded" }
  };
  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);
  const res = await axios.post(`${host}/login`, form, header);
  return res.data;
};

export const signupPost = async (signupParam) => {
  const header = {
    headers: { "Content-Type": "application/json" }
  };

  const res = await axios.post(`${host}/signup`, signupParam, header);
  return res.data;
};

export const modify = async (modifyParam) => {
  const header = {
    headers: { "Content-Type": "application/json" }
  };

  const res = await axios.put(`${host}/modify`, modifyParam, header);
  return res.data;
};

export const deleted = async (deleteParam) => {
  const header = {
    headers: { "Content-Type": "application/json" }
  };

  const res = await axios.delete(`${host}/delete`, {
    data: deleteParam,
    ...header
  });
  return res.data;
};
