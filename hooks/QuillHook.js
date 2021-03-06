'use strict';

const Transport = require('winston-transport');
const axios = require('axios').default;

module.exports = class QuillHook extends Transport {
  constructor(opts) {
    super(opts);

    opts = opts || {};

    this.name = opts.name || 'QuillWebhook';
    this.level = opts.level || undefined;
    this.webhookUrl = opts.webhookUrl;
    this.formatter = opts.formatter || undefined;
    this.unfurlLinks = opts.unfurlLinks || false;
    this.unfurlMedia = opts.unfurlMedia || false;
    this.mrkdwn = opts.mrkdwn || false;

    this.axiosInstance = axios.create({
      proxy: opts.proxy || undefined
    });
  }

  log(info, callback) {
    let payload = {
      unfurl_links: this.unfurlLinks,
      unfurl_media: this.unfurlMedia,
      mrkdwn: this.mrkdwn
    }

    let layout = this.formatter(info);
    payload.text = layout && layout.text;
    payload.attachments = layout && layout.attachments;
    payload.blocks = layout && layout.blocks;

    if (!(payload.text || payload.attachments || payload.blocks)) {
      // if nothing passed, don't log
      return callback();
    }

    this.axiosInstance.post(this.webhookUrl, payload)
      .catch(err => {
        console.log('quill log', err.toString())
      }).finally(() => {
        callback();
      });
  }
}
