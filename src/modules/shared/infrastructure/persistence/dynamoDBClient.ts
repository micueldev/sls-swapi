import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = process.env.IS_OFFLINE
  ? new DynamoDBClient({
      endpoint: 'http://localhost:8000',
    })
  : new DynamoDBClient();

const dynamoDbClient = DynamoDBDocumentClient.from(client);

export { dynamoDbClient };
