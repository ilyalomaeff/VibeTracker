import { Mood } from "./mood";

export type History = Array<HistoryItem>;

export interface HistoryItem {
    mood: Mood;
    note: string | null;
    date: string;
}
