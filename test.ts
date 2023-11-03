import { BigNumber } from "ethers";
import { Token } from "./tokens";
import { getQuote } from "./quote";

async function main() {
  const fromToken: Token = {
    name: "USD Coin",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    symbol: "USDC",
    decimals: 6,
    coingecko: "usd-coin",
    coinmarketcap: "usd-coin",
  };

  const toToken: Token = {
    name: "Wrapped ETH",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    symbol: "WETH",
    decimals: 18,
    coingecko: "weth",
    coinmarketcap: "weth",
  };

  const fromAmount = BigNumber.from("1000000000000000000"); // Adjust the value as needed

  const quote = await getQuote(fromToken, toToken, fromAmount);
  console.log("Quote:", quote);
}

main();
