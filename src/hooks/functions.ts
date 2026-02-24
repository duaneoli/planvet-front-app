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

export const getNameAndSubname = (name: string) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n.toLowerCase())
    .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
    .join(" ");
};
