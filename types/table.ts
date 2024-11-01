export type columnType = {
  title: string;
  key: string;
}

export type dataSourceMovement = {
  key: number;
  concep: string;
  amount: string;
  date: string;
  user: string;
}

export type dataSourceUser = {
  key: number;
  name: string;
  email: string;
  phone: string;
  ations: string;
}
/**{
  lang: Locale,
  s: { [key: string]: any },
  customColors?: { text: string, bg: string }
} */