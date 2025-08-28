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

export type DonationDto = {
  name: string;
  quantity: string;
  unit: string;
  expiryDate: string;
  notes: string;
  status: string;
};

export type Donation = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  notes: string;
  status: string;
  createdAt: string;
};

export type RequestDto = {
  userId: number;
  status: string;
};

export type Request = {
  id: number;
  user: User;
  status: string;
  createdAt: string;
  requestDonations: RequestDonation[];
};

export type RequestDonationDto = {
  requestId: number;
  donationId: number;
};

export type RequestDonation = {
  id: number;
  request: Request;
  donation: Donation;
  createdAt: string;
};
