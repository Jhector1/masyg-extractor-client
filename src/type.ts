export type KeywordObject = Record<string, unknown[]>;
export interface DetailsType {
  ProductId: string;
  Description: string;
  Qty: string;
  Price: string;
  Ext_Price: string;
}
export type DetailsFileType = Record<string, DetailsType>;

// export type KeywordsType = Record<string, DetailsType[]>;
export const data: KeywordsType[] = [];
export interface KeywordsType extends ApiResponse {
  ID: string;
  SourceFile?: string;
  Description: string;
  Quantity: string;
  Price: string;
  Cost: string;
}
export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SUBSCRIBE'; payload: User  }
  | { type: 'UNSUBSCRIBE'; payload: User  }
  | { type: 'RESET' };

export interface ApiResponse {
  [key: string]: unknown;
  // Dynamic keys with unknown values
}
export interface CheckoutSession {
  id: string;
  url: string;
} 

export interface User {
  username: string;
  email: string;
  password: string;
  isSubscribed: boolean;
  hasUsedTrial: boolean;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  exp_month: string;
  exp_year: string;
}

export type GeneralResponse = {
  message?: string;
  error?: string;
};
export interface UserUpdateInfo {
  email: string;
  username: string;
  old_password: string;
  password: string;
  confirm_password: string;
}

export type State = {
  user: User | null;
};