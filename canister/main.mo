import Text "mo:base/Text";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Error "mo:base/Error";

actor class DocumentVerifier() = this {

  type Document = {
    hash: Text;
    verifier: Principal;
    timestamp: Time.Time;
  };

  stable var documentsStable : [(Text, Document)] = [];

  var documents = HashMap.HashMap<Text, Document>(100, Text.equal, Text.hash);

  // Upgrade lifecycle
  system func preupgrade() {
    documentsStable := Iter.toArray(documents.entries());
  };

  system func postupgrade() {
    documents := HashMap.fromIter(Iter.fromArray(documentsStable), 100, Text.equal, Text.hash);
  };

  // Siapa pun bisa menambahkan dokumen
  public shared({ caller }) func addDocumentHash(hash: Text) : async () {
    if (documents.get(hash) != null) {
      throw Error.reject("Hash already registered.");
    };
    documents.put(hash, {
      hash = hash;
      verifier = caller;
      timestamp = Time.now();
    });
  };

  // Hanya pengunggah yang bisa menghapus
  public shared({ caller }) func removeDocumentHash(hash: Text) : async () {
    switch (documents.get(hash)) {
      case null {
        throw Error.reject("Document hash not found.");
      };
      case (?doc) {
        if (doc.verifier != caller) {
          throw Error.reject("Only the original submitter can remove this document.");
        } else {
          ignore documents.remove(hash);
        };
      }
    }
  };

  public query func getDocument(hash: Text) : async ?Document {
    documents.get(hash)
  };
}