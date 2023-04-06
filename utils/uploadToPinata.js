const pinataSDK = require("@pinata/sdk")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const pinataApiKey = process.env.PINATA_API_KEY || ""
const pinataApiSecret = process.env.PINATA_API_SECRET || ""
const pinata = pinataSDK(pinataApiKey, pinataApiSecret)

async function storeImages(imagesFilePath) {
  const fullImagesPath = path.resolve(imagesFilePath)
  const files = fs.readdirSync(fullImagesPath)
  let responses = []
  console.log("Uploading to IPFS fren")
  for (const fileIndex in files) {
    const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
    const options = {
      pinataMetadata: {
        name: files[fileIndex],
      },
    }
    try {
      const response = await pinata.pinFileToIPFS(readableStreamForFile, options)
      responses.push(response)
    } catch (error) {
      console.log(error)
    }
  }
  return { responses, files }
}

async function storeTokenUriMetadata(metadata) {
  const config = {
    null: null,
  }
  const options = {
    pinataMetadata: {
      name: metadata.name,
    },
  }
  try {
    const response = await pinata.pinJSONToIPFS(metadata, config, options)
    return response
  } catch (error) {
    console.log(error)
  }
  return null
}

module.exports = { storeImages, storeTokenUriMetadata }
