<p align="center">
  <a href="https://github.com/gcanti/fp-ts-laws/actions">
    <img src="https://github.com/gcanti/fp-ts-laws/actions/workflows/main.yml/badge.svg?branch=master" alt="build status" height="20">
  </a>
</p>

[fp-ts](https://github.com/gcanti/fp-ts) type class laws for property based testing

Usage of [fast-check](https://github.com/dubzzz/fast-check) is required.

# Example

```ts
import * as laws from 'fp-ts-laws'
import * as fc from 'fast-check'

import { Semigroup } from 'fp-ts/Semigroup'
import { eqString } from 'fp-ts/Eq'

describe('my semigroup instance', () => {
  it('should test Semigroup laws', () => {
    const semigroupSpace: Semigroup<string> = {
      concat: (x, y) => x + ' ' + y
    }
    laws.semigroup(semigroupSpace, eqString, fc.string())
  })
})
```

For other examples check out the [tests](test/index.ts)
