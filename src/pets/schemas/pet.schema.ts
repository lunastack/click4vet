import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Owner } from 'src/owners/schemas/owner.schema';
import { petTypes } from '../constants/pet-types';

@Schema({ timestamps: true })
export class Pet extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: petTypes })
  type: string;

  @Prop({ required: true })
  race: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  sex: string;

  @Prop()
  birthdate: number;

  @Prop()
  ageInMonths: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Owner' })
  owner: Owner;

  @Prop()
  deletedAt: Date;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
