import { PgDataSource } from './db';
import { DataSource } from 'typeorm';

export class DbDataSource {
  public static instance: DataSource;

  public static getInstance(): DataSource {
    if (!DbDataSource.instance) {
      DbDataSource.instance = PgDataSource.getInstance().getDataSource();
    }

    return DbDataSource.instance;
  }
}
