import { createServer } from "miragejs"

createServer({
  routes() {
    this.namespace = "api"

    this.post("/login", (schema, request) => {
      console.log("requst", request.requestBody)
      if (request.requestBody.email == "admin@test.com" && request.requestBody.password == "Admin123!")
        return {
          success: true,
          email: request.requestBody.email,
          password: request.requestBody.password
        }
      else
        return {
          success: false,
          message: "wrong credentails"
        }
    })
  },
})