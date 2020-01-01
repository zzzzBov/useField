# `useField` react hook

`useField` is a react hook for managing synchronous field validation alongside state.

`useField` is meant for simple forms with a few fields and limited field validation needs.

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
 * if your fields don't need validation
 * if you need asynchronous field validation
 * if you want to manage validation on complex data structures, such as deeply nested objects, or dynamic collections of field data.

## Installation

```
npm install @zzzzbov/usefield
```

## Usage

```jsx
import React, { useCallback } from 'react'

// Import the useField hook along with any needed validators
import { useField, required } from '@zzzzbov/usefield'

// `useField` can be used within any react control.
// This one is an example login form.
const LogInForm = ({
  // The onSubmit property here is used as an example to externalize the
  // submitted form data. This is done to keep the example brief but is not
  // strictly necessary.
  onSubmit
}) => {
  // Call the `useField` hook passing in as few or as many validators as
  // desired, along with an initial field value. In this case a single required
  // field validator is used.
  const username = useField({
    required
  }, '')

  // `useField` can be called as many times as needed for as many fields as
  // needed. While this makes managing data very straightforward, it may be too
  // verbose for complex forms that have more than a handful of fields.
  const password = useField({
    required
  }, '')

  // Set up a callback for the form submission
  const internalSubmit = useCallback((e) => {
    e.preventDefault()

    // Mark the fields as dirty since the fields might not have been edited yet
    username.touch()
    password.touch()

    // Check that the fields are valid.
    // Use the `valid` properties and NOT the `error` helpers as the error
    // helpers will return false if the fields are clean.
    if (username.valid && password.valid) {
      // Handle the form submission behavior.
      // This example uses an onSubmit property to keep things simple.
      onSubmit(username.value, password.value)
    }
  }, [username, password])

  return (
    <form
      method='POST'

      // Bind the submit callback on the form to take advantage of native form
      // submission behaviors, such as implicit form submission.
      onSubmit={internalSubmit}>
      <h1>Log In</h1>
      <div>
        <label for='username'>Username:</label>
        {/*
          Display an error message to the user.
          
          If multiple validators are used, it may be desirable to check each
          validator explicitly, such as:

          { username.dirty && !username.validation.required && (
            <p>Username is required</p>
          ) }

          Alternatively, validator-specific messages may be left visible so
          that their current state is visibly toggled as the user changes the
          field value:

          <p>
            { username.validation.required ? '☑ ' : '☐ ' }
            Username is required
          </p>
         */}
        { username.error && (
          <p id='username-error'>Username is required</p>
        ) }
        <input
          // The `error` property can be used to visually indicate an issue to 
          // the user such as by toggling a class.
          className={username.error ? 'error' : ''}
          id='username'
          name='u'
          text='text'
          aria-describedby='username-error'

          // Pass the current value to the field
          value={username.value}

          // Bind the `set()` method to the field.
          // Some extra boilerplate is used to access the current field value.
          // If the field should be marked as dirty, call touch as well:
          //
          // onChange={e => {
          //   username.set(e.target.value)
          //   username.touch()
          // }}
          onChange={e => username.set(e.target.value)}

          // `touch()` is bound to the blur handler so that the field is flagged
          // as dirty only after the user has finished editing the field.
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
      {/*
        A single submit button is used here to submit the form.
        If a reset button is also desirable, it may be added, and an `onReset`
        handler should be added to the <form> to reset the fields:

        onReset={() => {
          username.reset()
          password.reset()
        }}
      */}
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

> **Warning**:
> 
> Do not use the `error` property for checking field validation in a form submit handler, as the fields may not have been considered `dirty` when the submission event occurs.

The `error` helper property indicates whether the field is [`dirty`][] and not [`valid`][]. This helper is meant to be used to indicate to a user that the field has an issue that should be fixed.

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