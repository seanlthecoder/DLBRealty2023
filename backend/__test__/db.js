import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

/**
 * Connect to mock memory db
 */
export const connect = async () => {
  await mongoose.disconnect()
  const mongodbMemoryServerOptions = {
    binary: {
      version: '5.0.6',
      skipMD5: true
    },
    autoStart: true,
    instance: {}
  }
  const mongoServer = await MongoMemoryServer.create(mongodbMemoryServerOptions)
  const URI = mongoServer.getUri()

  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true
  })
  return mongoServer
}

/**
 * Close db connection
 */
export const closeDatabase = async (mongoServer) => {
  await mongoose.disconnect()
  await mongoose.connection.close()
  await mongoServer.stop()
}

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
  if(mongoose.connection.readyState == 1){
    const collections = await mongoose.connection.db.collections()
    for (let i = 0; i < collections.length; i += 1) {
      /* eslint-disable-next-line no-await-in-loop */
      await collections[i].deleteMany({})
    }  
  }
}
