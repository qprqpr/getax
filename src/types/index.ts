export interface Income {
  id: number;
  uid: string;
  date: string;
  rate: number;
  income: number;
  currency: CurrencyCode;
  amount: number;
}

export type IncomeInsert = Omit<Income, 'id'>;

export interface IncomeExt extends Omit<Income, 'date'> {
  date: number;
}

export interface ExchangeRate {
  date: string;
  currencies: Currency[];
}

export interface Currency {
  code: CurrencyCode;
  quantity: number;
  rateFormated: string;
  diffFormated: string;
  rate: number;
  name: string;
  diff: number;
  date: string;
  validFromDate: string;
}

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const CURRENCIES = [
  ["AED", "United Arab Emirates Dirhams"],
  ["AMD", "Armenian Dram"],
  ["AUD", "Australian Dollar"],
  ["AZN", "Azerbaijan Manat"],
  ["BGN", "Bulgarian Lev"],
  ["BRL", "Brazilian Real"],
  ["BYN", "Belarusian Rouble"],
  ["CAD", "Canadian Dollar"],
  ["CHF", "Swiss Franc"],
  ["CNY", "China Renminbi"],
  ["CZK", "Czech Koruna"],
  ["DKK", "Danish Krone"],
  ["EGP", "Egyptian Pound"],
  ["EUR", "Euro"],
  ["GBP", "United Kingdom Pound"],
  // ["GEL", "Georgian Lari"],
  ["HKD", "Hong-Kong Dollar"],
  ["HUF", "Hungarian Forint"],
  ["ILS", "Israeli Shekel"],
  ["INR", "Indian Rupee"],
  ["IRR", "Iranian Rial"],
  ["ISK", "Iceland Krona"],
  ["JPY", "Japanese Yen"],
  ["KGS", "Kyrgyzstan Som"],
  ["KRW", "South Korean Won"],
  ["KWD", "Kuwaiti Dinar"],
  ["KZT", "Kazakhstan Tenge"],
  ["MDL", "Moldova Lei"],
  ["NOK", "Norwegian Krone"],
  ["NZD", "New Zealand Dollar"],
  ["PLN", "Polish Zloty"],
  ["QAR", "Qatari Rial"],
  ["RON", "Romanian Leu"],
  ["RSD", "Serbian Dinar"],
  ["RUB", "Russian Ruble"],
  ["SEK", "Swedish Krona"],
  ["SGD", "Singapore Dollar"],
  ["TJS", "Tajikistan Somoni"],
  ["TMT", "Turkmenistan Manat"],
  ["TRY", "Turkish Lira"],
  ["UAH", "Ukraine Hryvna"],
  ["USD", "US Dollar"],
  ["UZS", "Uzbekistan Sum"],
  ["ZAR", "South African Rand"],
] as const;

export type CurrencyCode = typeof CURRENCIES[number][0] | 'GEL';