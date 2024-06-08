export class Benchmark {
  static Performance(
    meta: {},
    action: (...args: any[]) => any,
    ...args: any[]
  ): any {
    const start = performance.now();
    const result = action(...args);
    const end = performance.now();
    setSpecProperty("performance", { ...meta, time: end - start });
    return result;
  }

  static Memory(
    meta: {},
    action: (...args: any[]) => any,
    ...args: any[]
  ): any {
    const start = (performance as any).memory.usedJSHeapSize;
    const result = action(...args);
    const end = (performance as any).memory.usedJSHeapSize;
    setSpecProperty("memory", { ...meta, size: end - start });
    return result;
  }
}
