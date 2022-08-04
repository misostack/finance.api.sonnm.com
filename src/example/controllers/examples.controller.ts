import { Example } from './../interfaces/example.interface';
import { ExampleService } from './../services/example.service';
import {
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { Transform } from 'stream';

import { createWriteStream } from 'fs';

@Controller('examples')
export class ExamplesController {
  constructor(private exampleService: ExampleService) {}
  // index, show, create, update, destroy
  @Get()
  index() {
    return [];
  }

  @Get(':id')
  show() {
    return {};
  }

  @Post('')
  create(@Body() payload): Example {
    const example: Example = this.exampleService.create(payload);
    return example;
  }

  @Patch(':id')
  update() {
    return {};
  }

  @Delete(':id')
  remove() {
    return {};
  }

  @Post('request-object/express/upload-multiple-file/multer')
  exampleRequestObjectExpressMulterUploadMultipleFile(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(req.files, req.file);
    res.json({ files: req.files, file: req.file });
  }

  @Post('request-object/express/upload-file/multer')
  exampleRequestObjectExpressMulterUploadFile(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(req.files, req.file);
    res.json({ files: req.files, file: req.file });
  }

  @Post('request-object/express/upload-file')
  exampleRequestObjectExpressUploadFile(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const writeStream = createWriteStream('./tmp/example-write-stream.pdf');
    req.pipe(writeStream);
    const myMultipartParser = new Transform({
      transform(buffer, _, done) {
        console.log(buffer);
        console.log('-'.repeat(50));
        done();
      },
    });
    req.pipe(myMultipartParser);
    req
      .on('abort', () => res.send({ aborted: 1001 }))
      .on('err', (err) => res.send(err))
      .on('data', (buffer) => {
        console.log('buffer', buffer);
      })
      .on('end', () => {
        console.log('end');
        res.status(200).json({
          body: req.body,
          headers: req.headers,
        });
      });
  }

  @Post('request-object/express/:email')
  exampleRequestObjectExpress(@Req() req: Request, @Res() res: Response) {
    const responseData = {
      approach: 'express',
      routeParams: req.params,
      queryParams: req.query,
      body: req.body,
      headers: req.headers,
      ip: req.ip,
      ips: req.ips,
      hostname: req.hostname,
      subdomain: req.subdomains,
    };
    res.status(200).json(responseData);
  }

  @Post('request-object/standard/:email')
  exampleRequestObjectStandard(
    @Body() body,
    @Query() query,
    @Param('email') email: string,
    @Headers() headers,
    @Ip() ip,
  ) {
    const responseData = {
      approach: 'standard',
      routeParams: { email },
      queryParams: query,
      body: body,
      headers: headers,
      ip,
    };
    return responseData;
  }

  @Post('built-in-pipes/example-validation-pipe')
  exampleValidationPipe(@Body() body) {
    return { body };
  }
}
