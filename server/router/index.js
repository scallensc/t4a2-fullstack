import "core-js/stable";
import "regenerator-runtime/runtime";
import authRoutes from './auth.routes'

function authrouter(app) {
  app.use(`${process.env.BASE_API_URL}/auth`, authRoutes)
}

export default authrouter
