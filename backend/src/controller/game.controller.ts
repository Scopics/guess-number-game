import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GameResponse, GuessNumberResponse } from '../interface/apiResponse';
import { GameService } from '../service/game/game.service';
import { GameFormatter } from '../service/game/game.formatter';
import { GuessNumberRequest } from '../interface/apiRequest';

@Controller('game')
@ApiTags('GameController')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly gameFormatter: GameFormatter,
  ) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: GameResponse })
  public async getGame(@Param('id') id: string): Promise<GameResponse> {
    const game = await this.gameService.getById(id);
    return this.gameFormatter.toGameResponse(game);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: GameResponse })
  public async createGame(): Promise<GameResponse> {
    const game = await this.gameService.create();
    return this.gameFormatter.toGameResponse(game);
  }

  @Post('/:id/guess')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: GuessNumberResponse })
  public async guessNumber(
    @Param('id') id: string,
    @Body() body: GuessNumberRequest,
  ): Promise<GuessNumberResponse> {
    const game = await this.gameService.getById(id);
    const { isGuessed, characteristic } = await this.gameService.guessNumber(
      game,
      body.enteredNumber,
    );

    return this.gameFormatter.toGuessNumberResponse(isGuessed, characteristic, game);
  }

  @Post('/:id/start')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: GameResponse })
  public async start(@Param('id') id: string): Promise<GameResponse> {
    let game = await this.gameService.getById(id);
    game = await this.gameService.start(game);

    return this.gameFormatter.toGameResponse(game);
  }
}
