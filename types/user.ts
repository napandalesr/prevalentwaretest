export type userType = {
  show?: boolean;
  id?: string;
  updateUserId?: string;
  name: string;
  email?: string;
  phone?: string;
  role?: "USER" | "ADMIN";
}

export type dataSourceUser = {
  key: number;
  name: string;
  email: string;
  phone: string;
  actions: React.ReactNode;
}