export interface Company {
  id: number;
  name: string;
  ipoDate: string; // ISO date
  currentPrice: number;
  domain?: string;
}
