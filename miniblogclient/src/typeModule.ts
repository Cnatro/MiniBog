/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ActionTypeReducer {
  type: string;
  payload?: any;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  username: string;
  imageUrl: string;
  createdDate: string;
  updatedDate: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roleName: string;
}

export interface UserSignUp {
  username: string;
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}
