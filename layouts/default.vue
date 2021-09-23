<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app>
            <v-list>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Welcome to Okkey's page!</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container fluid class="fill-height">
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

@Component({
    components: {},
})
export default class VuetifyTestPage extends Vue {
    drawer = null;
}
</script>

<style scoped lang="scss">
.fill-height {
    background-image: url("assets/images/construction.png");
    background-size: cover;
    background-position: center center;
}
</style>
