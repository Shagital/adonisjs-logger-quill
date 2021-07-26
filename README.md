# Adonis Logger Quill <img src="https://pbs.twimg.com/profile_images/1364222827201581059/_MwGJ_wl_400x400.png" alt="Quill icon" width="25px" height="25px">
![npm](https://img.shields.io/npm/dt/@shagital/adonisjs-logger-quill?style=plastic)
![npm (scoped)](https://img.shields.io/npm/v/@shagital/adonisjs-logger-quill)
![NPM](https://img.shields.io/npm/l/@shagital/adonisjs-logger-quill)

Version [for **Adonis v4**]

This service provider adds [Quill](https://docs.quill.chat/docs/specification) as a driver to [Adonis Logger](https://adonisjs.com/docs/4.1/logger).

This repo is based from https://github.com/pirmax/adonis-logger-rollbar


## Usage
## Installation
- You can install the package via NPM:
`npm install @shagital/adonisjs-logger-quill`
- Or with yarn:
`yarn add @shagital/adonisjs-logger-quill`
- Or with adonis:
`adonis install @shagital/adonisjs-logger-quill`

### Registering provider

Make sure to register the provider inside `start/app.js` file.

```js
const providers = [
  '@shagital/adonisjs-logger-quill/providers/QuillProvider'
]
```

Add new configuration inside `logger` module in `config/app.js`:
```js
transport: 'quill'

/*
      |--------------------------------------------------------------------------
     | Quill Transport
     |--------------------------------------------------------------------------
     |
     | Quill transport uses axios to send log data to quill channel
     |
     |
     |
     */
    quill: {
      name: Env.get('APP_NAME', 'adonis-app'),
      driver: 'quill',
      webhookUrl: Env.get('QUILL_WEBHOOK_URL'),
      level: 'info',
      appStart: false, // whether to create log when app is starting,
      logEnv: false // should send env variables
    }
```

That's it! Now you can use Logger that will send data to Rollbar.

```js
const Logger = use('Logger')

Logger.info('Test message')
Logger.info('Test message', {user}) // to log extra details
Logger.transport('quill').info('this will log using the quill transport') // to specify the transport manually

```

### Env variables

`Quill` driver relies on single Env variable: `QUILL_WEBHOOK_URL=`.


