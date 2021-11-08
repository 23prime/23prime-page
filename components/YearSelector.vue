<template>
    <div class="btn-wrapper">
        <v-select v-model="year" :items="years" filled label="year" item-text="state" clearable>
        </v-select>
    </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "nuxt-property-decorator";

@Component({
    components: {},
})
export default class YearSelector extends Vue {
    @PropSync("yearProp", { type: Number })
    private year!: number | null;

    private years: number[] = [];

    mounted() {
        // Set years from 2019 to next year
        const startYear = 2019;
        const nextYear = new Date().getFullYear() + 1;
        this.years = Array(nextYear - startYear + 1)
            .fill(null)
            .map((_, i) => i + startYear);
    }
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
    padding: 0 0.5rem;
}
</style>
