import axios from "axios";

type userData = {
  fullName: string;
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
};

type roleData = {
  role: string;
  address: string;
  phone: string;
  userId: number;
  type: string;
};

type verifyData = {
  code: string;
  userId: number;
};

type logInData = {
  email: string;
  password: string;
};

export async function createUser(formData: userData) {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/auth/signup",
    formData
  );
  return response.data;
}

export async function setUpUserRole(formData: roleData) {
  const response = await axios.put(
    import.meta.env.VITE_API_URL + "/api/user/role",
    formData
  );
  return response.data;
}


export async function verifyUser(formData: verifyData) {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/auth/verify",
    formData
  );
  return response.data;
}



export async function authenticate(formData: logInData) {
  const response = await axios.post(
    import.meta.env.VITE_API_URL + "/auth/login",
    formData
  );
  return response.data;
}