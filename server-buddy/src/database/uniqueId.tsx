import { sha256 } from 'js-sha256';

export class UniqueId {
    public static generateUniqueId(userName: string): string {
        return sha256(navigator.userAgent + Date.now() + userName).slice(0, 10);
    }
}