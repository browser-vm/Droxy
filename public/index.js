// node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/index.ts
import { resolve as resolve2 } from "node:path";
import {
  readFileSync,
  cpSync,
  writeFileSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  rmSync,
  readdirSync
} from "node:fs";
import { createServer } from "node:http";
import express from "express";
import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";

// ultraviolet/index.js
import { resolve, dirname } from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
var __dirname2 = dirname(fileURLToPath2(import.meta.url));
var uvPath = resolve(__dirname2, "../ultraviolet/dist/");

// ultraviolet/path.js
var uvRandomPath = "_hPRTiIRrX";

// src/index.ts
import { scramjetPath } from "@mercuryworkshop/scramjet";
import createRammerhead from "rammerhead/src/server/index.js";
logging.set_level(logging.ERROR);
var ChemicalServer = class {
  constructor(options = {}) {
    if (options) {
      if (typeof options !== "object" || Array.isArray(options)) {
        options = {};
        console.error("Error: ChemicalServer options invalid.");
      }
    } else {
      options = {};
    }
    if (options.uv === void 0) {
      options.uv = true;
    }
    if (options.scramjet === void 0) {
      options.scramjet = true;
    }
    if (options.rh === void 0) {
      options.rh = true;
    }
    if (options.demoMode === void 0) {
      options.demoMode = false;
    }
    this.options = options;
    this.server = createServer();
    this.app = express();
    this.app.serveChemical = this.serveChemical;
  }
  [Symbol.iterator]() {
    return [this.app, this.listen][Symbol.iterator]();
  }
  serveChemical = () => {
    const rh = createRammerhead();
    const rammerheadScopes = [
      "/rammerhead.js",
      "/hammerhead.js",
      "/transport-worker.js",
      "/task.js",
      "/iframe-task.js",
      "/worker-hammerhead.js",
      "/messaging",
      "/sessionexists",
      "/deletesession",
      "/newsession",
      "/editsession",
      "/needpassword",
      "/syncLocalStorage",
      "/api/shuffleDict"
    ];
    const rammerheadSession = /^\/[a-z0-9]{32}/;
    const shouldRouteRh = (req) => {
      const url = new URL(req.url, "http://0.0.0.0");
      return rammerheadScopes.includes(url.pathname) || rammerheadSession.test(url.pathname);
    };
    const routeRhRequest = (req, res) => {
      rh.emit("request", req, res);
    };
    const routeRhUpgrade = (req, socket, head) => {
      rh.emit("upgrade", req, socket, head);
    };
    this.app.get("/chemical.js", async (req, res) => {
      let chemicalMain = await readFileSync(
        resolve2(__dirname, "../client/chemical.js"),
        "utf8"
      );
      if (this.options.default) {
        if (["uv", "rh", "scramjet"].includes(this.options.default)) {
          chemicalMain = `const defaultService = "${this.options.default}";

` + chemicalMain;
        } else {
          chemicalMain = `const defaultService = "uv";

` + chemicalMain;
          console.error("Error: Chemical default option invalid.");
        }
      } else {
        chemicalMain = `const defaultService = "uv";

` + chemicalMain;
      }
      chemicalMain = "const uvEnabled = " + String(this.options.uv) + ";\n" + chemicalMain;
      chemicalMain = "const scramjetEnabled = " + String(this.options.scramjet) + ";\n" + chemicalMain;
      chemicalMain = "const rammerheadEnabled = " + String(this.options.rh) + ";\n" + chemicalMain;
      chemicalMain = "const demoMode = " + String(this.options.demoMode) + ";\n" + chemicalMain;
      chemicalMain = `const uvRandomPath = "${String(uvRandomPath)}";
` + chemicalMain;
      chemicalMain = "(async () => {\n" + chemicalMain + "\n})();";
      res.type("application/javascript");
      return res.send(chemicalMain);
    });
    this.app.get("/chemical.sw.js", async (req, res) => {
      let chemicalSW = await readFileSync(
        resolve2(__dirname, "../client/chemical.sw.js"),
        "utf8"
      );
      chemicalSW = "const uvEnabled = " + String(this.options.uv) + ";\n" + chemicalSW;
      chemicalSW = "const scramjetEnabled = " + String(this.options.scramjet) + ";\n" + chemicalSW;
      chemicalSW = "const rammerheadEnabled = " + String(this.options.rh) + ";\n" + chemicalSW;
      chemicalSW = `const uvRandomPath = "${String(uvRandomPath)}";
` + chemicalSW;
      res.type("application/javascript");
      return res.send(chemicalSW);
    });
    this.app.use(express.static(resolve2(__dirname, "../client")));
    this.app.use("/baremux/", express.static(baremuxPath));
    this.app.use("/libcurl/", express.static(libcurlPath));
    this.app.use("/epoxy/", express.static(epoxyPath));
    if (this.options.uv) {
      this.app.use(`/${uvRandomPath}/`, express.static(uvPath));
    }
    if (this.options.scramjet) {
      this.app.use("/scramjet/", express.static(scramjetPath));
    }
    this.server.on("request", (req, res) => {
      if (this.options.rh && shouldRouteRh(req)) {
        routeRhRequest(req, res);
      } else {
        this.app(req, res);
      }
    });
    this.server.on("upgrade", (req, socket, head) => {
      if (req.url && req.url.endsWith("/wisp/")) {
        if (this.options.wispOptions) {
          for (let option in this.options.wispOptions) {
            wisp.options[option] = this.options.wispOptions[option];
          }
        }
        wisp.routeRequest(req, socket, head);
      } else if (this.options.rh && shouldRouteRh(req)) {
        routeRhUpgrade(req, socket, head);
      } else {
        socket.end();
      }
    });
  };
  listen = (port, callback) => {
    this.server.listen(port, callback);
  };
};
var ChemicalVitePlugin = (options) => ({
  name: "chemical-vite-plugin",
  configureServer(server) {
    if (options) {
      if (typeof options !== "object" || Array.isArray(options)) {
        options = {};
        console.error("Error: ChemicalServer options invalid.");
      }
    } else {
      options = {};
    }
    if (options.uv === void 0) {
      options.uv = true;
    }
    if (options.scramjet === void 0) {
      options.scramjet = true;
    }
    if (options.rh === void 0) {
      options.rh = true;
    }
    if (options.demoMode === void 0) {
      options.demoMode = false;
    }
    const rh = createRammerhead();
    const rammerheadScopes = [
      "/rammerhead.js",
      "/hammerhead.js",
      "/transport-worker.js",
      "/task.js",
      "/iframe-task.js",
      "/worker-hammerhead.js",
      "/messaging",
      "/sessionexists",
      "/deletesession",
      "/newsession",
      "/editsession",
      "/needpassword",
      "/syncLocalStorage",
      "/api/shuffleDict"
    ];
    const rammerheadSession = /^\/[a-z0-9]{32}/;
    const shouldRouteRh = (req) => {
      const url = new URL(req.url, "http://0.0.0.0");
      return rammerheadScopes.includes(url.pathname) || rammerheadSession.test(url.pathname);
    };
    const routeRhRequest = (req, res) => {
      rh.emit("request", req, res);
    };
    const routeRhUpgrade = (req, socket, head) => {
      rh.emit("upgrade", req, socket, head);
    };
    const app = express();
    app.get("/chemical.js", async function(req, res) {
      let chemicalMain = await readFileSync(
        resolve2(__dirname, "../client/chemical.js"),
        "utf8"
      );
      if (options.default) {
        if (["uv", "rh", "scramjet"].includes(options.default)) {
          chemicalMain = `const defaultService = "${options.default}";

` + chemicalMain;
        } else {
          chemicalMain = `const defaultService = "uv";

` + chemicalMain;
          console.error("Error: Chemical default option invalid.");
        }
      } else {
        chemicalMain = `const defaultService = "uv";

` + chemicalMain;
      }
      chemicalMain = "const uvEnabled = " + String(options.uv) + ";\n" + chemicalMain;
      chemicalMain = "const scramjetEnabled = " + String(options.scramjet) + ";\n" + chemicalMain;
      chemicalMain = "const rammerheadEnabled = " + String(options.rh) + ";\n" + chemicalMain;
      chemicalMain = "const demoMode = " + String(options.demoMode) + ";\n" + chemicalMain;
      chemicalMain = `const uvRandomPath = "${String(uvRandomPath)}";
` + chemicalMain;
      chemicalMain = "(async () => {\n" + chemicalMain + "\n})();";
      res.type("application/javascript");
      return res.send(chemicalMain);
    });
    app.get("/chemical.sw.js", async function(req, res) {
      let chemicalSW = await readFileSync(
        resolve2(__dirname, "../client/chemical.sw.js"),
        "utf8"
      );
      chemicalSW = "const uvEnabled = " + String(options.uv) + ";\n" + chemicalSW;
      chemicalSW = "const scramjetEnabled = " + String(options.scramjet) + ";\n" + chemicalSW;
      chemicalSW = "const rammerheadEnabled = " + String(options.rh) + ";\n" + chemicalSW;
      chemicalSW = `const uvRandomPath = "${String(uvRandomPath)}";
` + chemicalSW;
      res.type("application/javascript");
      return res.send(chemicalSW);
    });
    app.use(express.static(resolve2(__dirname, "../client")));
    app.use("/baremux/", express.static(baremuxPath));
    app.use("/libcurl/", express.static(libcurlPath));
    app.use("/epoxy/", express.static(epoxyPath));
    if (options.uv) {
      app.use(`/${uvRandomPath}/`, express.static(uvPath));
    }
    if (options.scramjet) {
      app.use("/scramjet/", express.static(scramjetPath));
    }
    server.middlewares.use(app);
    server.middlewares.use((req, res, next) => {
      if (options.rh && shouldRouteRh(req)) {
        routeRhRequest(req, res);
      } else {
        next();
      }
    });
    const upgraders = server.httpServer?.listeners("upgrade");
    for (const upgrader of upgraders) {
      server?.httpServer?.off("upgrade", upgrader);
    }
    server?.httpServer?.on(
      "upgrade",
      (req, socket, head) => {
        if (req.url && req.url.endsWith("/wisp/")) {
          if (options.wispOptions) {
            for (let option in options.wispOptions) {
              wisp.options[option] = options.wispOptions[option];
            }
          }
          wisp.routeRequest(req, socket, head);
        } else if (options.rh && shouldRouteRh(req)) {
          routeRhUpgrade(req, socket, head);
        } else {
          for (const upgrader of upgraders) {
            upgrader(req, socket, head);
          }
        }
      }
    );
  }
});
var ChemicalBuild = class {
  constructor(options) {
    if (options) {
      if (typeof options !== "object" || Array.isArray(options)) {
        options = {};
        console.error("Error: ChemicalBuild options invalid.");
      }
    } else {
      options = {};
    }
    if (options.path === void 0) {
      options.path = "dist";
    }
    if (options.path.startsWith("/")) {
      options.path = options.path.substring(1);
    }
    if (options.path.endsWith("/")) {
      options.path = options.path.slice(0, -1);
    }
    if (options.uv === void 0) {
      options.uv = true;
    }
    if (options.scramjet === void 0) {
      options.scramjet = true;
    }
    if (options.rh === void 0) {
      options.rh = true;
    }
    if (options.demoMode === void 0) {
      options.demoMode = false;
    }
    this.options = options;
  }
  async write(deletePath = false) {
    if (!existsSync(resolve2(this.options.path || ""))) {
      mkdirSync(resolve2(this.options.path || ""), { recursive: true });
    } else {
      if (deletePath) {
        readdirSync(resolve2(this.options.path || "")).forEach(
          (file) => rmSync(resolve2(this.options.path || "", file), { recursive: true })
        );
      }
    }
    let chemicalMain = await readFileSync(
      resolve2(__dirname, "../client/chemical.js"),
      "utf8"
    );
    if (this.options.default) {
      if (["uv", "rh", "scramjet"].includes(this.options.default)) {
        chemicalMain = `const defaultService = "${this.options.default}";

` + chemicalMain;
      } else {
        chemicalMain = `const defaultService = "uv";

` + chemicalMain;
        console.error("Error: Chemical default option invalid.");
      }
    } else {
      chemicalMain = `const defaultService = "uv";

` + chemicalMain;
    }
    chemicalMain = "const uvEnabled = " + String(this.options.uv) + ";\n" + chemicalMain;
    chemicalMain = "const scramjetEnabled = " + String(this.options.scramjet) + ";\n" + chemicalMain;
    chemicalMain = "const rammerheadEnabled = " + String(this.options.rh) + ";\n" + chemicalMain;
    chemicalMain = "const demoMode = " + String(this.options.demoMode) + ";\n" + chemicalMain;
    chemicalMain = `const uvRandomPath = "${String(uvRandomPath)}";
` + chemicalMain;
    chemicalMain = "(async () => {\n" + chemicalMain + "\n})();";
    writeFileSync(
      resolve2(this.options.path || "", "chemical.js"),
      chemicalMain
    );
    let chemicalSW = await readFileSync(
      resolve2(__dirname, "../client/chemical.sw.js"),
      "utf8"
    );
    chemicalSW = "const uvEnabled = " + String(this.options.uv) + ";\n" + chemicalSW;
    chemicalSW = "const scramjetEnabled = " + String(this.options.scramjet) + ";\n" + chemicalSW;
    chemicalSW = "const rammerheadEnabled = " + String(this.options.rh) + ";\n" + chemicalSW;
    chemicalSW = `const uvRandomPath = "${String(uvRandomPath)}";
` + chemicalSW;
    writeFileSync(
      resolve2(this.options.path || "", "chemical.sw.js"),
      chemicalSW
    );
    if (this.options.demoMode) {
      copyFileSync(
        resolve2(__dirname, "client/chemical.demo.html"),
        resolve2(this.options.path || "", "chemical.demo.html")
      );
    }
    cpSync(baremuxPath, resolve2(this.options.path || "", "baremux"), {
      recursive: true
    });
    cpSync(libcurlPath, resolve2(this.options.path || "", "libcurl"), {
      recursive: true
    });
    cpSync(epoxyPath, resolve2(this.options.path || "", "epoxy"), {
      recursive: true
    });
    cpSync(libcurlPath, resolve2(this.options.path || "", "libcurl"), {
      recursive: true
    });
    if (this.options.uv) {
      cpSync(uvPath, resolve2(this.options.path || "", uvRandomPath), {
        recursive: true
      });
    }
  }
};
export {
  ChemicalBuild,
  ChemicalServer,
  ChemicalVitePlugin
};
//# sourceMappingURL=index.js.map