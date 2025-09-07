import api from "$lib/utils/apis/api";
import type IUser from "../auth/IUser";

export default class Search {

    public static async userSearch(query: string): Promise<IUser[]> {
        const res = await api.get(`auth/search?username=${query}`);
        return res.data as IUser[];
    }

}