const winston = require('winston');

class Logger {
  constructor(name) {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: './logs/' + name + '.log',
          format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.metadata(), winston.format.json()),
        }),
      ],
    });
  }

  debug(log, metadata) {
    this.logger.debug(log, metadata);
  }

  info(log, metadata) {
    this.logger.info(log, metadata);
  }

  warn(log, metadata) {
    this.logger.warn(log, metadata);
  }

  error(log, metadata) {
    this.logger.error(log, metadata);
  }
}

module.exports = new Logger(process.env.APP_NAME);
