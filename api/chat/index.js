// ======================================================
//  Azure Function: /api/chat
//  Conecta el front con Microsoft Foundry (GPT-4o-mini)
// ======================================================

import fetch from "node-fetch";

// Secrets proporcionados por GitHub / Static Web Apps
const FOUNDRY_ENDPOINT = process.env.FOUNDRY_ENDPOINT;   // Ej: https://xxx.services.ai.azure.com/api/projects/proj-asistente/
const FOUNDRY_API_KEY  = process.env.FOUNDRY_API_KEY;    // API Key del proyecto Foundry

export default async function (context, req) {
    try {
        const userMessage = req.body?.message;

        if (!userMessage) {
            context.res = {
                status: 400,
                body: { error: "No message provided" }
            };
            return;
        }

        // Endpoint completo para hacer chat completions en Foundry
        const url = `${FOUNDRY_ENDPOINT}/chat/completions?api-version=2024-08-01-preview`;

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
            const errorBody = await response.text();
            console.error("Foundry ERROR:", response.status, errorBody);

            context.res = {
                status: 500,
                body: { error: "Error calling Microsoft Foundry" }
            };
            return;
        }

        const data = await response.json();

        const reply = data?.choices?.[0]?.message?.content || "No se pudo generar respuesta.";

        // Respuesta al frontend
        context.res = {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: { reply }
        };

    } catch (error) {
        console.error("Function error:", error);

        context.res = {
            status: 500,
            body: { error: "Server error" }
        };
    }
}
