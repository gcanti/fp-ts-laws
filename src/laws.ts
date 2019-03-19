import { Setoid } from 'fp-ts/lib/Setoid'
import { Functor } from 'fp-ts/lib/Functor'
import { HKT } from 'fp-ts/lib/HKT'
import { Function1 } from 'fp-ts/lib/function'
import { Apply } from 'fp-ts/lib/Apply'
import { Chain } from 'fp-ts/lib/Chain'
import { Applicative } from 'fp-ts/lib/Applicative'
import { Monad } from 'fp-ts/lib/Monad'

export const functor = {
  identity: <F, A>(F: Functor<F>, S: Setoid<HKT<F, A>>) => (fa: HKT<F, A>) => S.equals(F.map(fa, a => a), fa),
  composition: <F, A, B, C>(F: Functor<F>, S: Setoid<HKT<F, C>>, ab: Function1<A, B>, bc: Function1<B, C>) => (
    fa: HKT<F, A>
  ) => S.equals(F.map(fa, a => bc(ab(a))), F.map(F.map(fa, ab), bc))
}

export const apply = {
  associativeComposition: <F, A, B, C>(F: Apply<F>, S: Setoid<HKT<F, C>>) => (
    fa: HKT<F, A>,
    fab: HKT<F, Function1<A, B>>,
    fbc: HKT<F, Function1<B, C>>
  ) =>
    S.equals(
      F.ap(F.ap(F.map(fbc, bc => (ab: Function1<A, B>) => (a: A) => bc(ab(a))), fab), fa),
      F.ap(fbc, F.ap(fab, fa))
    )
}

export const applicative = {
  identity: <F, A>(F: Applicative<F>, S: Setoid<HKT<F, A>>) => (fa: HKT<F, A>) =>
    S.equals(F.ap(F.of((a: A) => a), fa), fa),
  homomorphism: <F, A, B>(F: Applicative<F>, S: Setoid<HKT<F, B>>, ab: Function1<A, B>) => (a: A) =>
    S.equals(F.ap(F.of(ab), F.of(a)), F.of(ab(a))),
  interchange: <F, A, B>(F: Applicative<F>, S: Setoid<HKT<F, B>>) => (a: A, fab: HKT<F, Function1<A, B>>) =>
    S.equals(F.ap(fab, F.of(a)), F.ap(F.of((ab: Function1<A, B>) => ab(a)), fab)),
  derivedMap: <F, A, B>(F: Applicative<F>, S: Setoid<HKT<F, B>>, ab: Function1<A, B>) => (fa: HKT<F, A>) =>
    S.equals(F.map(fa, ab), F.ap(F.of(ab), fa))
}

export const chain = {
  associativity: <F, A, B, C>(
    F: Chain<F>,
    S: Setoid<HKT<F, C>>,
    afb: Function1<A, HKT<F, B>>,
    bfc: Function1<B, HKT<F, C>>
  ) => (fa: HKT<F, A>) => S.equals(F.chain(F.chain(fa, afb), bfc), F.chain(fa, a => F.chain(afb(a), bfc))),
  derivedAp: <F, A, B>(F: Chain<F>, S: Setoid<HKT<F, B>>, fab: HKT<F, Function1<A, B>>) => (fa: HKT<F, A>) =>
    S.equals(F.ap(fab, fa), F.chain(fab, f => F.map(fa, f)))
}

export const monad = {
  leftIdentity: <F, A, B>(F: Monad<F>, S: Setoid<HKT<F, B>>, afb: Function1<A, HKT<F, B>>) => (a: A) =>
    S.equals(F.chain(F.of(a), afb), afb(a)),
  rightIdentity: <F, A>(F: Monad<F>, S: Setoid<HKT<F, A>>) => (fa: HKT<F, A>) => S.equals(F.chain(fa, F.of), fa),
  derivedMap: <F, A, B>(F: Monad<F>, S: Setoid<HKT<F, B>>, ab: Function1<A, B>) => (fa: HKT<F, A>) =>
    S.equals(F.map(fa, ab), F.chain(fa, a => F.of(ab(a))))
}
