interface ExchangeRates {
  krw: number;
  usd: number;
}

export class CurrencyConverter {
  private static rates: ExchangeRates = {
    krw: 1,
    usd: 0.00075 // 예시 환율, 실제 API 연동 필요
  };

  static convert(amount: number, from: keyof ExchangeRates, to: keyof ExchangeRates): number {
    return amount * (this.rates[to] / this.rates[from]);
  }

  static getSymbol(currency: keyof ExchangeRates): string {
    return {
      krw: '₩',
      usd: '$'
    }[currency];
  }
}