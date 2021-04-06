import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['String'];
  user: User;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  altitude: Scalars['Float'];
  accuracy: Scalars['Float'];
  altitudeAccuracy: Scalars['Float'];
  heading: Scalars['Float'];
  speed: Scalars['Float'];
  timestamp: Scalars['Float'];
};

export type QueueEntry = {
  __typename?: 'QueueEntry';
  id: Scalars['String'];
  origin: Scalars['String'];
  destination: Scalars['String'];
  state: Scalars['Float'];
  isAccepted: Scalars['Boolean'];
  groupSize: Scalars['Float'];
  timeEnteredQueue: Scalars['Float'];
  beeper: User;
  rider: User;
  ridersQueuePosition: Scalars['Float'];
  location?: Maybe<Location>;
};

export type Beep = {
  __typename?: 'Beep';
  id: Scalars['String'];
  beeper: User;
  rider: User;
  origin: Scalars['String'];
  destination: Scalars['String'];
  state: Scalars['Float'];
  isAccepted: Scalars['Boolean'];
  groupSize: Scalars['Float'];
  timeEnteredQueue: Scalars['Float'];
  doneTime: Scalars['Float'];
};

export type Rating = {
  __typename?: 'Rating';
  id: Scalars['String'];
  rater: User;
  rated: User;
  stars: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  timestamp: Scalars['Float'];
  beep: Beep;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  first: Scalars['String'];
  last: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  venmo?: Maybe<Scalars['String']>;
  cashapp?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  isBeeping: Scalars['Boolean'];
  isEmailVerified: Scalars['Boolean'];
  isStudent: Scalars['Boolean'];
  groupRate: Scalars['Float'];
  singlesRate: Scalars['Float'];
  capacity: Scalars['Float'];
  masksRequired: Scalars['Boolean'];
  queueSize: Scalars['Float'];
  rating?: Maybe<Scalars['Float']>;
  role: Scalars['String'];
  pushToken?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  queue: Array<QueueEntry>;
  locations: Array<Location>;
  ratings: Array<Rating>;
};

export type TokenEntry = {
  __typename?: 'TokenEntry';
  id: Scalars['String'];
  tokenid: Scalars['String'];
  user: User;
};

export type VerifyEmail = {
  __typename?: 'VerifyEmail';
  id: Scalars['String'];
  user: User;
  time: Scalars['Float'];
  email: Scalars['String'];
};

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  id: Scalars['String'];
  user: User;
  time: Scalars['Float'];
};

export type Report = {
  __typename?: 'Report';
  id: Scalars['String'];
  reporter: User;
  reported: User;
  handledBy?: Maybe<User>;
  reason: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  timestamp: Scalars['Float'];
  handled: Scalars['Boolean'];
  beep?: Maybe<Beep>;
};

export type Auth = {
  __typename?: 'Auth';
  user: User;
  tokens: TokenEntry;
};

export type BeepsResponse = {
  __typename?: 'BeepsResponse';
  items: Array<Beep>;
  count: Scalars['Int'];
};

export type Suggestion = {
  __typename?: 'Suggestion';
  title: Scalars['String'];
};

export type LocationsResponse = {
  __typename?: 'LocationsResponse';
  items: Array<Location>;
  count: Scalars['Int'];
};

export type RatingsResponse = {
  __typename?: 'RatingsResponse';
  items: Array<Rating>;
  count: Scalars['Int'];
};

export type ReportsResponse = {
  __typename?: 'ReportsResponse';
  items: Array<Report>;
  count: Scalars['Int'];
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  items: Array<User>;
  count: Scalars['Int'];
};

export type RideHistoryResponse = {
  __typename?: 'RideHistoryResponse';
  items: Array<Beep>;
  count: Scalars['Int'];
};

export type BeepHistoryResponse = {
  __typename?: 'BeepHistoryResponse';
  items: Array<Beep>;
  count: Scalars['Int'];
};

export type EditAccountInput = {
  first: Scalars['String'];
  last: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  venmo?: Maybe<Scalars['String']>;
  cashapp?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  pushToken?: Maybe<Scalars['String']>;
};

export type SignUpInput = {
  username: Scalars['String'];
  first: Scalars['String'];
  last: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
  venmo?: Maybe<Scalars['String']>;
  cashapp?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  pushToken?: Maybe<Scalars['String']>;
};

export type BeeperSettingsInput = {
  singlesRate?: Maybe<Scalars['Float']>;
  groupRate?: Maybe<Scalars['Float']>;
  capacity?: Maybe<Scalars['Float']>;
  isBeeping?: Maybe<Scalars['Boolean']>;
  masksRequired?: Maybe<Scalars['Boolean']>;
};

export type UpdateQueueEntryInput = {
  value: Scalars['String'];
  riderId: Scalars['String'];
  queueId: Scalars['String'];
};

export type LocationInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  altitude: Scalars['Float'];
  accuracy: Scalars['Float'];
  heading: Scalars['Float'];
  speed: Scalars['Float'];
};

export type RatingInput = {
  userId: Scalars['String'];
  stars: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  beepId?: Maybe<Scalars['String']>;
};

export type ReportInput = {
  userId: Scalars['String'];
  reason: Scalars['String'];
  beepId?: Maybe<Scalars['String']>;
};

export type UpdateReportInput = {
  handled?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
};

export type GetBeepInput = {
  origin: Scalars['String'];
  destination: Scalars['String'];
  groupSize: Scalars['Float'];
};

