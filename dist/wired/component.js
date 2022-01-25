"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wire = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const router_1 = __importStar(require("next/router"));
const react_1 = require("react");
const hooks_1 = require("react-relay/hooks");
const relay_runtime_1 = require("relay-runtime");
const context_1 = require("./context");
const error_boundry_1 = require("./error_boundry");
// Enabling this feature flag to determine if a page should 404 on the server.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
relay_runtime_1.RelayFeatureFlags.ENABLE_REQUIRED_DIRECTIVES = true;
function defaultVariablesFromContext(ctx) {
    return ctx.query;
}
/** Hook that records if query variables have changed. */
function useHaveQueryVariablesChanges(queryVariables) {
    const [haveVarsChanged, setVarsChanged] = (0, react_1.useState)('pending');
    (0, react_1.useEffect)(() => {
        setVarsChanged((current) => {
            if (current === 'pending')
                return false;
            return true;
        });
    }, [queryVariables]);
    return haveVarsChanged === 'pending' ? false : haveVarsChanged;
}
function Wire(Component, query, opts) {
    function WiredComponent(props) {
        var _a;
        const router = (0, router_1.useRouter)();
        const [queryReference, loadQuery, disposeQuery] = (0, hooks_1.useQueryLoader)(query, props.preloadedQuery);
        const queryVariables = (0, react_1.useMemo)(() => {
            var _a;
            return ((_a = opts.variablesFromContext) !== null && _a !== void 0 ? _a : defaultVariablesFromContext)(router);
        }, [router]);
        (0, react_1.useEffect)(() => {
            loadQuery(queryVariables);
            return disposeQuery;
        }, [loadQuery, disposeQuery, queryVariables]);
        const haveQueryVarsChanged = useHaveQueryVariablesChanges(queryVariables);
        // If this component is being rendered from the client _or_ if it is a
        // subsequent render of the same component with different query variables
        // wrap with Suspense to catch page transitions. This is not done on
        // server-side renders because React 17 doesn't support SSR + Suspense, is
        // not done on the initial client render because it would caues React to
        // think there is a markup mismatch (even though there isn't), and isn't
        // done on mount to avoid unnecessary re-renders.
        if (props.CSN || haveQueryVarsChanged) {
            return ((0, jsx_runtime_1.jsx)(error_boundry_1.WiredErrorBoundary, Object.assign({ ErrorComponent: opts.ErrorComponent }, { children: (0, jsx_runtime_1.jsx)(react_1.Suspense, Object.assign({ fallback: (_a = opts.fallback) !== null && _a !== void 0 ? _a : 'Loading...' }, { children: (0, jsx_runtime_1.jsx)(Component, Object.assign({}, props, { preloadedQuery: queryReference }), void 0) }), void 0) }), void 0));
        }
        else {
            return (0, jsx_runtime_1.jsx)(Component, Object.assign({}, props, { preloadedQuery: queryReference }), void 0);
        }
    }
    WiredComponent.getInitialProps = wiredInitialProps(query, opts);
    return WiredComponent;
}
exports.Wire = Wire;
function wiredInitialProps(query, opts) {
    return (ctx) => __awaiter(this, void 0, void 0, function* () {
        if (typeof window === 'undefined') {
            return getServerInitialProps(ctx, query, opts);
        }
        else {
            return getClientInitialProps(ctx, query, opts);
        }
    });
}
function getServerInitialProps(ctx, query, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { variablesFromContext = defaultVariablesFromContext } = opts;
        const serverSideProps = opts.serverSideProps
            ? yield opts.serverSideProps(ctx)
            : {};
        if ('redirect' in serverSideProps) {
            const { redirect } = serverSideProps;
            let statusCode = 302;
            if ('statusCode' in redirect) {
                statusCode = redirect.statusCode;
            }
            else if ('permanent' in redirect) {
                statusCode = redirect.permanent ? 308 : 307;
            }
            ctx
                .res.writeHead(statusCode, {
                Location: redirect.destination,
            })
                .end();
            return { __wired__server__context: {} };
        }
        const env = yield opts.createServerEnvironment(ctx, serverSideProps);
        const variables = variablesFromContext(ctx);
        const preloadedQuery = (0, hooks_1.loadQuery)(env, query, variables);
        yield ensureQueryFlushed(preloadedQuery);
        const context = (0, context_1.createWiredServerContext)({
            variables,
            query,
            preloadedQuery,
        });
        return Object.assign(Object.assign({}, serverSideProps), { __wired__server__context: context });
    });
}
function getClientInitialProps(ctx, query, opts) {
    const { variablesFromContext = defaultVariablesFromContext } = opts;
    const clientSideProps = opts.clientSideProps
        ? opts.clientSideProps(ctx)
        : {};
    if ('redirect' in clientSideProps) {
        router_1.default.push(clientSideProps.redirect.destination);
        return {};
    }
    const env = opts.createClientEnvironment(ctx, clientSideProps);
    const variables = variablesFromContext(ctx);
    const preloadedQuery = (0, hooks_1.loadQuery)(env, query, variables, {
        fetchPolicy: 'store-and-network',
    });
    const context = (0, context_1.createWiredClientContext)({
        preloadedQuery,
    });
    return Object.assign(Object.assign({}, clientSideProps), { __wired__client__context: context });
}
function ensureQueryFlushed(query) {
    return new Promise((resolve, reject) => {
        if (query.source == null) {
            resolve();
        }
        else {
            query.source.subscribe({
                complete: resolve,
                error: reject,
            });
        }
    });
}
