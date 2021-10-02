<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app>
            <v-list>
                <link-menu icon="fa-home" title="Home" link="/" />
                <link-menu icon="fa-id-card-alt" title="Profiles" link="/profiles" />
                <link-menu icon="fa-link" title="Links" link="/links" />
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Welcome to Okkey's page!</v-toolbar-title>
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

@Component({
    components: {
        LinkMenu,
    },
})
export default class DefaultLayout extends Vue {
    drawer = null;
}
</script>
