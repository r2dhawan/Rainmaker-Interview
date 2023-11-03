"use client";
import { useState } from "react";
import { Token, getQuote, Quote } from "../quote";
import { BigNumber } from "ethers";

const Page = () => {
  const [fromTokenSymbol, setFromTokenSymbol] = useState("USDC");
  const [toTokenSymbol, setToTokenSymbol] = useState("ETH");
  const [fromAmount, setFromAmount] = useState("1");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setError(null);
    try {
      const fromToken: Token = {
        name: "USD Coin",
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        symbol: "USDC",
        decimals: 6,
        coingecko: "usd-coin",
        coinmarketcap: "usd-coin",
      };

      const toToken: Token = {
        name: "Ethereum",
        address: "0x0000000000000000000000000000000000000000",
        symbol: "ETH",
        decimals: 18,
        coingecko: "ethereum",
        coinmarketcap: "ethereum",
      };

      const fromAmountBN = BigNumber.from(fromAmount);
      const quote = await getQuote(fromToken, toToken, fromAmountBN);
      setQuote(quote);
    } catch (error) {
      setError("Error fetching quote. Please check your input.");
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-black mb-4">Token Swap Quote</h1>

      <div className="mb-4">
        <label className="block text-gray-600">
          From Token:
          <input
            type="text"
            value={fromTokenSymbol}
            onChange={(e) => setFromTokenSymbol(e.target.value)}
            className="border p-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">
          To Token:
          <input
            type="text"
            value={toTokenSymbol}
            onChange={(e) => setToTokenSymbol(e.target.value)}
            className="border p-2"
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600">
          Amount:
          <input
            type="text"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="border p-2"
          />
        </label>
      </div>

      <button
        onClick={fetchQuote}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Get Quote
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {quote && (
        <div className="mt-4">
          <p className="text-gray-600">
            Swap Balance: {quote.swapBalance.toString()}
          </p>
          <p className="text-gray-600">
            Slippage: {quote.slippagePercent * 100}%
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
