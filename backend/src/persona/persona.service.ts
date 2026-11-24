import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const persona = this.personaRepository.create(createPersonaDto);
    return this.personaRepository.save(persona);
  }

  findAll(): Promise<Persona[]> {
    return this.personaRepository.find({
      order: { apellidos: 'ASC', nombres: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Persona> {
    const persona = await this.personaRepository.findOneBy({ id_persona: id });
    if (!persona) {
      throw new NotFoundException(`Persona con id ${id} no encontrada`);
    }
    return persona;
  }

  async update(
    id: string,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    const persona = await this.personaRepository.preload({
      id_persona: id,
      ...updatePersonaDto,
    });
    if (!persona) {
      throw new NotFoundException(`Persona con id ${id} no encontrada`);
    }
    return this.personaRepository.save(persona);
  }

  async remove(id: string): Promise<void> {
    const persona = await this.findOne(id);
    await this.personaRepository.remove(persona);
  }
}
