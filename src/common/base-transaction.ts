import { Connection, EntityManager, QueryRunner } from 'typeorm';

export abstract class BaseTransaction<TransactionInput, TransactionOutput> {
  protected constructor(private readonly connection: Connection) {}

  // contains the logic that we need to execute in the transaction
  // must be implemented in all child classes
  public abstract execute(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput>;

  // creates a transaction query runner
  private async createRunner(): Promise<QueryRunner> {
    return this.connection.createQueryRunner();
  }

  // this is the main function that runs the transaction
  public async run(data: TransactionInput): Promise<TransactionOutput> {
    // since everythong in NestJs is a singleton, we should create a
    // seperate queryRunner for each of them
    const runner: QueryRunner = await this.createRunner();

    // connect to the runner
    await runner.connect();

    // start a transaction
    await runner.startTransaction();

    try {
      const result: TransactionOutput = await this.execute(
        data,
        runner.manager,
      );
      await runner.commitTransaction();
      return result;
    } catch (error) {
      await runner.rollbackTransaction();
      throw new Error('Transaction Failed');
    } finally {
      runner.release();
    }
  }

  // this is a function that allows us to use other "transaction" classes
  // inside of any other "main" transaction, i.e. without creating a new DB transaction
  public async runWithinTransaction(
    data: TransactionInput,
    manager: EntityManager,
  ): Promise<TransactionOutput> {
    return this.execute(data, manager);
  }
}
