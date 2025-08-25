test(
  "Deve verificar se o Jest suporta ESM",
  () => {
    expect(typeof import.meta).toBe("object");
  }
);