export type EditUserValidator = {
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  venmo?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  isBeeping?: Maybe<Scalars['Boolean']>;
  isEmailVerified?: Maybe<Scalars['Boolean']>;
  isStudent?: Maybe<Scalars['Boolean']>;
  groupRate?: Maybe<Scalars['Float']>;
  singlesRate?: Maybe<Scalars['Float']>;
  capacity?: Maybe<Scalars['Float']>;
  masksRequired?: Maybe<Scalars['Boolean']>;
  queueSize?: Maybe<Scalars['Float']>;
  role?: Maybe<Scalars['String']>;
  pushToken?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getBeeps: BeepsResponse;
  getBeep: Beep;
  getETA: Scalars['String'];
  getLocationSuggestions: Array<Suggestion>;
  getLocations: LocationsResponse;
  getRatings: RatingsResponse;
  getRating: Rating;
  getReports: ReportsResponse;
  getReport: Report;
  findBeep: User;
  getRiderStatus?: Maybe<QueueEntry>;
  getBeeperList: Array<User>;
  getLastBeepToRate?: Maybe<Beep>;
  getUser: User;
  getUsers: UsersResponse;
  getRideHistory: RideHistoryResponse;
  getBeepHistory: BeepHistoryResponse;
  getQueue: Array<QueueEntry>;
};


export type QueryGetBeepsArgs = {
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
};


export type QueryGetBeepArgs = {
  id: Scalars['String'];
};


export type QueryGetEtaArgs = {
  end: Scalars['String'];
  start: Scalars['String'];
};


export type QueryGetLocationSuggestionsArgs = {
  sessiontoken: Scalars['String'];
  location: Scalars['String'];
};


export type QueryGetLocationsArgs = {
  id?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
};


export type QueryGetRatingsArgs = {
  me?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
};


export type QueryGetRatingArgs = {
  id: Scalars['String'];
};


export type QueryGetReportsArgs = {
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
};


export type QueryGetReportArgs = {
  id: Scalars['String'];
};


export type QueryGetUserArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
};


export type QueryGetRideHistoryArgs = {
  id?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
};


export type QueryGetBeepHistoryArgs = {
  id?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  show?: Maybe<Scalars['Int']>;
};


export type QueryGetQueueArgs = {
  id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  editAccount: User;
  changePassword: Scalars['Boolean'];
  updatePushToken: Scalars['Boolean'];
  verifyAccount: Scalars['Boolean'];
  resendEmailVarification: Scalars['Boolean'];
  deleteAccount: Scalars['Boolean'];
  addProfilePicture: User;
  login: Auth;
  signup: Auth;
  logout: Scalars['Boolean'];
  removeToken: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  setBeeperStatus: Scalars['Boolean'];
  setBeeperQueue: Scalars['Boolean'];
  deleteBeep: Scalars['Boolean'];
  insertLocation: Scalars['Boolean'];
  rateUser: Scalars['Boolean'];
  deleteRating: Scalars['Boolean'];
  reportUser: Scalars['Boolean'];
  updateReport: Report;
  deleteReport: Scalars['Boolean'];
  chooseBeep: QueueEntry;
  riderLeaveQueue: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
  editUser: User;
};


export type MutationEditAccountArgs = {
  input: EditAccountInput;
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
};


export type MutationUpdatePushTokenArgs = {
  pushToken: Scalars['String'];
};


export type MutationVerifyAccountArgs = {
  id: Scalars['String'];
};


export type MutationAddProfilePictureArgs = {
  picture: Scalars['Upload'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignUpInput;
};


export type MutationLogoutArgs = {
  isApp?: Maybe<Scalars['Boolean']>;
};


export type MutationRemoveTokenArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  id: Scalars['String'];
};


export type MutationSetBeeperStatusArgs = {
  input: BeeperSettingsInput;
};


export type MutationSetBeeperQueueArgs = {
  input: UpdateQueueEntryInput;
};


export type MutationDeleteBeepArgs = {
  id: Scalars['String'];
};


export type MutationInsertLocationArgs = {
  location: LocationInput;
};


export type MutationRateUserArgs = {
  input: RatingInput;
};


export type MutationDeleteRatingArgs = {
  id: Scalars['String'];
};


export type MutationReportUserArgs = {
  input: ReportInput;
};


export type MutationUpdateReportArgs = {
  input: UpdateReportInput;
  id: Scalars['String'];
};


export type MutationDeleteReportArgs = {
  id: Scalars['String'];
};


export type MutationChooseBeepArgs = {
  input: GetBeepInput;
  beeperId: Scalars['String'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String'];
};


export type MutationEditUserArgs = {
  data: EditUserValidator;
  id: Scalars['String'];
};


export type Subscription = {
  __typename?: 'Subscription';
  getBeeperUpdates: Array<QueueEntry>;
  getLocationUpdates?: Maybe<Location>;
  getRiderUpdates?: Maybe<QueueEntry>;
  getUserUpdates: User;
};


export type SubscriptionGetBeeperUpdatesArgs = {
  topic: Scalars['String'];
};


export type SubscriptionGetLocationUpdatesArgs = {
  topic: Scalars['String'];
};


export type SubscriptionGetRiderUpdatesArgs = {
  topic: Scalars['String'];
};


export type SubscriptionGetUserUpdatesArgs = {
  topic: Scalars['String'];
};

export type GetUserDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDataQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'first' | 'last' | 'email' | 'phone' | 'venmo' | 'isBeeping' | 'isEmailVerified' | 'isStudent' | 'groupRate' | 'singlesRate' | 'photoUrl' | 'capacity' | 'masksRequired'>
  ) }
);

export type UserUpdatesSubscriptionVariables = Exact<{
  topic: Scalars['String'];
}>;


export type UserUpdatesSubscription = (
  { __typename?: 'Subscription' }
  & { getUserUpdates: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'first' | 'last' | 'email' | 'phone' | 'venmo' | 'isBeeping' | 'isEmailVerified' | 'isStudent' | 'groupRate' | 'singlesRate' | 'photoUrl' | 'capacity' | 'masksRequired'>
  ) }
);

export type UpdateBeeperQueueMutationVariables = Exact<{
  queueId: Scalars['String'];
  riderId: Scalars['String'];
  value: Scalars['String'];
}>;


export type UpdateBeeperQueueMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setBeeperQueue'>
);

export type GetSuggestionsQueryVariables = Exact<{
  location: Scalars['String'];
  sessiontoken: Scalars['String'];
}>;


