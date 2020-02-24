const { db } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase/app");
require("firebase/auth");
const { admin } = require("../util/admin");

firebase.initializeApp(config);

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails
} = require("../util/validators");

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);

  let token, userId;
  return db
    .doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
      console.log("doc:", doc.exists);
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      console.log("data:", data).user;
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(tokenId => {
      token = tokenId;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
        imageUrl: `firebase.storage.googleapis.com/v0/b/${config.storageBucket}/0/no-img.png?alt=media`
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(500).json({ email: "Email is already in use" });
      }
      if (err.code === "auth/email-already-in-use") {
        return res.status(500).json({ email: "Email is already in use" });
      } else {
        return res
          .status(500)
          .json({ general: "Something went wrong please try again" });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      console.log("data:", data);
      return data.user.getIdToken();
    })
    .then(token => {
      res.json({ token });
    })
    .catch(err => {
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again " });
    });
};

// Add user detail
exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ mesage: "Details added successfully" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// get own user details
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`).get();
  then(doc => {
    if (doc.exists) {
      userData.credentials = doc.data();
      return db
        .collection("likes")
        .where("userHandle", "==", req.user.handle)
        .get();
    }
  })
    .then(data => {
      data.forEach(doc => {
        userData.likes = [];
        userData.likes.push(doc.data());
      });
      return db
        .collection("notifications")
        .where("recipient", "==", req.user.handle)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
    })
    .then(data => {
      userData.notifications = [];
      data.forEach(doc => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          screamId: doc.data().screamId,
          type: doc.data().type,
          read: doc.data().read,
          notificationId: doc.id
        });
      });
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//get any user details
exports.getUserDetails = (req, res) => {
  let userData = {};

  db.doc("/users/${req.params.handle")
    .get()
    .then(doc => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("screams")
          .where("userHandle", "==", req.params.handle)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    })
    .then(data => {
      userData.screams = [];
      data.forEach(doc => {
        userData.screams.push({
          body: doc.data().body,
          createdAt: doc.data().createdAt,
          userHandle: doc.data().userHandle,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          screamId: doc.id
        });
      });
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(400).json({ error: err.code });
    });
};

// mark notifications

exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach(notif => {
    const notification = db.doc(`/notifications/${notif.notificationId}`);
    batch.update(notification, { read: true });
    batch
      .commit()
      .then(() => {
        return res.jsn({ message: "Notification market read" });
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
};

// upload image
exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" || mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    const imageFileName = `${Math.round(
      Math.random() * 1000000000000
    )}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBuUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          contentType: imageToBeUploaded.mimetype
        }
      })
      .then(() => {
        const imageUrl = `firebase.storage.googleapis.com/v0/b/${config.storageBucket}/0/${imageFileName}?alt=media`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "image upload successfully" });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  });
  busboy.end(req.rawBody);
};