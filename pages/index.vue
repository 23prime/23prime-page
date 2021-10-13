<template>
    <v-container class="container">
        <mq-layout mq="sm" class="sm">
            <v-row justify="center" align-content="center" class="icon">
                <img src="/images/23.png" class="icon" />
            </v-row>

            <v-row justify="center" align-content="start">
                <v-col>Miku Okegawa (1994-)</v-col>
            </v-row>
        </mq-layout>

        <mq-layout mq="lg" class="lg">
            <v-row align-content="center" class="icon">
                <img src="/images/23.png" />
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
export default class Home extends Vue {
    head() {
        return {
            title: "Home",
        };
    }
}
</script>

<style lang="scss" scoped>
@mixin content() {
    height: 80vh;
    padding-bottom: 3rem;
}

@mixin row() {
    margin: 0;
    max-width: 100%;
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

@mixin iconCol($width, $horizontal) {
    height: 400px;
    width: 400px;
    max-width: $width;
    object-fit: contain;
    text-align: $horizontal;
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
                @include iconCol(100%, center);
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
                @include iconCol(50%, right);

                img {
                    width: 60%;
                }
            }
        }

        .icon {
            @include iconRow();
        }
    }
}
</style>