export type GetSuggestionsQuery = (
  { __typename?: 'Query' }
  & { getLocationSuggestions: Array<(
    { __typename?: 'Suggestion' }
    & Pick<Suggestion, 'title'>
  )> }
);

export type GetRateDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRateDataQuery = (
  { __typename?: 'Query' }
  & { getLastBeepToRate?: Maybe<(
    { __typename?: 'Beep' }
    & Pick<Beep, 'id'>
    & { beeper: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'username' | 'photoUrl'>
    ) }
  )> }
);

export type ResendMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resendEmailVarification'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Auth' }
    & { tokens: (
      { __typename?: 'TokenEntry' }
      & Pick<TokenEntry, 'id' | 'tokenid'>
    ) }
  ) }
);

export type SignUpMutationVariables = Exact<{
  first: Scalars['String'];
  last: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  venmo?: Maybe<Scalars['String']>;
  cashapp?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'Auth' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first' | 'last' | 'username' | 'email' | 'phone' | 'venmo' | 'cashapp' | 'isBeeping' | 'isEmailVerified' | 'isStudent' | 'groupRate' | 'singlesRate' | 'capacity' | 'masksRequired' | 'queueSize' | 'role' | 'photoUrl' | 'name'>
    ), tokens: (
      { __typename?: 'TokenEntry' }
      & Pick<TokenEntry, 'id' | 'tokenid'>
    ) }
  ) }
);

export type GetInitialQueueQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialQueueQuery = (
  { __typename?: 'Query' }
  & { getQueue: Array<(
    { __typename?: 'QueueEntry' }
    & Pick<QueueEntry, 'id' | 'isAccepted' | 'groupSize' | 'origin' | 'destination' | 'state' | 'timeEnteredQueue'>
    & { rider: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'first' | 'last' | 'venmo' | 'cashapp' | 'phone' | 'photoUrl'>
    ) }
  )> }
);

export type GetQueueSubscriptionVariables = Exact<{
  topic: Scalars['String'];
}>;


export type GetQueueSubscription = (
  { __typename?: 'Subscription' }
  & { getBeeperUpdates: Array<(
    { __typename?: 'QueueEntry' }
    & Pick<QueueEntry, 'id' | 'isAccepted' | 'groupSize' | 'origin' | 'destination' | 'state' | 'timeEnteredQueue'>
    & { rider: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first' | 'last' | 'venmo' | 'cashapp' | 'phone' | 'photoUrl'>
    ) }
  )> }
);

export type UpdateBeepSettingsMutationVariables = Exact<{
  singlesRate: Scalars['Float'];
  groupRate: Scalars['Float'];
  capacity: Scalars['Float'];
  isBeeping: Scalars['Boolean'];
  masksRequired: Scalars['Boolean'];
}>;


export type UpdateBeepSettingsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setBeeperStatus'>
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'username' | 'first' | 'last' | 'isBeeping' | 'isStudent' | 'role' | 'venmo' | 'cashapp' | 'singlesRate' | 'groupRate' | 'capacity' | 'masksRequired' | 'photoUrl' | 'queueSize' | 'rating'>
  ) }
);

export type RateUserMutationVariables = Exact<{
  userId: Scalars['String'];
  stars: Scalars['Float'];
  message?: Maybe<Scalars['String']>;
  beepId?: Maybe<Scalars['String']>;
}>;


export type RateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'rateUser'>
);

export type ReportUserMutationVariables = Exact<{
  userId: Scalars['String'];
  reason: Scalars['String'];
  beepId?: Maybe<Scalars['String']>;
}>;


export type ReportUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reportUser'>
);

export type GetBeepHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBeepHistoryQuery = (
  { __typename?: 'Query' }
  & { getBeepHistory: (
    { __typename?: 'BeepHistoryResponse' }
    & Pick<BeepHistoryResponse, 'count'>
    & { items: Array<(
      { __typename?: 'Beep' }
      & Pick<Beep, 'id' | 'timeEnteredQueue' | 'doneTime' | 'groupSize' | 'origin' | 'destination'>
      & { rider: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'first' | 'last' | 'photoUrl'>
      ) }
    )> }
  ) }
);

export type GetRideHistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRideHistoryQuery = (
  { __typename?: 'Query' }
  & { getRideHistory: (
    { __typename?: 'RideHistoryResponse' }
    & Pick<RideHistoryResponse, 'count'>
    & { items: Array<(
      { __typename?: 'Beep' }
      & Pick<Beep, 'id' | 'timeEnteredQueue' | 'doneTime' | 'groupSize' | 'origin' | 'destination'>
      & { beeper: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'first' | 'last' | 'photoUrl'>
      ) }
    )> }
  ) }
);

export type GetRatingsIMadeQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  me?: Maybe<Scalars['Boolean']>;
}>;


export type GetRatingsIMadeQuery = (
  { __typename?: 'Query' }
  & { getRatings: (
    { __typename?: 'RatingsResponse' }
    & Pick<RatingsResponse, 'count'>
    & { items: Array<(
      { __typename?: 'Rating' }
      & Pick<Rating, 'id' | 'stars' | 'timestamp' | 'message'>
      & { rated: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'photoUrl'>
      ) }
    )> }
  ) }
);

export type GetRatingsOnMeQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  me?: Maybe<Scalars['Boolean']>;
}>;


export type GetRatingsOnMeQuery = (
  { __typename?: 'Query' }
  & { getRatings: (
    { __typename?: 'RatingsResponse' }
    & Pick<RatingsResponse, 'count'>
    & { items: Array<(
      { __typename?: 'Rating' }
      & Pick<Rating, 'id' | 'stars' | 'timestamp' | 'message'>
      & { rater: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'photoUrl'>
      ) }
    )> }
  ) }
);

