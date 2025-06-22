export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { signedTx } = req.body;

    const rpc = await fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "sendTransaction",
        params: [signedTx, { encoding: "base64" }]
      })
    });

    const result = await rpc.json();
    res.status(200).json({ txid: result.result });
  } catch (err) {
    res.status(500).json({ error: "Send failed", details: err.message });
  }
}
