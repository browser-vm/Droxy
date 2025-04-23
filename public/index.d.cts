import { Server } from 'node:http';
import { application } from 'express';
import { ViteDevServer } from 'vite';

interface WispOptions {
    hostname_blacklist?: Array<RegExp>;
    hostname_whitelist?: Array<RegExp>;
    port_blacklist?: (number | Array<number>)[];
    port_whitelist?: (number | Array<number>)[];
    allow_direct_ip?: boolean;
    allow_private_ips?: boolean;
    allow_loopback_ips?: boolean;
    stream_limit_per_host?: number;
    stream_limit_total?: number;
    allow_udp_streams?: boolean;
    allow_tcp_streams?: boolean;
    dns_ttl?: number;
    dns_method?: "lookup" | "resolve";
    dns_servers?: Array<string>;
    dns_result_order?: "ipv4first" | "ipv6first" | "verbatim";
    parse_real_ip?: boolean;
    parse_real_ip_from?: Array<string>;
}
interface Options {
    uv?: boolean;
    scramjet?: boolean;
    rh?: boolean;
    demoMode?: boolean;
    default?: string;
    wispOptions?: WispOptions;
}
interface BuildOptions extends Options {
    path?: string;
}
interface ChemicalServer {
    options: Options;
    server: Server;
    app: application;
}
declare class ChemicalServer {
    constructor(options?: Options);
    [Symbol.iterator](): Iterator<application | Function>;
    serveChemical: () => void;
    listen: (port: number, callback: () => void) => void;
}
declare const ChemicalVitePlugin: (options: Options) => {
    name: string;
    configureServer(server: ViteDevServer): void;
};
interface ChemicalBuild {
    options: BuildOptions;
}
declare class ChemicalBuild {
    constructor(options: BuildOptions);
    write(deletePath?: boolean): Promise<void>;
}

export { ChemicalBuild, ChemicalServer, ChemicalVitePlugin };
