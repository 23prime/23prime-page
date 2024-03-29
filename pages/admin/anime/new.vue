<template>
    <div>
        <v-container>
            <status-bar
                :failed-msg="failedMsg"
                :success-msg="successMsg"
                :loading="loading"
            ></status-bar>

            <v-row>
                <season-selector :season-prop.sync="season" :disabled="false"></season-selector>
            </v-row>

            <v-row>
                <v-btn :disabled="loading || !season" @click="scrapeAnimes">Scrape</v-btn>
                <v-btn :disabled="loading" @click="clearAnimes">Clear</v-btn>
                <v-btn :disabled="loading || selectedAnimes.length < 1" @click="registerAnimes">
                    Register
                </v-btn>
                <nuxt-link to="../anime"><v-btn>Back</v-btn></nuxt-link>
            </v-row>
        </v-container>

        <v-spacer></v-spacer>

        <div class="anime-table-wrapper">
            <v-data-table
                v-model="selectedAnimes"
                :headers="headers"
                :items="animes"
                :items-per-page="100"
                item-key="title"
                show-select
            >
                <template #[`item.year`]="{ item }">
                    <v-text-field v-model="item.year"></v-text-field>
                </template>

                <template #[`item.season`]="{ item }">
                    <v-text-field v-model="item.season"></v-text-field>
                </template>

                <template #[`item.day`]="{ item }">
                    <v-text-field v-model="item.day"></v-text-field>
                </template>

                <template #[`item.time`]="{ item }">
                    <v-text-field v-model="item.time"></v-text-field>
                </template>

                <template #[`item.station`]="{ item }">
                    <v-text-field v-model="item.station"></v-text-field>
                </template>

                <template #[`item.title`]="{ item }">
                    <v-text-field v-model="item.title"></v-text-field>
                </template>

                <template #[`item.recommend`]="{ item }">
                    <v-simple-checkbox v-model="item.recommend"></v-simple-checkbox>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { $axios } from "@/utils/api";
import StatusBar from "@/components/StatusBar.vue";
import SeasonSelector from "@/components/SeasonSelector.vue";

type anime = {
    id: number | null;
    year: number;
    season: string;
    day: string;
    time: string;
    station: string;
    title: string;
    recommend: boolean;
};

@Component({
    middleware: ["authenticated"],
    components: { SeasonSelector, StatusBar },
})
export default class AnimeNew extends Vue {
    private head() {
        return {
            title: "Anime/new",
        };
    }

    private headers = [
        { text: "year", value: "year", align: "center" },
        { text: "season", value: "season", align: "center" },
        { text: "day", value: "day", align: "center" },
        { text: "time", value: "time", align: "center" },
        { text: "station", value: "station", align: "center" },
        { text: "title", value: "title", align: "center", width: 320 },
        { text: "recommend", value: "recommend", align: "center" },
    ];

    private animes: anime[] = [];

    private selectedAnimes: anime[] = [];

    private season = null;

    private failedMsg: string | null = null;

    private successMsg: string | null = null;

    private loading = false;

    private clearAnimes() {
        this.clearMsgs();
        this.animes = [];
    }

    private clearMsgs() {
        this.failedMsg = null;
        this.successMsg = null;
        this.loading = false;
    }

    private async scrapeAnimes() {
        this.clearMsgs();
        this.loading = true;

        try {
            const response = await $axios.$get(`/api/animes/scrape/${this.season}`);
            this.animes = response.animes;
            this.successMsg = `Succeeded to scrape and get ${this.animes.length} animes`;
            this.animes.map((a) => (a.recommend = false));
        } catch (error: any) {
            if (error.response?.status === 401) {
                this.failedMsg = "Failed to call API: Access token is invalid. Please re-login.";
            } else {
                this.failedMsg = "Failed to call API: Please try again.";
            }
        } finally {
            this.loading = false;
        }
    }

    private async registerAnimes() {
        this.clearMsgs();
        this.loading = true;

        try {
            const response = await $axios.$post(`/api/animes`, { animes: this.selectedAnimes });
            this.successMsg = `Succeeded to register ${response.animes.length} animes`;
        } catch (error: any) {
            if (error.response?.status === 401) {
                this.failedMsg = "Failed to call API: Access token is invalid. Please re-login.";
            } else {
                this.failedMsg = "Failed to call API: Please try again.";
            }
        } finally {
            this.loading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 95%;
}

.row {
    margin: 0;
    padding: 0;
}

.v-data-table:deep() th,
.v-data-table:deep() td,
.v-text-field {
    font-size: 0.9rem !important;
}
</style>
