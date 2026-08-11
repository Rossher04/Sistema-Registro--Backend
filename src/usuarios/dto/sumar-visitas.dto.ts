import { IsInt, Min } from 'class-validator';

export class SumarVisitasDto {
  @IsInt()
  @Min(1)
  cantidad: number;
}
