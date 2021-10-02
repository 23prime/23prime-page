<template>
    <v-container class="container">
        <mq-layout mq="sm" class="sm">
            <v-row justify="center" align-content="center" class="icon">
                <v-col class="icon" cols="10"></v-col>
            </v-row>

            <v-row justify="center" align-content="start">
                <v-col>Miku Okegawa (1994-)</v-col>
            </v-row>
        </mq-layout>

        <mq-layout mq="lg" class="lg">
            <v-row align-content="center" class="icon">
                <v-col class="icon" cols="7"></v-col>
                <v-col align-self="center" cols="3">Miku Okegawa (1994-)</v-col>
            </v-row>
        </mq-layout>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    components: {},
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
@mixin content() {
    height: 80vh;
    padding-bottom: 3rem;
}

@mixin row() {
    margin: 0;
    width: 100%;
}

@mixin iconRow() {
    height: 100%;
}

@mixin col($width, $paddingTop, $horizontal) {
    width: $width;
    font-size: 1.5rem;
    padding-top: $paddingTop;
    padding-bottom: 0;
    text-align: $horizontal;
}

@mixin iconCol($backgroundSize, $vertical, $horizontal) {
    background-image: url("assets/images/23.png");
    background-size: $backgroundSize;
    background-position: $vertical $horizontal;
    padding-bottom: 0;
}

.container {
    text-align: center;

    .sm {
        @include content();

        .row {
            @include row();

            .col {
                @include col(50%, 0, center);
            }

            .icon {
                @include iconCol(80%, bottom, center);
            }
        }

        .icon {
            @include iconRow();
        }
    }

    .lg {
        @include content();

        .row {
            @include row();

            .col {
                @include col(100%, 10%, left);
            }

            .icon {
                @include iconCol(50%, center, right);
            }
        }

        .icon {
            @include iconRow();
        }
    }
}
</style>
