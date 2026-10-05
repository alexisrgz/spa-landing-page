import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";

// Detect local photographs without making requests for files that do not exist.
function spaImages(): Plugin {
  const virtualId = "virtual:spa-images";
  const resolvedId = "\0" + virtualId;
  const imageDirectory = fileURLToPath(
    new URL("./public/images", import.meta.url),
  );
  return {
    name: "spa-local-images",
    resolveId: (id) => (id === virtualId ? resolvedId : undefined),
    load(id) {
      if (id !== resolvedId) return;
      const images = readdirSync(imageDirectory)
        .filter((name) => name.endsWith(".jpg"))
        .map((name) => `/images/${name}`);
      return `export default ${JSON.stringify(images)}`;
    },
    configureServer(server) {
      const refresh = (file: string) => {
        if (
          resolve(dirname(file)) !== resolve(imageDirectory) ||
          !file.endsWith(".jpg")
        )
          return;
        const module = server.moduleGraph.getModuleById(resolvedId);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh).on("unlink", refresh);
      server.httpServer?.once("close", () => {
        server.watcher.off("add", refresh).off("unlink", refresh);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaImages()],
});
