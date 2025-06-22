export default async function handler(req, res) {
  const { inputMint, outputMint, amount, slippageBps, feeBps, referrer } = req.query;

  const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}&feeBps=${feeBps}&referrer=${referrer}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy fetch failed", details: err.message });
  }
}
