<template>
    <div>
        <v-alert v-if="failedMsg" type="error" dense dismissible>{{ failedMsg }}</v-alert>
        <v-alert v-if="successMsg" type="success" dense dismissible>{{ successMsg }}</v-alert>
        <v-alert v-if="loading" type="info" dense dismissible>loading...</v-alert>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
    components: {},
})
export default class StatusBar extends Vue {
    @Prop({ default: null })
    private failedMsg!: string;

    @Prop({ default: null })
    private successMsg!: string;

    @Prop({ default: false })
    private loading!: boolean;
}
</script>
