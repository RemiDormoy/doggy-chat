import firebase from 'firebase';
import store from '../stores/navigation';


// eslint-disable-next-line import/prefer-default-export
export function getMessages() {
  const firestore = firebase.firestore();
  const docRef = firestore.collection('messages').doc();
  docRef.set({
    id: docRef.id,
    content: 'Je suis le contenu d\'un message',
    sender: 'Je suis celui qui l\'a envoyé',
  });
}

export function sendMessage(input) {
  const firestore = firebase.firestore();
  const docRef = firestore.collection('messages').doc();
  docRef.set({
    id: docRef.id,
    content: input,
    sender: 'Je suis celui qui l\'a envoyé',
  });
}

export function refreshMessages() {
  const firestore = firebase.firestore();
  firestore.collection('messages').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const message = {
        id: doc.id,
        content: doc.data().content,
      };
      store.commit('addMessage', message);
    });
  });
}
