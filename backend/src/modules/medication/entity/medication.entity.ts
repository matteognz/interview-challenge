import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  dosage: number;

  @Column('int')
  frequency: number;

  @CreateDateColumn()
  createdAt: Date;
}
