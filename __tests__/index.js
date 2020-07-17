const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeAll(async () => {
    await db('users').truncate()
  })
afterAll(async () => {
    await db.destroy()

})

describe("auth integration tests", () => {
    it("POST /register SHOULD SUCCEED", async () => {
        const data = {username: "vospader", password: "pass1234"}
        const res = await supertest(server).post("/api/auth/register").send(data)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toBe("vospader")
        expect(res.body.id).toBeDefined()
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        
    }) 

    it('POST /register SHOULD FAIL', async () => {
        const data = { username: 'vospader', password: 'pass1234' }
        const res = await supertest(server).post('/api/auth/register').send(data)
        expect(res.statusCode).toBe(409)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("username already taken")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
        
      })

    it("POST /login SHOULD SUCCEED", async () => {
        const data = {username: "vospader", password: "pass1234"}
        const res = await supertest(server).post("/api/auth/login").send(data)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Welcome back vospader!")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    it('POST /login SHOULD FAIL', async () => {
        const data = { username: 'aprilma', password: 'pass1234' }
        const res = await supertest(server).post('/api/auth/login').send(data)
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Invalid Credentials")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
      })
})


describe("jokes integration test", () => {
  it("GET /api/jokes should FAIL", async () => {
      const res = await supertest(server).get("/")
          expect(res.statusCode).toBe(404)
          // expect(res.type).toBe("application/json")
          // expect(res.body.message).toBe("Error Fetching Jokes")
          
  
  })
})