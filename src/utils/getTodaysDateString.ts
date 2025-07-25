export const getTodaysDateString = (): string => {
    return new Date().toISOString().split("T")[0];
};
