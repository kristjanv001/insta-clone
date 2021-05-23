import firebase from "firebase/app";

export type AuthContextType = {
  user: firebase.User | null;
  signInWithGoogle: () => void;
  logOut: () => void;
};

export type PostsContextType = {
  posts: PostType[];

  postHandler: (text: string, photoUrl: string) => void;
};

export type OpinionType = {
  id: string;
  opinionText: string;
  opinionAuthorName: string;
};

export type PostType = {
  photoUrl: string;
  postAuthorName: string | null | undefined;
  postAuthorEmail: string | null | undefined;
  description: string;
  id: string;
  // opinions: OpinionType[] | [];
};

export type PostPropsType = {
  post: PostType;
};

export type OpinionPropsType = {
  opinion: OpinionType;
};
