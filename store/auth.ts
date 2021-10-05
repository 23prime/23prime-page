import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

type Auth = { id: number; token: string } | null;

@Module({
    name: "auth",
    stateFactory: true,
    namespaced: true,
})
export default class AuthModule extends VuexModule {
    private auth!: Auth;

    KEY_NAME = "auth";

    public get getAuth() {
        return this.auth;
    }

    @Mutation
    private setAuth(auth: Auth) {
        this.auth = auth;
    }

    @Mutation
    private clearAuth() {
        this.auth = null;
    }

    @Action({ rawError: true })
    public save(auth: Auth) {
        this.setAuth(auth);
        localStorage.setItem(this.KEY_NAME, JSON.stringify(auth));
    }

    @Action({ rawError: true })
    public load() {
        const item = localStorage.getItem(this.KEY_NAME);
        this.auth = item ? JSON.parse(item) : null;
        return this.auth;
    }

    @Action({ rawError: true })
    public destroy() {
        localStorage.removeItem(this.KEY_NAME);
        this.clearAuth();
    }
}
