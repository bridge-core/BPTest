import { IDisposable } from '../types/disposable';
export declare function trigger(event: string, ...data: unknown[]): Promise<unknown[] | undefined>;
export declare function on(event: string, cb: (...data: unknown[]) => void): IDisposable;
export declare function once(event: string, cb: (...data: unknown[]) => void): void;