export type GetInitialRiderStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialRiderStatusQuery = (
  { __typename?: 'Query' }
  & { getRiderStatus?: Maybe<(
    { __typename?: 'QueueEntry' }
    & Pick<QueueEntry, 'id' | 'ridersQueuePosition' | 'isAccepted' | 'origin' | 'destination' | 'state' | 'groupSize'>
    & { location?: Maybe<(
      { __typename?: 'Location' }
      & Pick<Location, 'id' | 'longitude' | 'latitude'>
    )>, beeper: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first' | 'last' | 'singlesRate' | 'groupRate' | 'isStudent' | 'role' | 'venmo' | 'cashapp' | 'username' | 'phone' | 'photoUrl' | 'masksRequired' | 'capacity' | 'queueSize'>
    ) }
  )> }
);

export type RiderStatusSubscriptionVariables = Exact<{
  topic: Scalars['String'];
}>;


export type RiderStatusSubscription = (
  { __typename?: 'Subscription' }
  & { getRiderUpdates?: Maybe<(
    { __typename?: 'QueueEntry' }
    & Pick<QueueEntry, 'id' | 'ridersQueuePosition' | 'isAccepted' | 'origin' | 'destination' | 'state' | 'groupSize'>
    & { location?: Maybe<(
      { __typename?: 'Location' }
      & Pick<Location, 'id' | 'longitude' | 'latitude'>
    )>, beeper: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first' | 'last' | 'singlesRate' | 'groupRate' | 'isStudent' | 'role' | 'venmo' | 'cashapp' | 'username' | 'phone' | 'photoUrl' | 'masksRequired' | 'capacity' | 'queueSize'>
    ) }
  )> }
);

export type BeepersLocationSubscriptionVariables = Exact<{
  topic: Scalars['String'];
}>;


export type BeepersLocationSubscription = (
  { __typename?: 'Subscription' }
  & { getLocationUpdates?: Maybe<(
    { __typename?: 'Location' }
    & Pick<Location, 'latitude' | 'longitude'>
  )> }
);

export type GetEtaQueryVariables = Exact<{
  start: Scalars['String'];
  end: Scalars['String'];
}>;


export type GetEtaQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getETA'>
);

export type LeaveQueueMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveQueueMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'riderLeaveQueue'>
);

export type GetBeepersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBeepersQuery = (
  { __typename?: 'Query' }
  & { getBeeperList: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'first' | 'last' | 'isStudent' | 'singlesRate' | 'groupRate' | 'capacity' | 'queueSize' | 'photoUrl' | 'role' | 'masksRequired' | 'rating' | 'venmo' | 'cashapp'>
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changePassword'>
);

export type EditAccountMutationVariables = Exact<{
  first: Scalars['String'];
  last: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  venmo?: Maybe<Scalars['String']>;
  cashapp?: Maybe<Scalars['String']>;
}>;


export type EditAccountMutation = (
  { __typename?: 'Mutation' }
  & { editAccount: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  ) }
);

export type AddProfilePictureMutationVariables = Exact<{
  picture: Scalars['Upload'];
}>;


export type AddProfilePictureMutation = (
  { __typename?: 'Mutation' }
  & { addProfilePicture: (
    { __typename?: 'User' }
    & Pick<User, 'photoUrl'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);


export const GetUserDataDocument = gql`
    query GetUserData {
  getUser {
    id
    first
    last
    email
    phone
    venmo
    isBeeping
    isEmailVerified
    isStudent
    groupRate
    singlesRate
    photoUrl
    capacity
    masksRequired
  }
}
    `;

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
      }
export function useGetUserDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
        }
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>;
export type GetUserDataLazyQueryHookResult = ReturnType<typeof useGetUserDataLazyQuery>;
export type GetUserDataQueryResult = ApolloReactCommon.QueryResult<GetUserDataQuery, GetUserDataQueryVariables>;
export const UserUpdatesDocument = gql`
    subscription UserUpdates($topic: String!) {
  getUserUpdates(topic: $topic) {
    id
    first
    last
    email
    phone
    venmo
    isBeeping
    isEmailVerified
    isStudent
    groupRate
    singlesRate
    photoUrl
    capacity
    masksRequired
  }
}
    `;

/**
 * __useUserUpdatesSubscription__
 *
 * To run a query within a React component, call `useUserUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserUpdatesSubscription({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useUserUpdatesSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<UserUpdatesSubscription, UserUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<UserUpdatesSubscription, UserUpdatesSubscriptionVariables>(UserUpdatesDocument, options);
      }
export type UserUpdatesSubscriptionHookResult = ReturnType<typeof useUserUpdatesSubscription>;
export type UserUpdatesSubscriptionResult = ApolloReactCommon.SubscriptionResult<UserUpdatesSubscription>;
export const UpdateBeeperQueueDocument = gql`
    mutation UpdateBeeperQueue($queueId: String!, $riderId: String!, $value: String!) {
  setBeeperQueue(input: {queueId: $queueId, riderId: $riderId, value: $value})
}
    `;
export type UpdateBeeperQueueMutationFn = ApolloReactCommon.MutationFunction<UpdateBeeperQueueMutation, UpdateBeeperQueueMutationVariables>;

/**
 * __useUpdateBeeperQueueMutation__
 *
 * To run a mutation, you first call `useUpdateBeeperQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBeeperQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBeeperQueueMutation, { data, loading, error }] = useUpdateBeeperQueueMutation({
 *   variables: {
 *      queueId: // value for 'queueId'
 *      riderId: // value for 'riderId'
 *      value: // value for 'value'
 *   },
 * });
 */
export function useUpdateBeeperQueueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBeeperQueueMutation, UpdateBeeperQueueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateBeeperQueueMutation, UpdateBeeperQueueMutationVariables>(UpdateBeeperQueueDocument, options);
      }
export type UpdateBeeperQueueMutationHookResult = ReturnType<typeof useUpdateBeeperQueueMutation>;
export type UpdateBeeperQueueMutationResult = ApolloReactCommon.MutationResult<UpdateBeeperQueueMutation>;
export type UpdateBeeperQueueMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateBeeperQueueMutation, UpdateBeeperQueueMutationVariables>;
export const GetSuggestionsDocument = gql`
    query GetSuggestions($location: String!, $sessiontoken: String!) {
  getLocationSuggestions(location: $location, sessiontoken: $sessiontoken) {
    title
  }
}
    `;

