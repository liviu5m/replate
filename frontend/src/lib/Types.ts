export type User = {
  id: number;
  fullName: string;
  username: string;
  phone: string;
  email: string;
  address: string;
  verified: boolean;
  role: string;
  image: string;
  city: string;
  zip: string;
  country: string;
  createdAt: string;
  provider: string;
};

export type ProfileDataType = {
  fullName: string;
  username: string;
  phone: string;
  address: string;
  role: string;
  image: string;
  city: string;
  zip: string;
  country: string;
  createdAt: string;
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

export type VerificationData = {
  idType: string;
  idNumber: string;
  documentUrl: string;
  userId: number;
};
