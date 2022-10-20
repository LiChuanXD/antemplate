# Table of Content

- [Table of Content](#table-of-content)
- [Folder Structures](#folder-structures)
  - [assets](#assets)
  - [components](#components)
  - [configs](#configs)
  - [pages](#pages)
  - [redux](#redux)
  - [services](#services)
  - [utils](#utils)
- [Tests](#tests)
- [Todo:](#todo)

# Folder Structures

## assets

To store all the static assets in this folder, example

1. images
2. logos
3. fonts

## components

To store all the small reusable components to be used in Pages  
Pre-built in components

1. [Auth Form](./src/components/forms/AuthForm.js)
   1. [Register Form](./src/components/forms/RegisterForm.js)
   2. Login Form
   3. Verification Form
2. [Error Popup Modal](./src/components/modals/ErrorPopup.js)

## configs

To store all your json/js config file

## pages

To store your app pages

## redux

To store all redux related codes like:

1. Redux Store
2. Redux Slices (action, reducers)
3. Async Thunk

## services

To store all your APi services

## utils

To store all helper functions and etc

# Tests

In every component folder will have a \_\_test\_\_ folder to hold all the test file for each of the components.

# Todo:

- [ ] To pass name input label as props (register form)
- [ ] To show name input field as props (register form)
- [ ] To pass name input placeholder as props (register form)
- [ ] To pass name input is required as props (register form)
- [ ] To pass email input label as props (register form)
- [ ] To show email input field as props (register form)
- [ ] To pass email input placeholder as props (register form)
- [ ] To pass email input is required as props (register form)
- [ ] To pass phone number input label as props (register form)
- [ ] To show phone number input field as props (register form)
- [ ] To pass phone number input placeholder as props (register form)
- [ ] To pass phone number input is required as props (register form)
- [ ] To pass submit button text as props (register form)
- [ ] To pass checkboxes as props (agree to terms and conditions / policy) (register form)
- [ ] To update test conditions according to the list above
- [ ] To change ant design form layout (vertical, horizontal, inline)
- [ ] Login Form
- [ ] Verification Form
