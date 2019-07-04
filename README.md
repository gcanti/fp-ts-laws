[fp-ts](https://github.com/gcanti/fp-ts) type class laws for property based testing

Usage of [fast-check](https://github.com/dubzzz/fast-check) is required.

# Example

```ts
import * as laws from 'fp-ts-laws'
import * as fc from 'fast-check'

import { Semigroup } from 'fp-ts/lib/Semigroup'
import { eqString } from 'fp-ts/lib/Eq'

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
