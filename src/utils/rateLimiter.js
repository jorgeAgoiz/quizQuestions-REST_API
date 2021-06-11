const rateLimit = require('express-rate-limit')

exports.limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes in milliseconds is the time window.
  max: 100, // Maximum 100 request
  message: { message: 'You have exceeded the 100 requests in 10 minutes limit!' },
  headers: true
})
