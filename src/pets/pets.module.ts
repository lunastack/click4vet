import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { OwnersModule } from 'src/owners/owners.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pet.name,
        schema: PetSchema,
      }
    ]),
    OwnersModule,
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule { }
