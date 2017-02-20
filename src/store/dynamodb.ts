import * as AWS from 'aws-sdk';
import { DynamoDB } from 'aws-sdk';

import { GameState } from '../reducers/game';

import { Store } from '../store';

AWS.config.update({ region: 'ca-central-1' });

export default class DynamoDBStore implements Store {
  private ddb: DynamoDB;
  private ddbClient: DynamoDB.DocumentClient;

  constructor(url: string) {
    this.ddb = new AWS.DynamoDB({
      endpoint: url
    });
    this.ddbClient = new AWS.DynamoDB.DocumentClient({
      service: this.ddb
    });
    this.createTables();
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
    this.ddb.createTable(tableData).promise().then(
      (result: any) => console.log(result)
    ).catch(
      (result: any) => {
        // FIXME: Don't use exceptions for flow control
        if (result.code !== 'ResourceInUseException') {
          console.error(result);
        }
      }
    );
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
