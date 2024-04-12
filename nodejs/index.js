const express = require('express')
const userRouter = require('./routes/user.routes')
const cors = require('cors')


const PORT = process.env.PORT || 4200

const app = express()

app.use(express.json())
app.use('/api', cors({origin: 'http://localhost:3000'}), userRouter)


app.listen(PORT, () => console.log(`Server started on the ${PORT}`))

