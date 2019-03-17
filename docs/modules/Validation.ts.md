---
title: Validation.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getFailures (function)](#getfailures-function)
- [getSuccesses (function)](#getsuccesses-function)
- [getValidations (function)](#getvalidations-function)

---

# getFailures (function)

Returns an `Arbitrary` that yelds only `failure`s

**Signature**

```ts
export function getFailures<L, A>(arb: fc.Arbitrary<L>): fc.Arbitrary<Validation<L, A>> { ... }
```

Added in v0.0.2

# getSuccesses (function)

Returns an `Arbitrary` that yelds only `success`es

**Signature**

```ts
export function getSuccesses<L, A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Validation<L, A>> { ... }
```

Added in v0.0.2

# getValidations (function)

Returns an `Arbitrary` that yelds both `success`es and `failure`s

**Signature**

```ts
export function getValidations<L, A>(
  failureArb: fc.Arbitrary<L>,
  successArb: fc.Arbitrary<A>
): fc.Arbitrary<Validation<L, A>> { ... }
```

Added in v0.0.2
