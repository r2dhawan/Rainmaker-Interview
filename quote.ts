import { ethers, BigNumber } from "ethers";

export type Token = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  coingecko: string;
  coinmarketcap: string;
};

export type Quote = {
  swapBalance: BigNumber;
  slippagePercent: number;
};

export async function getQuote(
  fromToken: Token,
  toToken: Token,
  fromAmount: BigNumber
): Promise<Quote> {
  console.info(
    `Converting ${fromAmount.toString()} ${fromToken.symbol} to ${
      toToken.symbol
    }`
  );

  // Get the contract for a DEX.
  const dexContract = await getDexContract();

  // Use ethers and the DEX contract to figure out how much TO_TOKEN you can get for the FROM_TOKEN.
  const swapBalance = await estimateSwapBalance(
    dexContract,
    fromToken,
    toToken,
    fromAmount
  );

  console.info(
    `Estimated swap balance: ${swapBalance.toString()} ${toToken.symbol}`
  );

  // Calculate slippage on the swap.
  const slippagePercent = calculateSlippage(fromAmount, swapBalance);

  console.info(`Slippage: ${slippagePercent * 100}%`);

  return {
    swapBalance,
    slippagePercent,
  };
}

async function getDexContract(): Promise<any> {
  // Replace 'DexContractAddress' with the actual address of your DEX contract.
  const dexContractAddress = "DexContractAddress";

  // Replace 'DexContractABI' with the actual ABI of your DEX contract.
  const dexContractABI = require("./customContractABI.json");

  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth"
  );

  // Connect to the contract using ethers.
  const dexContract = new ethers.Contract(
    dexContractAddress,
    dexContractABI,
    provider
  );

  return dexContract;
}

async function estimateSwapBalance(
  dexContract: any,
  fromToken: Token,
  toToken: Token,
  fromAmount: BigNumber
): Promise<BigNumber> {
  try {
    // Call the DEX contract method to estimate the swap balance.
    const swapBalance = await dexContract.estimateSwap(
      fromToken.address,
      toToken.address,
      fromAmount
    );

    return swapBalance;
  } catch (error) {
    console.error("Error estimating swap balance:", error);
    throw error;
  }
}

function calculateSlippage(
  fromAmount: BigNumber,
  swapBalance: BigNumber
): number {
  try {
    const slippage = fromAmount.sub(swapBalance).div(fromAmount).toNumber();
    return slippage;
  } catch (error) {
    console.error("Error calculating slippage:", error);
    throw error;
  }
}
