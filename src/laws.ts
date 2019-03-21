import { Setoid } from 'fp-ts/lib/Setoid'
import { Functor } from 'fp-ts/lib/Functor'
import { HKT } from 'fp-ts/lib/HKT'
import { Function1 } from 'fp-ts/lib/function'
import { Apply } from 'fp-ts/lib/Apply'
import { Chain } from 'fp-ts/lib/Chain'
import { Applicative } from 'fp-ts/lib/Applicative'
import { Monad } from 'fp-ts/lib/Monad'
import { Ord } from 'fp-ts/lib/Ord'
import { Semigroup } from 'fp-ts/lib/Semigroup'
import { Monoid } from 'fp-ts/lib/Monoid'
import { Semiring } from 'fp-ts/lib/Semiring'
import { Ring } from 'fp-ts/lib/Ring'
import { Field } from 'fp-ts/lib/Field'

export const setoid = {
  reflexivity: <A>(S: Setoid<A>) => (a: A) => S.equals(a, a),
  simmetry: <A>(S: Setoid<A>) => (a: A, b: A) => S.equals(a, b) === S.equals(b, a),
  transitivity: <A>(S: Setoid<A>) => (a: A, b: A, c: A) =>
    (S.equals(a, b) && S.equals(b, c)) === (S.equals(a, b) && S.equals(a, c))
}

export const ord = {
  totality: <A>(O: Ord<A>) => (a: A, b: A) => O.compare(a, b) <= 0 || O.compare(b, a) <= 0,
  reflexivity: <A>(O: Ord<A>) => (a: A) => O.compare(a, a) <= 0,
  antisimmetry: <A>(O: Ord<A>) => (a: A, b: A) => (O.compare(a, b) <= 0 && O.compare(b, a) <= 0) === O.equals(a, b),
  transitivity: <A>(O: Ord<A>) => (a: A, b: A, c: A) =>
    !(O.compare(a, b) <= 0 && O.compare(b, c) <= 0) || O.compare(a, c) <= 0
}

export const semigroup = {
  associativity: <A>(S: Semigroup<A>, Eq: Setoid<A>) => (a: A, b: A, c: A) =>
    Eq.equals(S.concat(S.concat(a, b), c), S.concat(a, S.concat(b, c)))
}

export const monoid = {
  rightIdentity: <A>(M: Monoid<A>, Eq: Setoid<A>) => (a: A) => Eq.equals(M.concat(a, M.empty), a),
  leftIdentity: <A>(M: Monoid<A>, Eq: Setoid<A>) => (a: A) => Eq.equals(M.concat(M.empty, a), a)
}

const allEquals = <A>(S: Setoid<A>) => (a: A, ...as: Array<A>): boolean => {
  return as.every(item => S.equals(item, a))
}

export const semiring = {
  addAssociativity: <A>(S: Semiring<A>, Eq: Setoid<A>) => (a: A, b: A, c: A) =>
    Eq.equals(S.add(S.add(a, b), c), S.add(a, S.add(b, c))),
  addIdentity: <A>(S: Semiring<A>, Eq: Setoid<A>) => (a: A) => allEquals(Eq)(a, S.add(a, S.zero), S.add(S.zero, a)),
  commutativity: <A>(S: Semiring<A>, Eq: Setoid<A>) => (a: A, b: A) => Eq.equals(S.add(a, b), S.add(b, a)),
  mulAssociativity: <A>(S: Semiring<A>, Eq: Setoid<A>) => (a: A, b: A, c: A) =>
    Eq.equals(S.mul(S.mul(a, b), c), S.mul(a, S.mul(b, c))),
  mulIdentity: <A>(S: Semiring<A>, Eq: Setoid<A>) => (a: A) => allEquals(Eq)(a, S.mul(a, S.one), S.mul(S.one, a)),
  leftDistributivity: <A>(S: Semiring<A>, Eq: Setoid<A>) => (a: A, b: A, c: A) =>
    Eq.equals(S.mul(a, S.add(b, c)), S.add(S.mul(a, b), S.mul(a, c))),
  rightDistributivity: <A>(S: Semiring<A>, Eq: Setoid<A>) => (a: A, b: A, c: A) =>
    Eq.equals(S.mul(S.add(a, b), c), S.add(S.mul(a, c), S.mul(b, c))),
  annihilation: <A>(S: Semiring<A>, Eq: Setoid<A>) => (a: A) =>
    allEquals(Eq)(S.zero, S.mul(a, S.zero), S.mul(S.zero, a))
}

export const ring = {
  additiveInverse: <A>(R: Ring<A>, Eq: Setoid<A>) => (a: A) =>
    allEquals(Eq)(R.sub(a, a), R.add(R.sub(R.zero, a), a), R.zero)
}

export const field = {
  commutativity: <A>(F: Field<A>, S: Setoid<A>) => (a: A, b: A) => S.equals(F.mul(a, b), F.mul(b, a)),
  integralDomain: <A>(F: Field<A>, S: Setoid<A>) => (a: A, b: A) =>
    S.equals(a, F.zero) || S.equals(b, F.zero) || !S.equals(F.mul(a, b), F.zero),
  nonNegativity: <A>(F: Field<A>, S: Setoid<A>) => (a: A) => S.equals(a, F.zero) || F.degree(a) >= 0,
  quotient: <A>(F: Field<A>, S: Setoid<A>) => (a: A, b: A) => {
    const q = F.div(a, b)
    const r = F.mod(a, b)
    return S.equals(b, F.zero) || S.equals(a, F.add(F.mul(q, b), r))
  },
  reminder: <A>(F: Field<A>, S: Setoid<A>) => (a: A, b: A) => {
    const r = F.mod(a, b)
    return S.equals(b, F.zero) || S.equals(r, F.zero) || F.degree(a) <= F.degree(b)
  },
  submultiplicative: <A>(F: Field<A>, S: Setoid<A>) => (a: A, b: A) =>
    S.equals(a, F.zero) || S.equals(b, F.zero) || F.degree(a) <= F.degree(F.mul(a, b)),
  inverse: <A>(F: Field<A>, S: Setoid<A>) => (a: A) => {
    const i = F.div(F.one, a)
    return S.equals(a, F.zero) || allEquals(S)(F.one, F.mul(i, a), F.mul(a, i))
  }
}

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
  leftIdentity: <M, A, B>(M: Monad<M>, S: Setoid<HKT<M, B>>, afb: Function1<A, HKT<M, B>>) => (a: A) =>
    S.equals(M.chain(M.of(a), afb), afb(a)),
  rightIdentity: <M, A>(M: Monad<M>, S: Setoid<HKT<M, A>>) => (fa: HKT<M, A>) => S.equals(M.chain(fa, M.of), fa),
  derivedMap: <M, A, B>(M: Monad<M>, S: Setoid<HKT<M, B>>, ab: Function1<A, B>) => (fa: HKT<M, A>) =>
    S.equals(M.map(fa, ab), M.chain(fa, a => M.of(ab(a))))
}
