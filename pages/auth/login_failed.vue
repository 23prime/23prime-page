<template>
    <div>login failed</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    layout: "error",
    components: {},
})
export default class LoginFailed extends Vue {}
</script>
