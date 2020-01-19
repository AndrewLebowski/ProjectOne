import express from 'express'
// import path from 'path'
import config from '../config'
import template from '../templates/template.react'
import userApi from './routes/user.routes'
import postApi from './routes/post.routes'


const app = express()

app.use('/', userApi)
app.use('/', postApi)

app.get('*', (request, response) => {
    response.send( template() )
})


const { node_env, port } = config
app.listen(config.port, function() {
    console.log(`Server is running on port ${port} in ${node_env} mode...`)
})