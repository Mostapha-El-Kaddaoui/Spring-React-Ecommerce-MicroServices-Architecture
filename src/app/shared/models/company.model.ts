export interface Company {
  id: number;
  name: string;
  ipoDate: string; // ISO date string
  currentPrice: number;
  domain?: string;
}
