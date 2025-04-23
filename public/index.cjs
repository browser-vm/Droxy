"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ChemicalBuild: () => ChemicalBuild,
  ChemicalServer: () => ChemicalServer,
  ChemicalVitePlugin: () => ChemicalVitePlugin
});
module.exports = __toCommonJS(index_exports);

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/index.ts
var import_node_path2 = require("path");
var import_node_fs = require("fs");
var import_node_http = require("http");
var import_express = __toESM(require("express"), 1);
var import_server = require("@mercuryworkshop/wisp-js/server");
var import_node = require("@mercuryworkshop/bare-mux/node");
var import_libcurl_transport = require("@mercuryworkshop/libcurl-transport");
var import_epoxy_transport = require("@mercuryworkshop/epoxy-transport");

// ultraviolet/index.js
var import_node_path = require("path");
var import_node_url = require("url");
var __dirname2 = (0, import_node_path.dirname)((0, import_node_url.fileURLToPath)(importMetaUrl));
var uvPath = (0, import_node_path.resolve)(__dirname2, "../ultraviolet/dist/");

// ultraviolet/path.js
var uvRandomPath = "_hPRTiIRrX";

// src/index.ts
var import_scramjet = require("@mercuryworkshop/scramjet");
var import_server2 = __toESM(require("rammerhead/src/server/index.js"), 1);
import_server.logging.set_level(import_server.logging.ERROR);
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
    this.server = (0, import_node_http.createServer)();
    this.app = (0, import_express.default)();
    this.app.serveChemical = this.serveChemical;
  }
  [Symbol.iterator]() {
    return [this.app, this.listen][Symbol.iterator]();
  }
  serveChemical = () => {
    const rh = (0, import_server2.default)();
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
      let chemicalMain = await (0, import_node_fs.readFileSync)(
        (0, import_node_path2.resolve)(__dirname, "../client/chemical.js"),
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
      let chemicalSW = await (0, import_node_fs.readFileSync)(
        (0, import_node_path2.resolve)(__dirname, "../client/chemical.sw.js"),
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
    this.app.use(import_express.default.static((0, import_node_path2.resolve)(__dirname, "../client")));
    this.app.use("/baremux/", import_express.default.static(import_node.baremuxPath));
    this.app.use("/libcurl/", import_express.default.static(import_libcurl_transport.libcurlPath));
    this.app.use("/epoxy/", import_express.default.static(import_epoxy_transport.epoxyPath));
    if (this.options.uv) {
      this.app.use(`/${uvRandomPath}/`, import_express.default.static(uvPath));
    }
    if (this.options.scramjet) {
      this.app.use("/scramjet/", import_express.default.static(import_scramjet.scramjetPath));
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
            import_server.server.options[option] = this.options.wispOptions[option];
          }
        }
        import_server.server.routeRequest(req, socket, head);
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
    const rh = (0, import_server2.default)();
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
    const app = (0, import_express.default)();
    app.get("/chemical.js", async function(req, res) {
      let chemicalMain = await (0, import_node_fs.readFileSync)(
        (0, import_node_path2.resolve)(__dirname, "../client/chemical.js"),
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
      let chemicalSW = await (0, import_node_fs.readFileSync)(
        (0, import_node_path2.resolve)(__dirname, "../client/chemical.sw.js"),
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
    app.use(import_express.default.static((0, import_node_path2.resolve)(__dirname, "../client")));
    app.use("/baremux/", import_express.default.static(import_node.baremuxPath));
    app.use("/libcurl/", import_express.default.static(import_libcurl_transport.libcurlPath));
    app.use("/epoxy/", import_express.default.static(import_epoxy_transport.epoxyPath));
    if (options.uv) {
      app.use(`/${uvRandomPath}/`, import_express.default.static(uvPath));
    }
    if (options.scramjet) {
      app.use("/scramjet/", import_express.default.static(import_scramjet.scramjetPath));
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
              import_server.server.options[option] = options.wispOptions[option];
            }
          }
          import_server.server.routeRequest(req, socket, head);
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
    if (!(0, import_node_fs.existsSync)((0, import_node_path2.resolve)(this.options.path || ""))) {
      (0, import_node_fs.mkdirSync)((0, import_node_path2.resolve)(this.options.path || ""), { recursive: true });
    } else {
      if (deletePath) {
        (0, import_node_fs.readdirSync)((0, import_node_path2.resolve)(this.options.path || "")).forEach(
          (file) => (0, import_node_fs.rmSync)((0, import_node_path2.resolve)(this.options.path || "", file), { recursive: true })
        );
      }
    }
    let chemicalMain = await (0, import_node_fs.readFileSync)(
      (0, import_node_path2.resolve)(__dirname, "../client/chemical.js"),
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
    (0, import_node_fs.writeFileSync)(
      (0, import_node_path2.resolve)(this.options.path || "", "chemical.js"),
      chemicalMain
    );
    let chemicalSW = await (0, import_node_fs.readFileSync)(
      (0, import_node_path2.resolve)(__dirname, "../client/chemical.sw.js"),
      "utf8"
    );
    chemicalSW = "const uvEnabled = " + String(this.options.uv) + ";\n" + chemicalSW;
    chemicalSW = "const scramjetEnabled = " + String(this.options.scramjet) + ";\n" + chemicalSW;
    chemicalSW = "const rammerheadEnabled = " + String(this.options.rh) + ";\n" + chemicalSW;
    chemicalSW = `const uvRandomPath = "${String(uvRandomPath)}";
` + chemicalSW;
    (0, import_node_fs.writeFileSync)(
      (0, import_node_path2.resolve)(this.options.path || "", "chemical.sw.js"),
      chemicalSW
    );
    if (this.options.demoMode) {
      (0, import_node_fs.copyFileSync)(
        (0, import_node_path2.resolve)(__dirname, "client/chemical.demo.html"),
        (0, import_node_path2.resolve)(this.options.path || "", "chemical.demo.html")
      );
    }
    (0, import_node_fs.cpSync)(import_node.baremuxPath, (0, import_node_path2.resolve)(this.options.path || "", "baremux"), {
      recursive: true
    });
    (0, import_node_fs.cpSync)(import_libcurl_transport.libcurlPath, (0, import_node_path2.resolve)(this.options.path || "", "libcurl"), {
      recursive: true
    });
    (0, import_node_fs.cpSync)(import_epoxy_transport.epoxyPath, (0, import_node_path2.resolve)(this.options.path || "", "epoxy"), {
      recursive: true
    });
    (0, import_node_fs.cpSync)(import_libcurl_transport.libcurlPath, (0, import_node_path2.resolve)(this.options.path || "", "libcurl"), {
      recursive: true
    });
    if (this.options.uv) {
      (0, import_node_fs.cpSync)(uvPath, (0, import_node_path2.resolve)(this.options.path || "", uvRandomPath), {
        recursive: true
      });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChemicalBuild,
  ChemicalServer,
  ChemicalVitePlugin
});
//# sourceMappingURL=index.cjs.map