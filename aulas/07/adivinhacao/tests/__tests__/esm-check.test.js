test(
  "Check if ESM is enabled",
  () => {
    expect(typeof import.meta).toBe("object");
  }
);
