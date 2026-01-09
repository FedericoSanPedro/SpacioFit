import { IsBoolean, IsDateString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAsistenciaDto {
  @IsDateString()
  fecha: string;

  @Type(() => Number)
  @IsInt()
  alumnoId: number;

  @Type(() => Number)
  @IsInt()
  turnoId: number;

  @IsBoolean()
  asistio: boolean;

  @IsBoolean()
  pago: boolean;
}
