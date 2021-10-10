<template>
    <div>loading...</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { AuthStore } from "@/store";

@Component({ components: {} })
export default class AfterLogin extends Vue {
    mounted() {
        const query = this.$route.query;
        const id = this.queryToString(query.id);
        const name = this.queryToString(query.name);
        const token = this.queryToString(query.access_token);

        if (id && name && token) {
            const auth = { id, name, token };
            AuthStore.save(auth);
            this.$router.push("/");
        } else {
            this.$router.push("/auth/login_failed");
        }
    }

    private queryToString(value: string | (string | null)[] | undefined): string | null {
        if (Array.isArray(value)) return value[0] ? value[0] : null;
        return value || null;
    }
}
</script>
