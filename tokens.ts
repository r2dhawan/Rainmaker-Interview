export type Token = {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  coingecko: string;
  coinmarketcap: string;
};

export const USDC: Token = {
  name: "USD Coin",
  address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  symbol: "USDC",
  decimals: 6,
  coingecko: "usd-coin",
  coinmarketcap: "usd-coin",
};

export const ETH: Token = {
  name: "Ethereum",
  address: "0x0000000000000000000000000000000000000000",
  symbol: "ETH",
  decimals: 18,
  coingecko: "ethereum",
  coinmarketcap: "ethereum",
};

export const WETH: Token = {
  name: "Wrapped ETH",
  address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  symbol: "WETH",
  decimals: 18,
  coingecko: "weth",
  coinmarketcap: "weth",
};
