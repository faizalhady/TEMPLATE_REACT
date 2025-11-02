// Unified development logger
export const devLog = (context: string, ...args: unknown[]) => {
  if (import.meta.env.MODE !== "development") return;

  const timestamp = new Date().toISOString().split("T")[1].split(".")[0]; // HH:MM:SS
  console.log(
    `%c[${timestamp}] [${context}]`,
    "color:#22c55e; font-weight:bold;",
    ...args
  );
};
