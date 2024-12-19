import { AsyncLocalStorage } from "async_hooks";

class Helpers {
    static localhost: string = 'localhost:8000';
    static server: string = '1.2.3.4.5:8000';
    static basePath: string = `http://${this.localhost}`;
    static apiUrl: string = `${this.basePath}/api/`;
    static imageUrl: string = `${this.basePath}`;
    static authUser: Record<string, any> = JSON.parse(localStorage.getItem('user') || '{}') || {};
    static serverImage = (name: string): string => {
        return `${this.basePath}/uploads/${name}`;
    };
    static authHeaders: { headers: { "Content-Type": string, "access_token": string | null } } = {
        headers: {
            "Content-Type": 'application/json',
            "access_token": localStorage.getItem("access_token"),
        },
    };
    static authFileHeaders: { headers: { "Content-Type": string, "access_token": string | null } } = {
        headers: {
            "Content-Type": 'multipart/form-data',
            "access_token": localStorage.getItem("access_token"),
        },
    };
}

export default Helpers;
