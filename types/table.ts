export type columnType = {
  title: string;
  key: string;
}

export type dataSourceMovement = {
  key: number;
  concept: string;
  amount: string;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  user: userType;
}

export type userType = {
  id?: string;
  name: string;
  email?: string;
  role?: "USER" | "ADMIN";
}

export type dataSourceUser = {
  key: number;
  name: string;
  email: string;
  phone: string;
  actions: React.ReactNode;
}