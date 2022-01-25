"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWiredDocument = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const serialize_javascript_1 = __importDefault(require("serialize-javascript"));
const context_1 = require("./context");
function createWiredDocument() {
    let capturedWiredContext;
    const enhance = (App) => {
        return (props) => {
            capturedWiredContext = (0, context_1.getWiredServerContext)(props.pageProps.__wired__server__context);
            return (0, jsx_runtime_1.jsx)(App, Object.assign({}, props), void 0);
        };
    };
    const Script = (props) => {
        if (capturedWiredContext == null)
            return null;
        const records = capturedWiredContext.preloadedQuery.environment
            .getStore()
            .getSource()
            .toJSON();
        const serializedState = {
            records,
            query: capturedWiredContext.query,
            variables: capturedWiredContext.variables,
        };
        return ((0, jsx_runtime_1.jsx)("script", Object.assign({ dangerouslySetInnerHTML: {
                __html: `window.__wired__=${(0, serialize_javascript_1.default)(serializedState)}`,
            } }, props), void 0));
    };
    return { enhance, Script };
}
exports.createWiredDocument = createWiredDocument;
