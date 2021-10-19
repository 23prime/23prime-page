<template>
    <tr>
        <th>{{ header }}</th>
        <td v-if="url">
            <v-btn class="v-btn-overwrite" text @click="openLinkInNewTab(link)">{{ data }}</v-btn>
        </td>
        <td v-else>{{ data }}</td>
    </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class ListTableItem extends Vue {
    @Prop({ default: "" })
    header!: string;

    @Prop({ default: "" })
    data!: string;

    @Prop({ default: null })
    url!: string;

    openLinkInNewTab() {
        window.open(this.url, "_blank");
    }
}
</script>

<style lang="scss" scoped>
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
</style>