/**
 * __useGetSuggestionsQuery__
 *
 * To run a query within a React component, call `useGetSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestionsQuery({
 *   variables: {
 *      location: // value for 'location'
 *      sessiontoken: // value for 'sessiontoken'
 *   },
 * });
 */
export function useGetSuggestionsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetSuggestionsQuery, GetSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSuggestionsQuery, GetSuggestionsQueryVariables>(GetSuggestionsDocument, options);
      }
export function useGetSuggestionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSuggestionsQuery, GetSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSuggestionsQuery, GetSuggestionsQueryVariables>(GetSuggestionsDocument, options);
        }
export type GetSuggestionsQueryHookResult = ReturnType<typeof useGetSuggestionsQuery>;
export type GetSuggestionsLazyQueryHookResult = ReturnType<typeof useGetSuggestionsLazyQuery>;
export type GetSuggestionsQueryResult = ApolloReactCommon.QueryResult<GetSuggestionsQuery, GetSuggestionsQueryVariables>;
export const GetRateDataDocument = gql`
    query GetRateData {
  getLastBeepToRate {
    id
    beeper {
      id
      name
      username
      photoUrl
    }
  }
}
    `;

/**
 * __useGetRateDataQuery__
 *
 * To run a query within a React component, call `useGetRateDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRateDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRateDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRateDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRateDataQuery, GetRateDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRateDataQuery, GetRateDataQueryVariables>(GetRateDataDocument, options);
      }
export function useGetRateDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRateDataQuery, GetRateDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRateDataQuery, GetRateDataQueryVariables>(GetRateDataDocument, options);
        }
export type GetRateDataQueryHookResult = ReturnType<typeof useGetRateDataQuery>;
export type GetRateDataLazyQueryHookResult = ReturnType<typeof useGetRateDataLazyQuery>;
export type GetRateDataQueryResult = ApolloReactCommon.QueryResult<GetRateDataQuery, GetRateDataQueryVariables>;
export const ResendDocument = gql`
    mutation Resend {
  resendEmailVarification
}
    `;
export type ResendMutationFn = ApolloReactCommon.MutationFunction<ResendMutation, ResendMutationVariables>;

/**
 * __useResendMutation__
 *
 * To run a mutation, you first call `useResendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendMutation, { data, loading, error }] = useResendMutation({
 *   variables: {
 *   },
 * });
 */
export function useResendMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResendMutation, ResendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResendMutation, ResendMutationVariables>(ResendDocument, options);
      }
export type ResendMutationHookResult = ReturnType<typeof useResendMutation>;
export type ResendMutationResult = ApolloReactCommon.MutationResult<ResendMutation>;
export type ResendMutationOptions = ApolloReactCommon.BaseMutationOptions<ResendMutation, ResendMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    tokens {
      id
      tokenid
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($first: String!, $last: String!, $email: String!, $phone: String!, $venmo: String, $cashapp: String, $username: String!, $password: String!) {
  signup(
    input: {first: $first, last: $last, email: $email, phone: $phone, venmo: $venmo, cashapp: $cashapp, username: $username, password: $password}
  ) {
    user {
      id
      first
      last
      username
      email
      phone
      venmo
      cashapp
      isBeeping
      isEmailVerified
      isStudent
      groupRate
      singlesRate
      capacity
      masksRequired
      queueSize
      role
      photoUrl
      name
    }
    tokens {
      id
      tokenid
    }
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      venmo: // value for 'venmo'
 *      cashapp: // value for 'cashapp'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const GetInitialQueueDocument = gql`
    query GetInitialQueue {
  getQueue {
    id
    isAccepted
    groupSize
    origin
    destination
    state
    timeEnteredQueue
    rider {
      id
      name
      first
      last
      venmo
      cashapp
      phone
      photoUrl
    }
  }
}
    `;

/**
 * __useGetInitialQueueQuery__
 *
 * To run a query within a React component, call `useGetInitialQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInitialQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInitialQueueQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInitialQueueQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetInitialQueueQuery, GetInitialQueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetInitialQueueQuery, GetInitialQueueQueryVariables>(GetInitialQueueDocument, options);
      }
export function useGetInitialQueueLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetInitialQueueQuery, GetInitialQueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetInitialQueueQuery, GetInitialQueueQueryVariables>(GetInitialQueueDocument, options);
        }
export type GetInitialQueueQueryHookResult = ReturnType<typeof useGetInitialQueueQuery>;
export type GetInitialQueueLazyQueryHookResult = ReturnType<typeof useGetInitialQueueLazyQuery>;
export type GetInitialQueueQueryResult = ApolloReactCommon.QueryResult<GetInitialQueueQuery, GetInitialQueueQueryVariables>;
export const GetQueueDocument = gql`
    subscription GetQueue($topic: String!) {
  getBeeperUpdates(topic: $topic) {
    id
    isAccepted
    groupSize
    origin
    destination
    state
    timeEnteredQueue
    rider {
      id
      first
      last
      venmo
      cashapp
      phone
      photoUrl
    }
  }
}
    `;

/**
 * __useGetQueueSubscription__
 *
 * To run a query within a React component, call `useGetQueueSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetQueueSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQueueSubscription({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useGetQueueSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<GetQueueSubscription, GetQueueSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<GetQueueSubscription, GetQueueSubscriptionVariables>(GetQueueDocument, options);
      }
export type GetQueueSubscriptionHookResult = ReturnType<typeof useGetQueueSubscription>;
export type GetQueueSubscriptionResult = ApolloReactCommon.SubscriptionResult<GetQueueSubscription>;
export const UpdateBeepSettingsDocument = gql`
    mutation UpdateBeepSettings($singlesRate: Float!, $groupRate: Float!, $capacity: Float!, $isBeeping: Boolean!, $masksRequired: Boolean!) {
  setBeeperStatus(
    input: {singlesRate: $singlesRate, groupRate: $groupRate, capacity: $capacity, isBeeping: $isBeeping, masksRequired: $masksRequired}
  )
}
    `;
export type UpdateBeepSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateBeepSettingsMutation, UpdateBeepSettingsMutationVariables>;

/**
 * __useUpdateBeepSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateBeepSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBeepSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBeepSettingsMutation, { data, loading, error }] = useUpdateBeepSettingsMutation({
 *   variables: {
 *      singlesRate: // value for 'singlesRate'
 *      groupRate: // value for 'groupRate'
 *      capacity: // value for 'capacity'
 *      isBeeping: // value for 'isBeeping'
 *      masksRequired: // value for 'masksRequired'
 *   },
 * });
 */
export function useUpdateBeepSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBeepSettingsMutation, UpdateBeepSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateBeepSettingsMutation, UpdateBeepSettingsMutationVariables>(UpdateBeepSettingsDocument, options);
      }
