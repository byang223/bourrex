import { Methods, Context } from "./.hathora/methods";
import { Response } from "../api/base";
import {
  Configuration,
  GameState,
  Phase,
  Trick,
  Player,
  Game,
  PlayerState,
  UserId,
  IInitializeRequest,
  IConfigureGameRequest,
  IJoinGameRequest,
  IStartGameRequest,
  IStopGameRequest,
  IFoldHandRequest,
  ISwapCardsRequest,
  IPlayRequest,
} from "../api/types";
import { Card, Cards, createDeck, drawCardsFromDeck, findHighestHands } from "@pairjacks/poker-cards";

type InternalState = {
  game: Game,
  deck: Cards;
}

const MAX_PLAYERS = 7;

export class Impl implements Methods<InternalState> {
  initialize(ctx: Context, request: IInitializeRequest): InternalState {
    return {
      game: {
        configuration: {
          timeLimit: 20,
          ante: 1,
        },
        state: GameState.STOPPED,
        round: 0,
        phase: Phase.FOLD,
        players: [],
        pot: 0,
      },
      deck: [],
    };
  }
  configureGame(state: InternalState, userId: UserId, ctx: Context, request: IConfigureGameRequest): Response {
    state.game.configuration.timeLimit = request.timeLimit;
    state.game.configuration.ante = request.ante;
    return Response.ok();
  }
  joinGame(state: InternalState, userId: UserId, ctx: Context, request: IJoinGameRequest): Response {
    if (state.game.players.length >= 7) {
      return Response.error("no more than 7 players allowed");
    }
    state.game.players.push({
      id: userId,
      name: request.name,
      handSize: 0,
      chips: request.chips,
      seatPosition: state.game.players.length,
      tricks: [],
    })
    return Response.ok();
  }
  startGame(state: InternalState, userId: UserId, ctx: Context, request: IStartGameRequest): Response {
    return Response.error("Not implemented");
  }
  stopGame(state: InternalState, userId: UserId, ctx: Context, request: IStopGameRequest): Response {
    return Response.error("Not implemented");
  }
  foldHand(state: InternalState, userId: UserId, ctx: Context, request: IFoldHandRequest): Response {
    return Response.error("Not implemented");
  }
  swapCards(state: InternalState, userId: UserId, ctx: Context, request: ISwapCardsRequest): Response {
    return Response.error("Not implemented");
  }
  play(state: InternalState, userId: UserId, ctx: Context, request: IPlayRequest): Response {
    return Response.error("Not implemented");
  }
  getUserState(state: InternalState, userId: UserId): PlayerState {
    return {
      game: state.game,
      hand: [],
    };
  }
  onTick(state: InternalState, ctx: Context, timeDelta: number): void {}
}
