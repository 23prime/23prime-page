<template>
    <v-container>
        <v-row>都内のしがないプログラマー。</v-row>
        <v-row>VTuber を好んで見る。たまにホルンを吹く。</v-row>

        <table>
            <tr>
                <th>すきなぱそこん</th>
                <td>ThinkPad</td>
            </tr>

            <tr>
                <th>すきなおーえす</th>
                <td>Arch Linux</td>
            </tr>

            <tr>
                <th>すきなえでぃた</th>
                <td>Emacs, VSCode</td>
            </tr>

            <tr>
                <th>すきなげんご</th>
                <td>日本語、Rust、Haskell、Ruby</td>
            </tr>

            <tr>
                <th>すきなほるん</th>
                <td>YAMAHA YHR-867KRD</td>
            </tr>

            <tr>
                <th>すきなさっきょくか</th>
                <td>ブルックナー、ヴォーン・ウィリアムズ</td>
            </tr>

            <tr>
                <th>すきならーめん</th>
                <td>明神角ふじ</td>
            </tr>
        </table>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class Profiles extends Vue {}
</script>

<style lang="scss" scoped>
@mixin th($width) {
    font-weight: normal;
    background: #181818;
    vertical-align: middle;
    padding: 1rem;
    width: $width;
}

table {
    margin: 3.5rem 0;
    width: 100%;

    th {
        font-weight: normal;
        background: #181818;
        vertical-align: middle;
        padding: 1rem;
    }

    td {
        padding: 0.75rem 1rem 1.75rem;
    }

    th,
    td {
        padding: 1.25rem;
    }

    @media (max-width: 767px) {
        th,
        td {
            display: block;
        }
    }
}
</style>
