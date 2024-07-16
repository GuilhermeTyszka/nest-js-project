import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Length, IsOptional } from "class-validator";

export class User {
    @IsNotEmpty({
        message: 'Nome do usuário não pode ser vazio.'
    })
    @Length(5, 100,
        { 
            message: 'Comprimento do nome do usuário deve ser entre 5 e 100 caracteres' 
        }
    )
    @ApiProperty({
        example: 'Guilherme Felipe Tyszka',
        type: 'string',
        description: `Nome completo do usuário.`,
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'guilherme.tyszka@hotmail.com',
        type: 'string',
        description: `Email do usuário.`,
    })
    email: string;

    @IsInt({ 
        message: 'Idade deve ser um valor inteiro' 
    })
    @IsOptional()
    @ApiProperty({
        example: 29,
        type: 'integer',
        description: `Idade do usuário.`,
    })
    age: number;
}