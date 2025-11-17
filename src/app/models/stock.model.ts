export interface Stock {
  id: number;
  date: string; // ISO date
  openValue: number;
  highValue: number;
  lowValue: number;
  closeValue: number;
  volume: number;
  companyId: number;
}
