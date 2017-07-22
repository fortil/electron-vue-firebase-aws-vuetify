import * as firebase from 'firebase'
// import path from 'path'
import config from '@/../../config.json'
import AWS from 'aws-sdk'
// AWS.config.loadFromPath(path.join(__static, '../config.json'))
export const s3 = new AWS.S3({
  credentials: config.aws.credentials
})

export const Firebase = firebase.initializeApp(config.firebase)

export const db = Firebase.database()
export const auth = Firebase.auth()
export const Bucket = config.aws.bucket
export const URL_S3 = `https://s3.amazonaws.com/${Bucket}/`
