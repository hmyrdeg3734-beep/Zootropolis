import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    systemInstruction: "Sen PatiKa uygulamasının 'PatiAsistan' isimli yapay zeka asistanısın. Görevin evcil hayvan sahiplerine sağlık, beslenme, eğitim ve bakım konularında dostane, uzman ve bilgilendirici tavsiyeler vermek. Cevapların kısa, öz ve samimi olmalı. Eğer acil bir durum sezersen (zehirlenme, ağır yaralanma vb.), mutlaka en yakın veteriner kliniğine gitmelerini tavsiye et. İstanbul Anadolu Yakası bölgesi odaklısın ama genel bilgi de verebilirsin."
  });

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const chat = model.startChat({
        history: history || [],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      res.json({ text: response.text() });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Yapay zeka asistanı şu an dinleniyor, lütfen biraz sonra tekrar dene." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PatiKa Server running on http://localhost:${PORT}`);
  });
}

startServer();
