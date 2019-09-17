import firebase from 'firebase';
import axios from 'axios';
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
  const { username } = store.state;
  const donelist = [];
  const docRef = firestore.collection('messages')
    .doc();
  docRef.set({
    id: docRef.id,
    content: input,
    sender: username,
    time: new Date().toISOString(),
  });
  console.log('On est au bon endrot');
  firestore.collection('users')
    .get()
    .then((docs) => {
      console.log(docs.docs);
      docs.forEach((doc) => {
        console.log(doc.data());
        const token = doc.data().userToken;
        if (donelist.includes(token)) {
          // do nothing
        } else {
          donelist.push(token);
          axios.post('https://fcm.googleapis.com/fcm/send',
            {
              notification: {
                title: `${username} te parle sur doggy-chat`,
                body: input,
                click_action: 'https://doggy-chat.firebaseapp.com/',
              },
              to: token,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'key=AAAANzUnBTU:APA91bHVvpWqTt0SYwnx7wYwxT5a4jz32-FuR6OSx4UwhoaOQqROKC1qe1C8nGzNK7lK6Z3XygcaqizkhIh2UgHRggmoLL_6OCDc43nfmleQcgFL6Pp3WUJNvEcXRRb2eqHv1-T8P8mY',
              },
            });
        }
      });
    });
  console.log('fin de la methode');
}

export function addUser(token, name) {
  const firestore = firebase.firestore();
  const docRef = firestore.collection('users')
    .doc();
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
