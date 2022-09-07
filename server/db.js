const mongoose = require('mongoose')
class Database {
  constructor() {
    this.connect()
  }
  async connect() {
    await mongoose
      .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Database connection successful')
      })
      .catch((err) => {
        console.error('Database connection error')
      })
  }
}
module.exports = new Database()
