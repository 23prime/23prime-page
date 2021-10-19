import { Context, Middleware } from "@nuxt/types";
import { AuthStore } from "@/store";

const authenticated: Middleware = async ({ redirect }: Context) => {
    const auth = await AuthStore.load();
    if (!auth) return redirect("/");
};

export default authenticated;
