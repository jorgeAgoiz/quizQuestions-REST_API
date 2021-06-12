const rateLimit = require('express-rate-limit')

exports.limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes in milliseconds is the time window.
  max: 100, // Maximum 100 request
  message: { message: 'You have exceeded the 100 requests in 60 minutes limit!' },
  headers: true
})
