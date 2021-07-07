import {
  Controller,
  Get,
  Req,
  Post,
  Header,
  Param,
  Body,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat-dto';

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(
      `new cat: ${createCatDto.name}, ${createCatDto.age}, ${createCatDto.breed}`,
    );
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    console.log(request.baseUrl);
    return 'This action returns all cats';
  }

  @Get()
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
