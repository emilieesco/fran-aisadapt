import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";

// Empêcher tout crash silencieux du processus
process.on("uncaughtException", (err) => {
  console.error("[prod] Exception non capturée:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[prod] Rejet non géré:", reason);
});

export async function serveStatic(app: Express, _server: Server) {
  // process.cwd() = racine du projet sur Railway (/app)
  // Le build crée toujours dist/public/ à cet endroit
  const distPath = path.resolve(process.cwd(), "dist", "public");

  console.log("[prod] Chemin statique:", distPath);

  if (!fs.existsSync(distPath)) {
    console.error("[prod] dist/public introuvable à:", distPath);
    console.error("[prod] Contenu de dist/:", fs.readdirSync(path.resolve(process.cwd(), "dist")).join(", "));
    return; // Ne pas crasher — API reste fonctionnelle
  }

  app.use(express.static(distPath));

  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });

  console.log("[prod] Fichiers statiques servis depuis:", distPath);
}

(async () => {
  try {
    await runApp(serveStatic);
  } catch (err) {
    console.error("[prod] Erreur démarrage:", err);
  }
})();
