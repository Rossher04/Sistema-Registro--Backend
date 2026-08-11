import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { SumarVisitasDto } from './dto/sumar-visitas.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  // Crear (POST /usuarios)
  async crear(dto: CreateUsuarioDto): Promise<Usuario> {
    const existente = await this.usuariosRepository.findOne({
      where: { username: dto.username },
    });
    if (existente) {
      throw new ConflictException('El usuario ya existe');
    }

    const usuario = this.usuariosRepository.create({
      username: dto.username,
      visitas: 0,
    });
    return this.usuariosRepository.save(usuario);
  }

  // Listar todos (GET /usuarios)
  async listar(): Promise<Usuario[]> {
    return this.usuariosRepository.find({ order: { id: 'ASC' } });
  }

  // Obtener uno (GET /usuarios/:id)
  async obtenerUno(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  // Actualizar (PUT /usuarios/:id)
  async actualizar(id: number, dto: ActualizarUsuarioDto): Promise<Usuario> {
    const usuario = await this.obtenerUno(id);

    if (dto.username && dto.username !== usuario.username) {
      const existente = await this.usuariosRepository.findOne({
        where: { username: dto.username },
      });
      if (existente) {
        throw new ConflictException('El usuario ya existe');
      }
      usuario.username = dto.username;
    }

    return this.usuariosRepository.save(usuario);
  }

  // Eliminar (DELETE /usuarios/:id)
  async eliminar(id: number): Promise<void> {
    const usuario = await this.obtenerUno(id);
    await this.usuariosRepository.remove(usuario);
  }

  // Sumar visitas (PATCH /usuarios/:id/visitas)
  async sumarVisitas(id: number, dto: SumarVisitasDto): Promise<Usuario> {
    const usuario = await this.obtenerUno(id);
    usuario.visitas += dto.cantidad;
    return this.usuariosRepository.save(usuario);
  }
}
