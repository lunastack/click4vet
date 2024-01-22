import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Pet } from 'src/pets/schemas/pet.schema';

@Schema({ timestamps: true })
export class Owner extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  rut: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Pet' }] })
  pets: Pet[];
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
