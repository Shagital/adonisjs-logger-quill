'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const Quill = require('../drivers/Quill')

class QuillProvider extends ServiceProvider {
  register () {
    this.app.extend('Adonis/Src/Logger', 'quill', () => {
      return new Quill()
    })
  }
}

module.exports = QuillProvider
