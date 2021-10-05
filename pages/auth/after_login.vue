<template>
    <div>loading...</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    components: {},
})
export default class AfterLogin extends Vue {
    mounted() {
        const auth = this.$route.query;
        this.$nuxt.$store.dispatch("auth/save", auth);
        this.$router.push("/");
    }
}
</script>

<style></style>
