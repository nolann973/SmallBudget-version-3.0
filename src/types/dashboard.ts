export type Transaction = {
  id: string;
  user_id: string;
  label: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
  created_at?: string;
};

export type Goal = {
  id: string;
  user_id: string;
  title: string;
  current_amount: number;
  target_amount: number;
  deadline?: string;
  created_at?: string;
  updated_at?: string;
};

export type Category = {
  id: string;
  user_id: string;
  name: string;
  icon?: string;
  color?: string;
  type: 'income' | 'expense';
  created_at?: string;
};

export type Profile = {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
};

export type TabType = "overview" | "transactions" | "goals" | "savings" | "catalogs" | "settings";
