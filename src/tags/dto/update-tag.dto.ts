import { IsString } from 'class-validator'

export class UpdateTagDto {
    @IsString()
    content!: string
}