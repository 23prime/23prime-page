<template>
    <v-container>
        <v-row>都内のしがないプログラマー。</v-row>
        <v-row>VTuber を好んで見る。たまにホルンを吹く。</v-row>

        <table>
            <list-table-item header="すきなぱそこん" data="ThinkPad"></list-table-item>
            <list-table-item header="すきなおーえす" data="Arch Linux"></list-table-item>
            <list-table-item header="すきなえでぃた" data="Emacs, VSCode"></list-table-item>
            <list-table-item
                header="すきなげんご"
                data="日本語、Rust、Haskell、Ruby"
            ></list-table-item>
            <list-table-item header="すきなほるん" data="YAMAHA YHR-867KRD"></list-table-item>
            <list-table-item
                header="すきなさっきょくか"
                data="ブルックナー、ヴォーン・ウィリアムズ"
            ></list-table-item>
            <list-table-item header="すきならーめん" data="明神角ふじ"></list-table-item>
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
export default class Profiles extends Vue {
    head() {
        return {
            title: "Profiles",
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
