import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './schemas/pet.schema';
import { Model } from 'mongoose';
import { Owner } from 'src/owners/schemas/owner.schema';
import { PetErrorCodesEnum } from './constants/error-exceptions';
import { checkErrorCodes } from '@core/utils';

@Injectable()
export class PetsService {

  constructor(
    @InjectModel(Pet.name) private petModel: Model<Pet>,
    @InjectModel(Owner.name) private ownerModel: Model<Owner>
  ) { }

  async create(createPetDto: any) {
    const ownerRut = createPetDto.owner.rut;

    let owner = await this.ownerModel.findOne({
      rut: ownerRut,
    });

    if (!owner) {
      owner = await this.ownerModel.create({
        ...createPetDto.owner,
      });
    }

    const pet = await this.petModel.create({
      ...createPetDto.pet,
      owner: owner._id,
    });

    return {
      pet,
      owner
    }
  }

  async findAll() {
    const pets = await this.petModel.find().populate('owner');

    return pets;
  }

  async search(term: string) {
    const termRegExp = RegExp(term, 'i')

    const pets = await this.petModel
      .find(
        {
          $or: [
            {
              name: termRegExp,
            },
          ]
        }
      )
      .populate('owner');

    return pets;
  }

  findOne(id: string) {
    return `This action returns a #${id} pet`;
  }

  update(id: string, updatePetDto: any) {
    return `This action updates a #${id} pet`;
  }

  remove(id: string) {
    return `This action removes a #${id} pet`;
  }
}
