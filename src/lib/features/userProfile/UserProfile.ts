import api from "$lib/utils/apis/api";
import type IUser from "../auth/IUser";
import type IRemoteRepo from "../remote/IRemoteRepo";

export default class UserProfile {

    public user: IUser | null = null;

    constructor() {
    }

    public async reloadUser(username: string) {
        const res = await api.get(`/auth/user/get/${username}`);
        this.user = res.data as IUser;
    }

    public async getUserRepositories() : Promise<IRemoteRepo[]> {

        if(!this.user) throw new Error("User not loaded yet");

        const res = await api.get(`/remote/user/repos/${this.user?.id}`);
        return res.data as IRemoteRepo[];
    }

}