export type UpdateBeepSettingsMutationHookResult = ReturnType<typeof useUpdateBeepSettingsMutation>;
export type UpdateBeepSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateBeepSettingsMutation>;
export type UpdateBeepSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateBeepSettingsMutation, UpdateBeepSettingsMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($id: String!) {
  getUser(id: $id) {
    id
    name
    username
    first
    last
    isBeeping
    isStudent
    role
    venmo
    cashapp
    singlesRate
    groupRate
    capacity
    masksRequired
    photoUrl
    queueSize
    rating
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const RateUserDocument = gql`
    mutation RateUser($userId: String!, $stars: Float!, $message: String, $beepId: String) {
  rateUser(
    input: {userId: $userId, beepId: $beepId, stars: $stars, message: $message}
  )
}
    `;
export type RateUserMutationFn = ApolloReactCommon.MutationFunction<RateUserMutation, RateUserMutationVariables>;

/**
 * __useRateUserMutation__
 *
 * To run a mutation, you first call `useRateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rateUserMutation, { data, loading, error }] = useRateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      stars: // value for 'stars'
 *      message: // value for 'message'
 *      beepId: // value for 'beepId'
 *   },
 * });
 */
export function useRateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RateUserMutation, RateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RateUserMutation, RateUserMutationVariables>(RateUserDocument, options);
      }
export type RateUserMutationHookResult = ReturnType<typeof useRateUserMutation>;
export type RateUserMutationResult = ApolloReactCommon.MutationResult<RateUserMutation>;
export type RateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RateUserMutation, RateUserMutationVariables>;
export const ReportUserDocument = gql`
    mutation ReportUser($userId: String!, $reason: String!, $beepId: String) {
  reportUser(input: {userId: $userId, reason: $reason, beepId: $beepId})
}
    `;
export type ReportUserMutationFn = ApolloReactCommon.MutationFunction<ReportUserMutation, ReportUserMutationVariables>;

/**
 * __useReportUserMutation__
 *
 * To run a mutation, you first call `useReportUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportUserMutation, { data, loading, error }] = useReportUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      reason: // value for 'reason'
 *      beepId: // value for 'beepId'
 *   },
 * });
 */
export function useReportUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReportUserMutation, ReportUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ReportUserMutation, ReportUserMutationVariables>(ReportUserDocument, options);
      }
export type ReportUserMutationHookResult = ReturnType<typeof useReportUserMutation>;
export type ReportUserMutationResult = ApolloReactCommon.MutationResult<ReportUserMutation>;
export type ReportUserMutationOptions = ApolloReactCommon.BaseMutationOptions<ReportUserMutation, ReportUserMutationVariables>;
export const GetBeepHistoryDocument = gql`
    query GetBeepHistory {
  getBeepHistory {
    items {
      id
      timeEnteredQueue
      doneTime
      groupSize
      origin
      destination
      rider {
        id
        name
        first
        last
        photoUrl
      }
    }
    count
  }
}
    `;

/**
 * __useGetBeepHistoryQuery__
 *
 * To run a query within a React component, call `useGetBeepHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBeepHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBeepHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBeepHistoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBeepHistoryQuery, GetBeepHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBeepHistoryQuery, GetBeepHistoryQueryVariables>(GetBeepHistoryDocument, options);
      }
export function useGetBeepHistoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBeepHistoryQuery, GetBeepHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBeepHistoryQuery, GetBeepHistoryQueryVariables>(GetBeepHistoryDocument, options);
        }
export type GetBeepHistoryQueryHookResult = ReturnType<typeof useGetBeepHistoryQuery>;
export type GetBeepHistoryLazyQueryHookResult = ReturnType<typeof useGetBeepHistoryLazyQuery>;
export type GetBeepHistoryQueryResult = ApolloReactCommon.QueryResult<GetBeepHistoryQuery, GetBeepHistoryQueryVariables>;
export const GetRideHistoryDocument = gql`
    query GetRideHistory {
  getRideHistory {
    items {
      id
      timeEnteredQueue
      doneTime
      groupSize
      origin
      destination
      beeper {
        id
        name
        first
        last
        photoUrl
      }
    }
    count
  }
}
    `;

/**
 * __useGetRideHistoryQuery__
 *
 * To run a query within a React component, call `useGetRideHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRideHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRideHistoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRideHistoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRideHistoryQuery, GetRideHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRideHistoryQuery, GetRideHistoryQueryVariables>(GetRideHistoryDocument, options);
      }
export function useGetRideHistoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRideHistoryQuery, GetRideHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRideHistoryQuery, GetRideHistoryQueryVariables>(GetRideHistoryDocument, options);
        }
export type GetRideHistoryQueryHookResult = ReturnType<typeof useGetRideHistoryQuery>;
export type GetRideHistoryLazyQueryHookResult = ReturnType<typeof useGetRideHistoryLazyQuery>;
export type GetRideHistoryQueryResult = ApolloReactCommon.QueryResult<GetRideHistoryQuery, GetRideHistoryQueryVariables>;
export const GetRatingsIMadeDocument = gql`
    query GetRatingsIMade($id: String, $me: Boolean) {
  getRatings(id: $id, me: $me) {
    items {
      id
      stars
      timestamp
      message
      rated {
        id
        name
        photoUrl
      }
    }
    count
  }
}
    `;

/**
 * __useGetRatingsIMadeQuery__
 *
 * To run a query within a React component, call `useGetRatingsIMadeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingsIMadeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingsIMadeQuery({
 *   variables: {
 *      id: // value for 'id'
 *      me: // value for 'me'
 *   },
 * });
 */
