import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port =Number(process.env.PORT)
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`The server of the project portfolio is running at ${port}`)
}
bootstrap();
