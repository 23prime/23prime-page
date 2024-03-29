import colors from "vuetify/es5/util/colors";

let envConfig;

switch (process.env.NODE_ENV) {
    case "production":
        envConfig = {
            apiBaseUrl: "https://api.23prime.xyz",
        };
        break;
    default:
        envConfig = {
            apiBaseUrl: "http://localhost:8080",
        };
}

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: "static",

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: "%s - Okkey's page",
        title: "Okkey's page",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ["ress"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ["@/plugins/axios", "@/plugins/axios-accessor"],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/vuetify
        "@nuxtjs/vuetify",
        // https://github.com/nuxt-community/style-resources-module
        "@nuxtjs/style-resources",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        [
            "nuxt-mq",
            {
                // Default breakpoint for SSR
                defaultBreakpoint: "sm",
                breakpoints: {
                    sm: 991,
                    lg: Infinity,
                },
            },
        ],
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: envConfig.apiBaseUrl,
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        defaultAssets: { icons: "fa" },
        customVariables: ["~/assets/variables.scss"],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    server: {
        port: 3023,
        host: "0.0.0.0",
    },

    styleResources: {
        scss: ["~/assets/sass/common.scss"],
    },

    env: {
        API_BASE_URL: envConfig.apiBaseUrl,
    },

    storybook: {
        parameters: {
            layout: "centered",
        },
    },
};
