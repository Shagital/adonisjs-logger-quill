## Registering provider

Make sure to register the provider inside `start/app.js` file.

```js
const providers = [
  '@shagital/adonisjs-logger-quill/providers/QuillProvider'
]
```

Add new configuration inside `logger` module in `config/app.js`:
```js
quill: {
    name: Env.get('APP_NAME', 'adonis-app'),
    driver: 'quill',
    webhookUrl: Env.get('QUILL_WEBHOOK_URL'),
    level: 'info',
}
```

That's it! Now you can use Logger that will send data to Quill.

```js
const Logger = use('Logger')

Logger.info('Test message')
Logger.transport('quill').info('Test message')

```

## Env variables

`Quill` driver relies on single Env variable: `QUILL_WEBHOOK_URL=`.
