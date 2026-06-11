export type tUserStatus = "ACTIVE" | "SUSPENDED" | "UNCOMPLATE";

interface OAuthProvider {
  id: string;
  provider: string;
}

export interface IUser {
  _id: string;
  role: number;
  full_name: string;
  email: string;
  avatar_url: string;
  status: tUserStatus;
  oauth_providers: OAuthProvider[];
  created_at: string;
  updated_at: string;
}
