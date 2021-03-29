(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{77:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return a})),t.d(n,"metadata",(function(){return l})),t.d(n,"toc",(function(){return s})),t.d(n,"default",(function(){return u}));var r=t(3),o=t(7),i=(t(0),t(90)),a={title:"Configuring relay-nextjs"},l={unversionedId:"configuration",id:"configuration",isDocsHomePage:!1,title:"Configuring relay-nextjs",description:"Installing relay-nextjs",source:"@site/docs/configuration.md",slug:"/configuration",permalink:"/relay-nextjs/docs/configuration",editUrl:"https://github.com/RevereCRE/relay-nextjs/edit/master/website/docs/configuration.md",version:"current",sidebar:"docs",previous:{title:"Installation and Setup",permalink:"/relay-nextjs/docs/installation-and-setup"}},s=[{value:"Installing <code>relay-nextjs</code>",id:"installing-relay-nextjs",children:[]},{value:"Routing Integration",id:"routing-integration",children:[{value:"Setting up the Relay Environment",id:"setting-up-the-relay-environment",children:[]},{value:"Configuring <code>_document</code>",id:"configuring-_document",children:[]},{value:"Configuring <code>_app</code>",id:"configuring-_app",children:[]}]},{value:"Usage in a Page",id:"usage-in-a-page",children:[]}],c={toc:s};function u(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},c,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"installing-relay-nextjs"},"Installing ",Object(i.b)("inlineCode",{parentName:"h2"},"relay-nextjs")),Object(i.b)("p",null,"Install using npm or your other favorite package manager:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"npm install relay-nextjs\n")),Object(i.b)("h2",{id:"routing-integration"},"Routing Integration"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"relay-nextjs")," must be configured in both a custom ",Object(i.b)("inlineCode",{parentName:"p"},"_document")," and ",Object(i.b)("inlineCode",{parentName:"p"},"_app")," to properly intercept and handle routing."),Object(i.b)("h3",{id:"setting-up-the-relay-environment"},"Setting up the Relay Environment"),Object(i.b)("p",null,"For basic information about the Relay environment please see the ",Object(i.b)("a",{parentName:"p",href:"https://relay.dev/docs/getting-started/step-by-step-guide/#42-configure-relay-runtime"},"Relay docs"),"."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"relay-nextjs")," was designed with both client-side and server-side rendering in mind. As such it needs to be able to use either a client-side or server-side Relay environment. The library knows how to handle which environment to use, but we have to tell it how to create these environments. For this we will define two functions: ",Object(i.b)("inlineCode",{parentName:"p"},"getClientEnvironment")," and ",Object(i.b)("inlineCode",{parentName:"p"},"createServerEnvironment"),". Note the distinction \u2014 on the client only one environment is ever created because there is only one app, but on the server we must create an environment per-render to ensure the cache is not shared between requests."),Object(i.b)("p",null,"First let\u2019s define ",Object(i.b)("inlineCode",{parentName:"p"},"getClientEnvironment"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-tsx"},"// lib/client_environment.ts\nimport { getWiredSerializedState } from 'relay-nextjs';\nimport { withHydrateDatetime } from 'relay-nextjs/date';\nimport { Environment, Network, Store, RecordSource } from 'relay-runtime';\n\nexport function createClientNetwork() {\n  return Network.create(async (params, variables) => {\n    const response = await fetch('/api/graphql', {\n      method: 'POST',\n      credentials: 'include',\n      headers: {\n        'Content-Type': 'application/json',\n      },\n      body: JSON.stringify({\n        query: params.text,\n        variables,\n      }),\n    });\n\n    const json = await response.text();\n    return JSON.parse(json, withHydrateDatetime);\n  });\n}\n\nlet clientEnv: Environment | undefined;\nexport function getClientEnvironment() {\n  if (typeof window === 'undefined') return null;\n\n  if (clientEnv == null) {\n    clientEnv = new Environment({\n      network: createClientNetwork(),\n      store: new Store(new RecordSource(getWiredSerializedState()?.records)),\n      isServer: false,\n    });\n  }\n\n  return clientEnv;\n}\n")),Object(i.b)("p",null,"and then ",Object(i.b)("inlineCode",{parentName:"p"},"createServerEnvironment"),":"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-tsx"},"import { graphql } from 'graphql';\nimport { withHydrateDatetime } from 'relay-nextjs/date';\nimport { GraphQLResponse, Network } from 'relay-runtime';\nimport { schema } from 'schema';\n\nexport function createServerNetwork(token: AuthToken) {\n  return Network.create(async (text, variables) => {\n    const context = {\n      token,\n      // More context variables here\n    };\n\n    const results = await graphql({\n      schema,\n      source: text.text!,\n      variableValues: variables,\n      contextValue: context,\n    });\n\n    const data = JSON.parse(\n      JSON.stringify(results),\n      withHydrateDatetime\n    ) as GraphQLResponse;\n\n    return data;\n  });\n}\n\nexport function createServerEnvironment(token: AuthToken) {\n  return new Environment({\n    network: createServerNetwork(token),\n    store: new Store(new RecordSource()),\n    isServer: true,\n  });\n}\n")),Object(i.b)("p",null,"Note in the example server environment we\u2019re executing against a local schema but you may fetch from a remote API as well."),Object(i.b)("h3",{id:"configuring-_document"},"Configuring ",Object(i.b)("inlineCode",{parentName:"h3"},"_document")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-tsx"},"// src/pages/_document.tsx\nimport { createRelayDocument, RelayDocument } from 'relay-nextjs/document';\n\ninterface DocumentProps {\n  relayDocument: RelayDocument;\n}\n\nclass MyDocument extends Document<MyDocumentProps> {\n  static async getInitialProps(ctx: DocumentContext) {\n    const relayDocument = createRelayDocument();\n\n    const renderPage = ctx.renderPage;\n    ctx.renderPage = () =>\n    renderPage({\n      enhanceApp: (App) => relayDocument.enhance(App),\n    });\n\n    const initialProps = await Document.getInitialProps(ctx);\n\n    return {\n      ...initialProps,\n      relayDocument,\n    };\n  }\n\n  render() {\n    const { relayDocument } = this.props;\n\n    return (\n      <Html>\n        <Head>\n          {/* ... */}\n          <relayDocument.Script />\n        </Head>\n        {/* ... */}\n      </Html>\n    );\n  }\n")),Object(i.b)("h3",{id:"configuring-_app"},"Configuring ",Object(i.b)("inlineCode",{parentName:"h3"},"_app")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-tsx"},"// src/pages/_app.tsx\nimport { RelayEnvironmentProvider } from 'react-relay/hooks';\nimport { getInitialPreloadedQuery, getRelayProps } from 'relay-nextjs/app';\nimport { getClientEnvironment } from '../lib/client_environment';\n\nconst clientEnv = getClientEnvironment();\nconst initialPreloadedQuery = getInitialPreloadedQuery({\n  createClientEnvironment: () => getClientEnvironment()!,\n});\n\nfunction MyApp({ Component, pageProps }: AppProps) {\n  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);\n  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;\n\n  return (\n    <>\n      <RelayEnvironmentProvider environment={env}>\n        <Component {...pageProps} {...relayProps} />\n      </RelayEnvironmentProvider>\n    </>\n  );\n}\n\nexport default MyApp;\n")),Object(i.b)("h2",{id:"usage-in-a-page"},"Usage in a Page"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-tsx"},"// src/pages/user/[uuid].tsx\nimport { withRelay, RelayProps } from 'relay-nextjs';\n\n// The $uuid variable is injected automatically from the route.\nconst ProfileQuery = graphql`\n  query profile_ProfileQuery($uuid: ID!) {\n    user(id: $uuid) {\n      id\n      firstName\n      lastName\n    }\n  }\n`;\n\nfunction Profile({ preloadedQuery }: RelayProps<{}, profile_ProfileQuery>) {\n  const query = usePreloadedQuery(ProfileQuery, preloadedQuery);\n\n  return (\n    <div>\n      Hello {query.user.firstName} {query.user.lastName}\n    </div>\n  );\n}\n\nfunction Loading() {\n  return <div>Loading...</div>;\n}\n\nexport default withRelay(UserProfile, UserProfileQuery, {\n  // This property is optional.\n  error: MyCustomErrorComponent,\n  // Fallback to render while the page is loading.\n  // This property is optional.\n  fallback: <Loading />,\n  // Create a Relay environment on the client-side.\n  // Note: This function must always return the same value.\n  createClientEnvironment: () => getClientEnvironment()!,\n  // Gets server side props for the page.\n  serverSideProps: async (ctx) => {\n    const { getTokenFromCtx } = await import('lib/server/auth');\n    const token = await getTokenFromCtx(ctx);\n    if (token == null) {\n      return {\n        redirect: { destination: '/login', permanent: false },\n      };\n    }\n\n    return { token };\n  },\n  // Server-side props can be accessed as the second argument\n  // to this function.\n  createServerEnvironment: async (\n    ctx,\n    { token }: { token: TokenWithClaims }\n  ) => {\n    const { createServerEnvironment } = await import('lib/server_environment');\n    return createServerEnvironment(token);\n  },\n});\n")))}u.isMDXComponent=!0}}]);