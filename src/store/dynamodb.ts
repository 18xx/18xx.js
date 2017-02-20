import * as AWS from 'aws-sdk';
import { DynamoDB } from 'aws-sdk';

import { GameState } from '../reducers/game';

import { Store } from '../store';

AWS.config.update({ region: 'us-east-1' });
export default class DynamoDBStore implements Store {
  private ddb: DynamoDB;
  private ddbClient: DynamoDB.DocumentClient;

  constructor(url: string) {
    this.ddb = new AWS.DynamoDB({
      endpoint: 'http://localhost:8000/'
    });
    this.ddbClient = new AWS.DynamoDB.DocumentClient({
      service: this.ddb
    });
  }

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
    this.ddb.createTable(tableData);
  }

  public getState(hash: string): Promise<GameState> {
    return this.ddbClient.get({
      Key: {
        key: hash
      },
      TableName: 'gameState',
    }).promise().then(result => {
      if (!result.Item) {
        return Promise.reject(`Could not find state: ${hash}`);
      }
      return result.Item.body;
    });
  }

  public setState(hash: string, body: GameState): Promise<boolean> {
    return this.ddbClient.put({
      Item: {
        body,
        key: hash,
      },
      TableName: 'gameState',
    }).promise().then(() => true);
  }
}
