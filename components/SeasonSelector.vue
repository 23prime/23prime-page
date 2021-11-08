<template>
    <div class="btn-wrapper">
        <v-select
            v-model="season"
            :items="seasons"
            filled
            label="season"
            item-text="state"
            clearable
            :disabled="disabled"
        >
        </v-select>
    </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "nuxt-property-decorator";

@Component({
    components: {},
})
export default class SeasonSelector extends Vue {
    @PropSync("seasonProp", { type: String })
    private season!: string | null;

    @Prop({ default: false })
    private disabled!: boolean;

    private seasons: string[] = ["winter", "spring", "summer", "fall"];
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
    padding: 0 0.5rem;
}
</style>
