
import fetch from "node-fetch";

const FOUNDRY_ENDPOINT = process.env.FOUNDRY_ENDPOINT; // https://asistentewebia.cognitiveservices.azure.com/
const FOUNDRY_API_KEY = process.env.FOUNDRY_API_KEY;   // tu clave
const FOUNDRY_MODEL = process.env.FOUNDRY_MODEL || "gpt-4o-mini";

export default async function (context, req) {
  try {
    const userMessage = req.body?.message;
    if (!userMessage) {
      context.res = { status: 400, body: { error: "No message provided" } };
      return;
    }

    const url = `${FOUNDRY_ENDPOINT}openai/deployments/${FOUNDRY_MODEL}/chat/completions?api-version=2024-08-01-preview`;

    const payload = {
      messages: [
        { role: "system", content: "Eres un asistente experto en IA generativa y Azure." },
        { role: "user", content: userMessage }
      ],
      max_tokens: 600,
      temperature: 0.7
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": FOUNDRY_API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.text();
      context.log.error("Foundry ERROR:", response.status, err);
      context.res = { status: 502, body: { error: "Error calling Foundry" } };
      return;
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ?? "No se pudo generar respuesta.";
    context.res = { status: 200, headers: { "Content-Type": "application/json" }, body: { reply } };
  } catch (e) {
    context.log.error("Function error:", e);
    context.res = { status: 500, body: { error: "Server error" } };
  }
}
