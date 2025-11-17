export interface Stock {
  id: number;
  date: string; // ISO date string
  openValue: number;
  highValue: number;
  lowValue: number;
  closeValue: number;
  volume: number;
  companyId: number;
}
