import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { SumarVisitasDto } from './dto/sumar-visitas.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crear(@Body() dto: CreateUsuarioDto) {
    return this.usuariosService.crear(dto);
  }

  @Get()
  listar() {
    return this.usuariosService.listar();
  }

  @Get(':id')
  obtenerUno(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerUno(id);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarUsuarioDto,
  ) {
    return this.usuariosService.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.eliminar(id);
  }

  @Patch(':id/visitas')
  sumarVisitas(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SumarVisitasDto,
  ) {
    return this.usuariosService.sumarVisitas(id, dto);
  }
}
