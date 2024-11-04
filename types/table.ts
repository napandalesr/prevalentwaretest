import { userType } from "./user";

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