export function useGetRatingsIMadeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRatingsIMadeQuery, GetRatingsIMadeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRatingsIMadeQuery, GetRatingsIMadeQueryVariables>(GetRatingsIMadeDocument, options);
      }
export function useGetRatingsIMadeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRatingsIMadeQuery, GetRatingsIMadeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRatingsIMadeQuery, GetRatingsIMadeQueryVariables>(GetRatingsIMadeDocument, options);
        }
export type GetRatingsIMadeQueryHookResult = ReturnType<typeof useGetRatingsIMadeQuery>;
export type GetRatingsIMadeLazyQueryHookResult = ReturnType<typeof useGetRatingsIMadeLazyQuery>;
export type GetRatingsIMadeQueryResult = ApolloReactCommon.QueryResult<GetRatingsIMadeQuery, GetRatingsIMadeQueryVariables>;
export const GetRatingsOnMeDocument = gql`
    query GetRatingsOnMe($id: String, $me: Boolean) {
  getRatings(id: $id, me: $me) {
    items {
      id
      stars
      timestamp
      message
      rater {
        id
        name
        photoUrl
      }
    }
    count
  }
}
    `;

/**
 * __useGetRatingsOnMeQuery__
 *
 * To run a query within a React component, call `useGetRatingsOnMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingsOnMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingsOnMeQuery({
 *   variables: {
 *      id: // value for 'id'
 *      me: // value for 'me'
 *   },
 * });
 */
export function useGetRatingsOnMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetRatingsOnMeQuery, GetRatingsOnMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRatingsOnMeQuery, GetRatingsOnMeQueryVariables>(GetRatingsOnMeDocument, options);
      }
export function useGetRatingsOnMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRatingsOnMeQuery, GetRatingsOnMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRatingsOnMeQuery, GetRatingsOnMeQueryVariables>(GetRatingsOnMeDocument, options);
        }
export type GetRatingsOnMeQueryHookResult = ReturnType<typeof useGetRatingsOnMeQuery>;
export type GetRatingsOnMeLazyQueryHookResult = ReturnType<typeof useGetRatingsOnMeLazyQuery>;
export type GetRatingsOnMeQueryResult = ApolloReactCommon.QueryResult<GetRatingsOnMeQuery, GetRatingsOnMeQueryVariables>;
export const GetInitialRiderStatusDocument = gql`
    query GetInitialRiderStatus {
  getRiderStatus {
    id
    ridersQueuePosition
    isAccepted
    origin
    destination
    state
    groupSize
    location {
      id
      longitude
      latitude
    }
    beeper {
      id
      first
      last
      singlesRate
      groupRate
      isStudent
      role
      venmo
      cashapp
      username
      phone
      photoUrl
      masksRequired
      capacity
      queueSize
    }
  }
}
    `;

/**
 * __useGetInitialRiderStatusQuery__
 *
 * To run a query within a React component, call `useGetInitialRiderStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInitialRiderStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInitialRiderStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInitialRiderStatusQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetInitialRiderStatusQuery, GetInitialRiderStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetInitialRiderStatusQuery, GetInitialRiderStatusQueryVariables>(GetInitialRiderStatusDocument, options);
      }
export function useGetInitialRiderStatusLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetInitialRiderStatusQuery, GetInitialRiderStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetInitialRiderStatusQuery, GetInitialRiderStatusQueryVariables>(GetInitialRiderStatusDocument, options);
        }
export type GetInitialRiderStatusQueryHookResult = ReturnType<typeof useGetInitialRiderStatusQuery>;
export type GetInitialRiderStatusLazyQueryHookResult = ReturnType<typeof useGetInitialRiderStatusLazyQuery>;
export type GetInitialRiderStatusQueryResult = ApolloReactCommon.QueryResult<GetInitialRiderStatusQuery, GetInitialRiderStatusQueryVariables>;
export const RiderStatusDocument = gql`
    subscription RiderStatus($topic: String!) {
  getRiderUpdates(topic: $topic) {
    id
    ridersQueuePosition
    isAccepted
    origin
    destination
    state
    groupSize
    location {
      id
      longitude
      latitude
    }
    beeper {
      id
      first
      last
      singlesRate
      groupRate
      isStudent
      role
      venmo
      cashapp
      username
      phone
      photoUrl
      masksRequired
      capacity
      queueSize
    }
  }
}
    `;

/**
 * __useRiderStatusSubscription__
 *
 * To run a query within a React component, call `useRiderStatusSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRiderStatusSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRiderStatusSubscription({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useRiderStatusSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<RiderStatusSubscription, RiderStatusSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<RiderStatusSubscription, RiderStatusSubscriptionVariables>(RiderStatusDocument, options);
      }
export type RiderStatusSubscriptionHookResult = ReturnType<typeof useRiderStatusSubscription>;
export type RiderStatusSubscriptionResult = ApolloReactCommon.SubscriptionResult<RiderStatusSubscription>;
export const BeepersLocationDocument = gql`
    subscription BeepersLocation($topic: String!) {
  getLocationUpdates(topic: $topic) {
    latitude
    longitude
  }
}
    `;

/**
 * __useBeepersLocationSubscription__
 *
 * To run a query within a React component, call `useBeepersLocationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBeepersLocationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBeepersLocationSubscription({
 *   variables: {
 *      topic: // value for 'topic'
 *   },
 * });
 */
