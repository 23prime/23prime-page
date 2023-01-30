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

                <div v-if="loggedIn">
                    <nuxt-link to="/admin/anime">
                        <link-menu icon="fa-edit" title="Anime" />
                    </nuxt-link>
                </div>

                <div v-if="loggedIn" @click="logout">
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
    private loggedIn = false;

    private async mounted() {
        const auth = await AuthStore.load();
        this.loggedIn = !!auth;
    }

    private login() {
        window.location.href = `${process.env.API_BASE_URL}/auth/before`;
    }

    private async logout() {
        await AuthStore.destroy();
        window.location.href = `${process.env.API_BASE_URL}/auth/logout`;
    }
}
</script>

<style lang="scss" scoped>
a {
    // Force kill 'a:-webkit-any-link'
    text-decoration: none;
}
</style>
