import { IsInt } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class UserIdDto {
  @Expose()
  @IsInt()
  @ApiProperty()
  public id: number;
}
