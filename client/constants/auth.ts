export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type SignUpTypes = {
  email: string;
  password: string;
};

export type SendPasswordResetMail = {
  email: string;
};

export type SignUpResponse = {
  message: string;
  userId: string;
};

export type VerifyEmailResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type LoginResponse = {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type PasswordResetResponse = {
  message: string;
};
