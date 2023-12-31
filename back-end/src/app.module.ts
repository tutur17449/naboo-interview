import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from './activity/activity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './me/me.module';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@${process.env.MONGO_HOST_IP}:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}`,
        };
      },
    }),
    AuthModule,
    UserModule,
    MeModule,
    ActivityModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
