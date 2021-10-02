<template>
    <nuxt-link :to="link">
        <v-list-item link>
            <v-list-item-action>
                <v-icon>{{ icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </nuxt-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
    components: {},
})
export default class LinkMenu extends Vue {
    @Prop({ default: "" })
    icon: string = "";

    @Prop({ default: "" })
    title: string = "";

    @Prop({ default: "/" })
    link: string = "";
}
</script>

<style lang="scss" scoped>
a {
    // Force kill 'a:-webkit-any-link'
    text-decoration: none;
}
</style>
