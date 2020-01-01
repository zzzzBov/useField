# `useField` react hook

`useField` is a react hook for managing synchronous field validation alongside state.

It's meant for simple forms with a few fields and limited field validation needs.

## Contents

 * [When _not_ to `useField`][when-not]
 * [Installation][]
 * [Usage][]
 * [API][]
    * [`useField(validators, initialValue)`][useField]
       * [`validators`][]
       * [`initialValue`][]
       * [Return value][]
          * [`clean()`][]
          * [`dirty`][]
          * [`error`][]
          * [`reset()`][]
          * [`set(value)`][]
          * [`touch()`][]
          * [`valid`][]
          * [`validation`][]
          * [`value`][]
    * [Built-in validators][]
       * [`matches(regex)`][matches]
       * [`maxLength(length)`][maxLength]
       * [`minLength(length)`][minLength]
       * [`required`][required]

## When _not_ to `useField`

 * if your form has more than ~7 fields
 * if you need asynchronous field validation
 * if you want to manage validation on complex data structures

## Installation

```
npm install @zzzzbov/usefield
```

## Usage

```jsx
import React, { useCallback } from 'react'
import { useField, required } from '@zzzzbov/usefield'

const form = ({
  onSubmit
}) => {
  const username = useField({
    required
  }, '')

  const password = useField({
    required
  }, '')

  const internalSubmit = useCallback((e) => {
    e.preventDefault()

    username.touch()
    password.touch()

    if (username.valid && password.valid) {
      onSubmit(username.value, password.value)
    }
  }, [username, password])

  return (
    <form onSubmit={internalSubmit} method='POST'>
      <h1>Log In</h1>
      <div>
        <label for='username'>Username:</label>
        { username.error && (
          <p id='username-error'>Username is required</p>
        ) }
        <input
          className={username.error ? 'error' : ''}
          id='username'
          name='u'
          text='text'
          aria-describedby='username-error'
          value={username.value}
          onChange={e => username.set(e.target.value)}
          onBlur={username.touch}
        />
      </div>
      <div>
        <label for='password'>Password:</label>
        { password.error && (
          <p id='password-error'>Password is required</p>
        ) }
        <input
          className={password.error ? 'error' : ''}
          id='password'
          name='p'
          text='password'
          aria-describedby='password-error'
          value={password.value}
          onChange={e => password.set(e.target.value)}
          onBlur={password.touch}
        />
      </div>
      <input
        type='submit'
        value='Log In'
      />
    </form>
  )
}
```

## API

### `useField(validators, initialValue)`

The `useField` hook accepts a map of validators and an initial value and returns an object with the current value, utility methods, and validation state.

#### `validators`

The `validators` parameter is an object of functions to validate the field.

Each validator takes a single parameter of the current value, and should return `true` when the provided value is valid, and `false` when the provided value is invalid.

#### `initialValue`

The `initialValue` parameter specifies the initial value for the field before any user interaction occurs. While the primary use-case for `useField` is for string values, any type may be used.

#### Return value

`useField` returns an object with the following members:

##### `clean()`

The `clean` method marks the field as having been cleaned, which sets the [`dirty`][] property to `false`, but does not otherwise change the current value.

See also: [`dirty`][], [`reset()`][], and [`touch()`][]

##### `dirty`

Type: boolean  
Default: `false`

The `dirty` property indicates whether the user has interacted with the field for purposes of displaying validation.

See also: [`clean()`][], [`error`][], [`reset()`][], and [`touch()`][]

##### `error`

Type: boolean

The `error` property indicates whether the field is [`dirty`][] and not [`valid`][].

See also: [`dirty`][], and [`valid`][]

##### `reset()`

The `reset` method sets the [`value`][] property back to the originally provided [`initialValue`][] and cleans the field (i.e. sets [`dirty`][] to `false`).

See also: [`clean()`][], [`dirty`][], [`set(value)`][], [`touch()`][], and [`value`][]

##### `set(value)`

The `set` method sets the [`value`][] property. It does _not_ mark the field as [`dirty`][] so that displaying validation may be delayed until a user is done with the given field.

See also: [`reset()`][], and [`value`][]

##### `touch()`

The `touch` method marks the field as [`dirty`][], and does not change the field [`value`][].

See also: [`clean()`][], [`dirty`][], and [`reset()`][]

##### `valid`

Type: boolean

The `valid` property indicates whether all of the provided [`validators`][] are currently valid.

See also: [`validators`][]

##### `validation`

Type: object

The `validation` property is an object of the results from each of the provided `validators`.

```jsx
const example = useField({
  numeric (value) {
    return !isNaN(value)
  }
}, '')

example.validation.numeric
// after example.set('123') becomes true
// after example.set('abc') becomes false
```

See also: [`validation`][]

##### `value`

The `value` property is the currently assigned field value.

See also: [`initialValue`][], [`reset()`][], and [`set(value)`][]

### Built-in validators

`useField` comes with a few built-in validator utilities which can be passed to the [`validators`][] parameter of `useField`.

#### `matches(regex)`

`matches` creates a validator function to match the current `value` against a provided regular expression.

Usage:

```jsx
import { useField, matches } from '@zzzzbov/usefield'

...

const example = useField({
  lowercase: matches(/a-z/),
  uppercase: matches(/A-Z/)
}, '')

example.validation.lowercase // false until the example field has a value that contains a lower case character

example.validation.uppercase // false until the example field has a value that contains an upper case character
```

#### `maxLength(length)`

`maxLength` creates a validator function to verify that the current `value` is no longer than the provided length.

Usage:

```jsx
import { useField, maxLength } from '@zzzzbov/usefield'

...

const example = useField({
  max: maxLength(20)
}, '')

example.validation.max // true until the example field has a value longer than 20 characters
```

#### `minLength(length)`

`minLength` creates a validator function to verify that the current `value` is at least as long as the provided length.

Usage:

```jsx
import { useField, minLength } from '@zzzzbov/usefield'

...

const example = useField({
  min: minLength(5)
}, '')

example.validation.min // false until the example field has a value that's at least 5 characters long
```

#### `required`

`required` is a validator function to verify that the current `value` is truthy (not `0`, `false`, `''`, `NaN`, `null`, or `undefined`).

Usage:

```jsx
import { useField, required } from '@zzzzbov/usefield'

...

const example = useField({
  required
}, '')

example.validation.required // false until the example field has a value
```

[when-not]: #when-not-to-usefield
[Installation]: #installation
[Usage]: #usage
[API]: #api
[useField]: #usefieldvalidators-initialvalue
[`validators`]: #validators
[`initialValue`]: #initialvalue
[Return value]: #return-value
[`clean()`]: #clean
[`dirty`]: #dirty
[`error`]: #error
[`reset()`]: #reset
[`set(value)`]: #setvalue
[`touch()`]: #touch
[`valid`]: #valid
[`validation`]: #validation
[`value`]: #value
[Built-in Validators]: #built-in-validators
[matches]: #matchesregex
[maxLength]: #maxlengthlength
[minLength]: #minlengthlength
[required]: #required