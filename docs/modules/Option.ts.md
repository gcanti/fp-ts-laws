---
title: Option.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getOptions (function)](#getoptions-function)
- [getSomes (function)](#getsomes-function)

---

# getOptions (function)

Returns an `Arbitrary` that yelds both `some`s and `none`s

**Signature**

```ts
export function getOptions<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Option<A>> { ... }
```

Added in v0.0.2

# getSomes (function)

Returns an `Arbitrary` that yelds only `some`s

**Signature**

```ts
export function getSomes<A>(arb: fc.Arbitrary<A>): fc.Arbitrary<Option<A>> { ... }
```

Added in v0.0.2
