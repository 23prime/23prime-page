<template>
    <v-app dark>
        <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
        </h1>

        <h1 v-else>
            {{ otherError }}
        </h1>

        <nuxt-link to="/">Home</nuxt-link>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({ components: {} })
export default class Error extends Vue {
    public static layout = "error";

    private pageNotFound = "404 Not Found";
    private otherError = "An error occurred";

    @Prop({ default: null })
    error!: {
        statusCode: number;
    };

    head() {
        const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
        return { title };
    }
}
</script>
