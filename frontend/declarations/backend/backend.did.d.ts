import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Contact {
  'id' : bigint,
  'name' : string,
  'email' : string,
  'phone' : string,
}
export interface _SERVICE {
  'addContact' : ActorMethod<[string, string, string], bigint>,
  'deleteContact' : ActorMethod<[bigint], boolean>,
  'getAllContacts' : ActorMethod<[], Array<Contact>>,
  'getContact' : ActorMethod<[bigint], [] | [Contact]>,
  'updateContact' : ActorMethod<[bigint, string, string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
