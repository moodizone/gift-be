export async function sleep(duration = 1000) {
  return new Promise((res) => setTimeout(res, duration));
}
