<template>
    <v-container>
        <table>
            <list-table-item
                header="Twitter"
                data="@23_prime"
                url="https://twitter.com/23_prime"
            ></list-table-item>

            <list-table-item
                header="Mastodon"
                data="@23_prime"
                url="https://mstdn.jp/@23_prime/"
            ></list-table-item>

            <list-table-item
                header="GitHub"
                data="@23prime"
                url="https://github.com/23prime"
            ></list-table-item>

            <list-table-item
                header="Zenn"
                data="@23prime"
                url="https://zenn.dev/23prime"
            ></list-table-item>

            <list-table-item
                header="Instagram"
                data="@23_prime"
                url="https://www.instagram.com/23_prime/"
            ></list-table-item>

            <list-table-item
                header="YouTube"
                data="桶川みく"
                url="https://www.youtube.com/channel/UCSlHNgtxdnqND70wg-wvsdg"
            ></list-table-item>
        </table>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import ListTableItem from "@/components/ListTableItem.vue";

@Component({
    components: {
        ListTableItem,
    },
})
export default class Links extends Vue {
    private head() {
        return {
            title: "Links",
        };
    }
}
</script>

<style lang="scss" scoped>
table {
    margin: 3.5rem 0;
    width: 100%;
}
</style>
