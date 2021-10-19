<template>
    <div>
        <h1>Login failed</h1>
        <nuxt-link to="/">Home</nuxt-link>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({ components: {} })
export default class LoginFailed extends Vue {
    private head() {
        return {
            title: this.constructor.name,
        };
    }
}
</script>
