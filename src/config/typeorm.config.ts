import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  // const db = configService.get('database');
  return {
    type: 'mysql',
    host: "mysql.railway.internal",
    port: 3306,
    username: "root",
    password: "qNucmsUnkzBYhWEqMTDknysCvdBbvILn",
    database: "railway",
    autoLoadEntities: true,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  };
};
