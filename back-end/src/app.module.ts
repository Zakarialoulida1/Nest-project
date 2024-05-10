import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';

@Module({

  imports: [MongooseModule.forRoot('mongodb+srv://zakarialoulida92:7fP7hMJsghzAbPxv@workspace.e08cn09.mongodb.net/databasenest?retryWrites=true&w=majority&appName=Workspace') ,UsersModule, CategoriesModule, AuthModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
