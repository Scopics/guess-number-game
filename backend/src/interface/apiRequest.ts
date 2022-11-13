import { ApiProperty } from '@nestjs/swagger';

export class GuessNumberRequest {
  @ApiProperty()
  enteredNumber: number;
}
