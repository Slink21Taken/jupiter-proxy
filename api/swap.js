import { VersionedTransaction } from '@solana/web3.js';

export default async function handler(req, res) {
  // Always set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    const tx = VersionedTransaction.deserialize(Buffer.from(data.swapTransaction, "base64"));
    const serialized = tx.serialize();
    const serializedBase64 = Buffer.from(serialized).toString("base64");

    res.status(200).json({ swapTransaction: serializedBase64 });
  } catch (err) {
    // Make sure even error responses include CORS headers
    res.status(500).json({ error: "Proxy swap failed", details: err.message });
  }
}
