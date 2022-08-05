import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_PIPE, RouterModule } from '@nestjs/core';

// Feature Module
import { GoldModule } from '@modules/gold/gold.module';
import { HealthModule } from './health/health.module';
import { ExampleModule } from './example/example.module';
// Config
import { Environment } from '@modules/config/environment';
// Common
import {
  ExampleMiddleware,
  MulterMiddleware,
} from '@modules/common/middlewares';
import { AllExceptionsFilter } from '@modules/common/filters';
import { CustomValidationPipe } from '@modules/common/pipes';

const routes = [
  { path: '', module: HealthModule },
  { path: 'gold', module: GoldModule },
];

@Module({
  imports: [
    GoldModule,
    HealthModule,
    RouterModule.register(routes),
    ExampleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new CustomValidationPipe({
          skipMissingProperties: false,
          stopAtFirstError: false,
        });
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const SINGLE_MULTIPART_ROUTES = [
      'examples/request-object/express/upload-file/multer',
    ];
    const MULTIPLE_MULTIPART_ROUTES = [
      'examples/request-object/express/upload-multiple-file/multer',
    ];
    consumer
      .apply(ExampleMiddleware)
      .forRoutes('*')
      .apply(MulterMiddleware(Environment.getMulterOptions()))
      .forRoutes(...SINGLE_MULTIPART_ROUTES)
      .apply(
        MulterMiddleware(
          Environment.getMulterOptions({
            limits: {
              fileSize: 1024 * 1024 * 5, // in bytes : 5MB
              files: 2, // maximum files
            },
          }),
          'files',
          false,
        ),
      )
      .forRoutes(...MULTIPLE_MULTIPART_ROUTES);
  }
}
