export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const jitter = () => 200 + Math.random() * 600;
export const maybeFail = () => Math.random() < 0.15;
