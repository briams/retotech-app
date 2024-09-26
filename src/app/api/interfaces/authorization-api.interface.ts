export interface ILoginReq {
  email: string;
  password: string;
}

export interface ILoginRes {
  userInfo: UserInfo;
  token: string;
}

interface UserInfo {
  id: number;
  name: string;
  email: string;
  lastname: string;
  fullname?: string;
}
