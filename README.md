# Animal Rescue Tracking Web App

## What It Is:

This is a small project a friend of mine had the idea of creating. After creating it in PHP and not enjoying it I decided to take it upon myself to create it in React using Firebase for the backend. Some screenshots are below.

## To run it locally:

1. Clone the repo.
2. Setup [Firebase](https://firebase.google.com/) with Firestore, Database, Storage and Authentication(email and password).
3. Add `.env.local` to the root folder and add `REACT_APP_APIKEY` with your Firebase API Key.
4. Update the `src/firebase.js` file shown below.
   <img src="./images/firebasejs.png" height="120px"/>
5. Run `npm start` in your terminal from the root folder

## What I Used:

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Firebase](https://firebase.google.com/)
- [Material UI](https://material-ui.com/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)

## Some Screenshots:

<p align="center">
	Patients Table Screen:
	<br />
	<img src="./images/patients.png" width="460px" />
</p>

<p align="center">
	Login Screen:
	<br />
	<img src="./images/login.png" width="460px" />
</p>

<p align="center">
	Signup Screen:
	<br />
	<img src="./images/signUp.png" width="460px" />
</p>

<p align="center">
	Profile Screen:
	<br />
	<img src="./images/profile.png" width="460px" />
</p>

<p align="center">
	Profile Edit/Change Theme Screen:
	<br />
	<img src="./images/profileEdit.png" width="460px" />
</p>

<p align="center">
	Snackbar Example:
	<br />
	<img src="./images/snackbarExample.png" height="60px" />
</p>