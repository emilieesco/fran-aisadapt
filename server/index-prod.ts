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
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  try {
    await runApp(serveStatic);
  } catch (err) {
    console.error("[prod] Erreur démarrage:", err);
    // Ne pas quitter — le serveur écoute peut-être déjà
  }
})();
