import setupDatabase from './setupDatabase';
import query from './query';
import { Pool, PoolClient, QueryResult } from './pg';

const db = setupDatabase();

// eslint-disable-next-line import/prefer-default-export
export {
  db, query, Pool, PoolClient, QueryResult,
};
