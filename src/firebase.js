import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

var config = {
	apiKey: process.env.REACT_APP_APIKEY,
	authDomain: "rescutrak.firebaseapp.com",
	databaseURL: "https://rescutrak.firebaseio.com",
	projectId: "rescutrak",
	storageBucket: "rescutrak.appspot.com",
	messagingSenderId: "140281731824",
	appId: "1:140281731824:web:692cade43a9564cc2a8035",
	measurementId: "G-EMGDYZMQXB",
};

firebase.initializeApp(config);
firebase.firestore();
firebase.storage();
firebase.database();

export default firebase;
