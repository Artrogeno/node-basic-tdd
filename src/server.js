const env = require('./config/environment')
const app = require('./app')

app.listen(env.port || 3000 )
