export interface AuthResponse{
  id: number;
  tokens: {
      accessToken: string;
      refreshToken: string;
  }
}
