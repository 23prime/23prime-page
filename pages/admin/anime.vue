<template>
    <v-container>
        <v-alert v-show="failedMsg" type="error">{{ failedMsg }}</v-alert>

        <v-row>
            <div class="anime-btn-wrapper">
                <v-btn class="v-btn-overwrite" @click="showAnimes"> Show Animes </v-btn>
            </div>

            <div class="anime-btn-wrapper">
                <v-btn class="v-btn-overwrite" @click="clearAnimes"> Clear Animes </v-btn>
            </div>
        </v-row>

        <v-spacer></v-spacer>

        <div class="anime-table-wrapper">
            <v-data-table :headers="headers" :items="animes" :items-per-page="100"></v-data-table>
        </div>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { $axios } from "~/utils/api";

@Component({
    middleware: ["authenticated"],
    components: {},
})
export default class Profiles extends Vue {
    head() {
        return {
            title: "Anime",
        };
    }

    private headers = [
        { text: "id", value: "id" },
        { text: "year", value: "year" },
        { text: "season", value: "season" },
        { text: "day", value: "day" },
        { text: "time", value: "time" },
        { text: "station", value: "station" },
        { text: "title", value: "title" },
        { text: "recommend", value: "recommend" },
    ];

    private animes = [];

    private failedMsg: string | null = null;

    private clearAnimes() {
        this.failedMsg = null;
        this.animes = [];
    }

    private async showAnimes() {
        try {
            const response = await $axios.$get(`/api/animes`);
            this.failedMsg = null;
            this.animes = response.animes;
        } catch (error: any) {
            if (error.response?.status === 401) {
                this.failedMsg = "Failed to call API: Aaccess token is invalid. Please re-login.";
            } else {
                this.failedMsg = "Failed to call API: Please try again.";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.anime-btn-wrapper {
    padding: 32px 12px;
}
</style>
