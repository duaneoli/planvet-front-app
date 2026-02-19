export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const delayWithRace = async (ms: number, promise: Promise<any>) => {
  await Promise.race([delay(ms), promise]);
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};
