import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT ?? 3001;
  const app = await NestFactory.create(AppModule,{
    logger:["error","warn"]
  });

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle("Donate Service")
    .setDescription("Donate service api description")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("nest Js")
    .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, documentFactory);
  await app.listen(PORT, ()=>{
    console.log(`server started at: http://localhost:${PORT}`);
    console.log(
      `server started at: http://localhost:${PORT}/api/docs`
    );
  });
}
start();
