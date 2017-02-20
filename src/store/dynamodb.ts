import * as AWS from 'aws-sdk';
import { DynamoDB } from 'aws-sdk';

import { GameState } from '../reducers/game';

import { Store } from '../store';

AWS.config.update({ region: 'us-east-1' });
const ddb: DynamoDB = new AWS.DynamoDB({
  endpoint: 'http://localhost:8000/'
});
const ddbClient: DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient({
  service: ddb
});

export default class DynamoDBStore implements Store {
  public createTables(): void {
    const tableData: any = {
      AttributeDefinitions: [
        {
          AttributeName: 'key',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'key',
          KeyType: 'HASH'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: '5',
        WriteCapacityUnits: '5'
      },
      TableName: 'gameState'
    };
    ddb.createTable(tableData);
  }

  public getState(hash: string): Promise<GameState> {
    return ddbClient.get({
      Key: {
        key: hash
      },
      TableName: 'gameState',
    }).promise().then(result => {
      return result.Item.body;
    });
  }

  public setState(hash: string, body: GameState): Promise<boolean> {
    return ddbClient.put({
      Item: {
        body,
        key: hash,
      },
      TableName: 'gameState',
    }).promise().then(() => true);
  }
}
