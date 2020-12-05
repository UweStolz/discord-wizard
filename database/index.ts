import setupDatabase, { query } from './setupDatabase';

const db = setupDatabase();

// eslint-disable-next-line import/prefer-default-export
export { db, query };
