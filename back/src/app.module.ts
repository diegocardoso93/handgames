import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinfingerGateway } from './pinfinger.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PinfingerGateway],
})
export class AppModule {}
