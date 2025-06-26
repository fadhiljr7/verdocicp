export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Document = IDL.Record({
    'verifier' : IDL.Principal,
    'hash' : IDL.Text,
    'timestamp' : Time,
  });
  const DocumentVerifier = IDL.Service({
    'addDocumentHash' : IDL.Func([IDL.Text], [], []),
    'getDocument' : IDL.Func([IDL.Text], [IDL.Opt(Document)], ['query']),
    'removeDocumentHash' : IDL.Func([IDL.Text], [], []),
  });
  return DocumentVerifier;
};
export const init = ({ IDL }) => { return []; };
