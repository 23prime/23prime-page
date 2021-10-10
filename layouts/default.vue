<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app right>
            <v-list>
                <nuxt-link to="/">
                    <link-menu icon="fa-home" title="Home" />
                </nuxt-link>

                <nuxt-link to="/profiles">
                    <link-menu icon="fa-id-card-alt" title="Profiles" />
                </nuxt-link>

                <nuxt-link to="/links">
                    <link-menu icon="fa-link" title="Links" />
                </nuxt-link>

                <div v-if="logined" @click="logout">
                    <link-menu icon="fa-sign-out-alt" title="Logout" />
                </div>

                <div v-else @click="login">
                    <link-menu icon="fa-sign-in-alt" title="Login" />
                </div>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-toolbar-title>Welcome to Okkey's page!</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <nuxt />
            </v-container>
        </v-main>

        <v-footer app>
            <v-card-text class="py-2 white--text text-center">
                &copy; {{ new Date().getFullYear() }} 23prime
            </v-card-text>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import LinkMenu from "@/components/LinkMenu.vue";
import { AuthStore } from "@/store";

@Component({
    components: {
        LinkMenu,
    },
})
export default class DefaultLayout extends Vue {
    private drawer = null;
    private logined = false;

    async mounted() {
        const auth = await AuthStore.load();
        this.logined = !!auth;
    }

    private login() {
        const scopes = ["openid", "profile"];
        const queryParams = [
            "response_type=code",
            `client_id=${process.env.CLIENT_ID}`,
            `redirect_uri=${process.env.API_BASE_URL}/auth/callback`,
            `scope=${scopes.join(" ")}`,
            "state=hoge",
        ];
        window.location.href = `${process.env.AUTHORITY}/authorize?${queryParams.join("&")}`;
    }

    private async logout() {
        await AuthStore.destroy();
        this.$router.push("/");
        location.reload();
    }
}
</script>

<style lang="scss" scoped>
a {
    // Force kill 'a:-webkit-any-link'
    text-decoration: none;
}
</style>
