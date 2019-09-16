import firebase from 'firebase';
import store from '../stores/navigation';


// eslint-disable-next-line import/prefer-default-export
export function getMessages() {
  const firestore = firebase.firestore();
  const docRef = firestore.collection('messages')
    .doc();
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
    sender: store.state.username,
    time: new Date().toISOString(),
  });
  firestore.collection('userrs')
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        console.log(doc.data().token);
      });
    });
}

export function addUser(token, name) {
  const firestore = firebase.firestore();
  const docRef = firestore.collection('users').doc();
  docRef.set({
    userToken: token,
    username: name,
  });
}

export function refreshMessages() {
  const firestore = firebase.firestore();
  firestore.collection('messages')
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const message = {
          id: doc.id,
          content: doc.data().content,
          time: doc.data().time,
          sender: doc.data().sender,
        };
        store.commit('addMessage', message);
      });
    });
}
