export class Memory {
  read() {
    throw new Error("value() method must be implemented.");
  }

  write(value) {
    throw new Error("write() method must be implemented.");
  }
}

export class Value extends Memory {
  #memory;

  constructor(data) {
    super();
    this.#memory = [data];
    Object.freeze(this);
  }

  read() {
    return this.#memory.at(0);
  }

  write(data) {
    const old = this.#memory.shift();
    this.#memory.push(data);
    return old;
  }
}

export class Cached extends Memory {
  #cache;
  #once;

  constructor(func) {
    super();
    this.#cache = [];
    this.#once = (...args) => {
      if (this.#cache.length === 0) {
        const result = func(...args);
        this.#cache.push(result);
      }
      return this.#cache.at(0);
    };
    Object.freeze(this);
  }

  read() {
    return this.#once();
  }

  write(data) {
    const old = this.#once();
    this.#cache.shift();
    this.#cache.push(data);
    return old;
  }
}
