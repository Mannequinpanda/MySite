const AWS = require('aws-sdk');
require('dotenv').config();

const uuid = require('uuid');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET
})

const db = new AWS.DynamoDB.DocumentClient();
const TABLE = "Messages"


async function getLogs(type) {
  const params = type == 'all' ? {TableName: TABLE} : {
    TableName: TABLE
      
  };
  const logs = await db.scan(params).promise();
  console.log(logs.Items)
  return logs.Items
};
exports.getLogs = getLogs;

async function addLog(title, email, username, link, category, msg) {
  const params = {
    TableName: TABLE,
    //Currently message ID is randomly generated but should be fixed to avoid theoretical collision
    Item: {message_id: uuid.v4(), title, email, username, link, category, msg}
  }
  return await db.put(params).promise();
}
exports.addLog = addLog;