export function useBeepersLocationSubscription(baseOptions: ApolloReactHooks.SubscriptionHookOptions<BeepersLocationSubscription, BeepersLocationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSubscription<BeepersLocationSubscription, BeepersLocationSubscriptionVariables>(BeepersLocationDocument, options);
      }
export type BeepersLocationSubscriptionHookResult = ReturnType<typeof useBeepersLocationSubscription>;
export type BeepersLocationSubscriptionResult = ApolloReactCommon.SubscriptionResult<BeepersLocationSubscription>;
export const GetEtaDocument = gql`
    query GetETA($start: String!, $end: String!) {
  getETA(start: $start, end: $end)
}
    `;

/**
 * __useGetEtaQuery__
 *
 * To run a query within a React component, call `useGetEtaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEtaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEtaQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useGetEtaQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetEtaQuery, GetEtaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetEtaQuery, GetEtaQueryVariables>(GetEtaDocument, options);
      }
export function useGetEtaLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEtaQuery, GetEtaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetEtaQuery, GetEtaQueryVariables>(GetEtaDocument, options);
        }
export type GetEtaQueryHookResult = ReturnType<typeof useGetEtaQuery>;
export type GetEtaLazyQueryHookResult = ReturnType<typeof useGetEtaLazyQuery>;
export type GetEtaQueryResult = ApolloReactCommon.QueryResult<GetEtaQuery, GetEtaQueryVariables>;
export const LeaveQueueDocument = gql`
    mutation LeaveQueue {
  riderLeaveQueue
}
    `;
export type LeaveQueueMutationFn = ApolloReactCommon.MutationFunction<LeaveQueueMutation, LeaveQueueMutationVariables>;

/**
 * __useLeaveQueueMutation__
 *
 * To run a mutation, you first call `useLeaveQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveQueueMutation, { data, loading, error }] = useLeaveQueueMutation({
 *   variables: {
 *   },
 * });
 */
export function useLeaveQueueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LeaveQueueMutation, LeaveQueueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LeaveQueueMutation, LeaveQueueMutationVariables>(LeaveQueueDocument, options);
      }
export type LeaveQueueMutationHookResult = ReturnType<typeof useLeaveQueueMutation>;
export type LeaveQueueMutationResult = ApolloReactCommon.MutationResult<LeaveQueueMutation>;
export type LeaveQueueMutationOptions = ApolloReactCommon.BaseMutationOptions<LeaveQueueMutation, LeaveQueueMutationVariables>;
export const GetBeepersDocument = gql`
    query GetBeepers {
  getBeeperList {
    id
    first
    last
    isStudent
    singlesRate
    groupRate
    capacity
    queueSize
    photoUrl
    role
    masksRequired
    rating
    venmo
    cashapp
  }
}
    `;

/**
 * __useGetBeepersQuery__
 *
 * To run a query within a React component, call `useGetBeepersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBeepersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBeepersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBeepersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBeepersQuery, GetBeepersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBeepersQuery, GetBeepersQueryVariables>(GetBeepersDocument, options);
      }
export function useGetBeepersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBeepersQuery, GetBeepersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBeepersQuery, GetBeepersQueryVariables>(GetBeepersDocument, options);
        }
export type GetBeepersQueryHookResult = ReturnType<typeof useGetBeepersQuery>;
export type GetBeepersLazyQueryHookResult = ReturnType<typeof useGetBeepersLazyQuery>;
export type GetBeepersQueryResult = ApolloReactCommon.QueryResult<GetBeepersQuery, GetBeepersQueryVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($password: String!) {
  changePassword(password: $password)
}
    `;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const EditAccountDocument = gql`
    mutation EditAccount($first: String!, $last: String!, $email: String!, $phone: String!, $venmo: String, $cashapp: String) {
  editAccount(
    input: {first: $first, last: $last, email: $email, phone: $phone, venmo: $venmo, cashapp: $cashapp}
  ) {
    id
    name
  }
}
    `;
export type EditAccountMutationFn = ApolloReactCommon.MutationFunction<EditAccountMutation, EditAccountMutationVariables>;

/**
 * __useEditAccountMutation__
 *
 * To run a mutation, you first call `useEditAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editAccountMutation, { data, loading, error }] = useEditAccountMutation({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      venmo: // value for 'venmo'
 *      cashapp: // value for 'cashapp'
 *   },
 * });
 */
export function useEditAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditAccountMutation, EditAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<EditAccountMutation, EditAccountMutationVariables>(EditAccountDocument, options);
      }
export type EditAccountMutationHookResult = ReturnType<typeof useEditAccountMutation>;
export type EditAccountMutationResult = ApolloReactCommon.MutationResult<EditAccountMutation>;
export type EditAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<EditAccountMutation, EditAccountMutationVariables>;
export const AddProfilePictureDocument = gql`
    mutation AddProfilePicture($picture: Upload!) {
  addProfilePicture(picture: $picture) {
    photoUrl
  }
}
    `;
export type AddProfilePictureMutationFn = ApolloReactCommon.MutationFunction<AddProfilePictureMutation, AddProfilePictureMutationVariables>;

/**
 * __useAddProfilePictureMutation__
 *
 * To run a mutation, you first call `useAddProfilePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfilePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfilePictureMutation, { data, loading, error }] = useAddProfilePictureMutation({
 *   variables: {
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useAddProfilePictureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddProfilePictureMutation, AddProfilePictureMutationVariables>(AddProfilePictureDocument, options);
      }
export type AddProfilePictureMutationHookResult = ReturnType<typeof useAddProfilePictureMutation>;
export type AddProfilePictureMutationResult = ApolloReactCommon.MutationResult<AddProfilePictureMutation>;
export type AddProfilePictureMutationOptions = ApolloReactCommon.BaseMutationOptions<AddProfilePictureMutation, AddProfilePictureMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout(isApp: true)
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;