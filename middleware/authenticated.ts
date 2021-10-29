import { Context, Middleware } from "@nuxt/types";
import { AuthStore } from "@/store";
import { $axios } from "@/utils/api";

const authenticated: Middleware = async ({ redirect }: Context) => {
    const auth = await AuthStore.load();
    if (!auth) return redirect("/");

    try {
        await $axios.$get(`/api`);
    } catch (error: any) {
        AuthStore.destroy();
        return redirect("/");
    }
};

export default authenticated;
