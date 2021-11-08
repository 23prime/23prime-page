<template>
    <div class="btn-wrapper">
        <v-select
            v-model="year"
            :items="years"
            filled
            label="year"
            item-text="state"
            clearable
            @change="sendToParent"
        >
        </v-select>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "nuxt-property-decorator";

@Component({
    components: {},
})
export default class StatusBar extends Vue {
    private year: number | null = null;

    private years: number[] = [];

    mounted() {
        // Set years from 2019 to next year
        const startYear = 2019;
        const nextYear = new Date().getFullYear() + 1;
        this.years = Array(nextYear - startYear + 1)
            .fill(null)
            .map((_, i) => i + startYear);
    }

    @Emit()
    private sendToParent() {
        return this.year;
    }
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
    padding: 0 0.5rem;
}
</style>
