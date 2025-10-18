import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'; 

async function bootstrap() {
  console.log('Starting application with the following environment variables:');
  console.log(`HOST: ${process.env.HOST}`);
  console.log(`PORT: ${process.env.PORT}`);
  console.log(`USER: ${process.env.USER_DB}`);
  console.log(`DATABASE: ${process.env.DATABASE}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
