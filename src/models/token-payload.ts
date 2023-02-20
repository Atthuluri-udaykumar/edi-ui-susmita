
export class TokenPayload  {
    tokenType: string = '';
    userId: number = 0;
    userName: string = '';
  }

export function createTokenPayload( type: string, id: number, name: string): TokenPayload {
    const payload = new TokenPayload();
    payload.tokenType = type;
    payload.userName = name;
    payload.userId = id;
    return payload;
  }
