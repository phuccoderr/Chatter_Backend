import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config, database, up } from 'migrate-mongo';

@Injectable()
export class DbMigrationService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  private readonly dbMigrationConfig: Partial<config.Config> = {
    mongodb: {
      databaseName: this.configService.get('DB_NAME'),
      url: this.configService.get('MONGODB_URI'),
    },
    migrationsDir: `${__dirname}/../../migrations`,
    changelogCollectionName: 'changelog',
    migrationFileExtension: '.js',
  };

  async onModuleInit() {
    config.set(this.dbMigrationConfig);
    const { db, client } = await database.connect();
    await up(db, client);
  }
}