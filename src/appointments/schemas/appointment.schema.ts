import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Owner } from 'src/owners/schemas/owner.schema';

@Schema({ timestamps: true })
export class Pet extends Document {
  @Prop({ required: true })
  name: string;


}

export const PetSchema = SchemaFactory.createForClass(Pet);
