import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username?: string;
}
