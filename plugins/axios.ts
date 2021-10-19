import { Context } from "@nuxt/types";
import { AuthStore } from "@/store";

export default ({ $axios }: Context) => {
    $axios.onRequest(async (config) => {
        const auth = await AuthStore.load();
        const token = auth?.token;
        if (token) config.headers.common.Authorization = `Bearer ${token}`;
        return config;
    });
};
