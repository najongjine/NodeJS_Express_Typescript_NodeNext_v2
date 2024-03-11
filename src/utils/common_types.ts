export type UserSocketInfo = {
  userId?: number;
  socketId?: string;
  roomName?: string;
  createdAt?: string;
  metaData?: any;
};

export type streamImageInfo = {
  expireMilisec: number;
  bucketname?: string;
  filepath?: string;
  filename?: string;
};

export type userInfo = {
  id?: string;
  createdDt?: string;
  updatedDt?: string;
};
