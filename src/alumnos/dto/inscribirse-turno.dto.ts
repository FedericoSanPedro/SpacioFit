import { IsInt } from 'class-validator';

export class InscribirseTurnoDto {
  @IsInt()
  turnoId: number;
}
