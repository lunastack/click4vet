import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PetsService } from './pets.service';
import { ListPetsDto, SearchPetsDto } from './dto/list-pets';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) { }

  @Post()
  create(@Body() createPetDto: any) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  findAll(@Query() listPetsDto: ListPetsDto) {
    return this.petsService.findAll();
  }

  @Get('search')
  search(@Query() searchDto: any) {
    return this.petsService.search(searchDto.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: string) {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
