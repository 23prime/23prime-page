<template>
    <div>
        <v-container>
            <status-bar
                :failed-msg="failedMsg"
                :success-msg="successMsg"
                :loading="loading"
            ></status-bar>

            <v-row>
                <year-selector :year-prop.sync="year"></year-selector>
                <season-selector :season-prop.sync="season" :disabled="!year"></season-selector>
            </v-row>

            <v-row>
                <v-btn :disabled="loading" @click="showAnimes">Show</v-btn>
                <v-btn :disabled="loading" @click="clearAnimes">Clear</v-btn>
                <v-btn :disabled="loading || selectedAnimes.length < 1" @click="updateAnimes">
                    Update
                </v-btn>
                <v-btn :disabled="loading || selectedAnimes.length < 1" @click="deleteAnimes">
                    Delete
                </v-btn>
                <nuxt-link to="./anime/new"><v-btn>New</v-btn></nuxt-link>
            </v-row>
        </v-container>

        <v-spacer></v-spacer>

        <div class="anime-table-wrapper">
            <v-data-table
                v-model="selectedAnimes"
                :headers="headers"
                :items="animes"
                :items-per-page="100"
                item-key="id"
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
import YearSelector from "@/components/YearSelector.vue";
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
    components: { SeasonSelector, StatusBar, YearSelector },
})
export default class AnimeIndex extends Vue {
    private head() {
        return {
            title: "Anime",
        };
    }

    private headers = [
        { text: "id", value: "id", align: "center" },
        { text: "year", value: "year", align: "center", width: 80 },
        { text: "season", value: "season", align: "center" },
        { text: "day", value: "day", align: "center" },
        { text: "time", value: "time", align: "center" },
        { text: "station", value: "station", align: "center" },
        { text: "title", value: "title", align: "center", width: 320 },
        { text: "recommend", value: "recommend", align: "center" },
    ];

    private animes = [];

    private selectedAnimes: anime[] = [];

    private year: number | null = null;

    private season: string | null = null;

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

    private async showAnimes() {
        this.clearMsgs();
        this.loading = true;
        let url = "/api/animes";

        if (this.year) {
            url = `${url}/${this.year}`;
            if (this.season) url = `${url}/${this.season}`;
        }

        try {
            const response = await $axios.$get(url);
            this.animes = response.animes;
            this.successMsg = `Succeeded to get ${this.animes.length} animes`;
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

    private async updateAnimes() {
        this.clearMsgs();
        this.loading = true;

        try {
            const response = await $axios.$put("/api/animes", { animes: this.selectedAnimes });
            this.successMsg = `Succeeded to update ${response.animes.length} animes`;
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

    private async deleteAnimes() {
        this.clearMsgs();
        this.loading = true;

        try {
            const response = await $axios.$delete("/api/animes", {
                data: { animes: this.selectedAnimes },
            });
            this.successMsg = `Succeeded to delete ${response.animes.length} animes`;
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

.v-data-table::v-deep th,
.v-data-table::v-deep td,
.v-text-field {
    font-size: 0.9rem !important;
}
</style>
