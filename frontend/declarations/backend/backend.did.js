export const idlFactory = ({ IDL }) => {
  const Contact = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'phone' : IDL.Text,
  });
  return IDL.Service({
    'addContact' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'deleteContact' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'getAllContacts' : IDL.Func([], [IDL.Vec(Contact)], ['query']),
    'getContact' : IDL.Func([IDL.Nat], [IDL.Opt(Contact)], ['query']),
    'updateContact' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
