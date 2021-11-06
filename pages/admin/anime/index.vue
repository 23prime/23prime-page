<template>
    <v-container>
        <v-alert v-if="failedMsg" type="error" dense dismissible>{{ failedMsg }}</v-alert>
        <v-alert v-if="successMsg" type="success" dense dismissible>{{ successMsg }}</v-alert>
        <v-alert v-if="loading" type="info" dense dismissible>loading...</v-alert>

        <v-row>
            <div class="anime-btn-wrapper">
                <v-btn class="v-btn-overwrite" @click="showAnimes">Show</v-btn>
            </div>

            <div class="anime-btn-wrapper">
                <v-btn class="v-btn-overwrite" @click="clearAnimes">Clear</v-btn>
            </div>

            <div class="anime-btn-wrapper">
                <v-btn
                    class="v-btn-overwrite"
                    :disabled="selectedAnimes.length < 1"
                    @click="updateAnimes"
                >
                    Update
                </v-btn>
            </div>

            <div class="anime-btn-wrapper">
                <v-btn
                    class="v-btn-overwrite"
                    :disabled="selectedAnimes.length < 1"
                    @click="deleteAnimes"
                >
                    Delete
                </v-btn>
            </div>

            <div class="anime-btn-wrapper">
                <nuxt-link to="./anime/new"><v-btn class="v-btn-overwrite">New</v-btn></nuxt-link>
            </div>
        </v-row>

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
                    <v-text-field v-model="item.year" class="v-text-field-overwrite"></v-text-field>
                </template>

                <template #[`item.season`]="{ item }">
                    <v-text-field
                        v-model="item.season"
                        class="v-text-field-overwrite"
                    ></v-text-field>
                </template>

                <template #[`item.day`]="{ item }">
                    <v-text-field v-model="item.day" class="v-text-field-overwrite"></v-text-field>
                </template>

                <template #[`item.time`]="{ item }">
                    <v-text-field v-model="item.time" class="v-text-field-overwrite"></v-text-field>
                </template>

                <template #[`item.station`]="{ item }">
                    <v-text-field
                        v-model="item.station"
                        class="v-text-field-overwrite"
                    ></v-text-field>
                </template>

                <template #[`item.title`]="{ item }">
                    <v-text-field
                        v-model="item.title"
                        class="v-text-field-overwrite"
                    ></v-text-field>
                </template>

                <template #[`item.recommend`]="{ item }">
                    <v-simple-checkbox v-model="item.recommend"></v-simple-checkbox>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { $axios } from "@/utils/api";

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
    components: {},
})
export default class Profiles extends Vue {
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
        try {
            this.clearMsgs();
            this.loading = true;
            const response = await $axios.$get(`/api/animes`);
            this.animes = response.animes;
            this.successMsg = `Succeeded to get ${this.animes.length} animes`;
        } catch (error: any) {
            if (error.response?.status === 401) {
                this.failedMsg = "Failed to call API: Aaccess token is invalid. Please re-login.";
            } else {
                this.failedMsg = "Failed to call API: Please try again.";
            }
        } finally {
            this.loading = false;
        }
    }

    private async updateAnimes() {
        try {
            this.clearMsgs();
            this.loading = true;
            const response = await $axios.$put(`/api/animes`, { animes: this.selectedAnimes });
            this.successMsg = `Succeeded to update ${response.animes.length} animes`;
        } catch (error: any) {
            if (error.response?.status === 401) {
                this.failedMsg = "Failed to call API: Aaccess token is invalid. Please re-login.";
            } else {
                this.failedMsg = "Failed to call API: Please try again.";
            }
        } finally {
            this.loading = false;
        }
    }

    private async deleteAnimes() {
        try {
            this.clearMsgs();
            this.loading = true;
            const response = await $axios.$delete(`/api/animes`, {
                data: { animes: this.selectedAnimes },
            });
            this.successMsg = `Succeeded to delete ${response.animes.length} animes`;
        } catch (error: any) {
            if (error.response?.status === 401) {
                this.failedMsg = "Failed to call API: Aaccess token is invalid. Please re-login.";
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

.anime-btn-wrapper {
    padding: 32px 12px;
}

.v-data-table::v-deep th,
.v-data-table::v-deep td,
.v-text-field-overwrite {
    font-size: 0.9rem !important;
}
</style>
