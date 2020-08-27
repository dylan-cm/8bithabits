import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as nodemailer from 'nodemailer'
admin.initializeApp()
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
})

// Your company name to include in the emails
const APP_NAME = '8Bit Habits'

exports.deleteUser = functions.https.onCall((data, context) => {
  const uid = data
  // Delete User
  admin
    .auth()
    .deleteUser(uid)
    .then(() => functions.logger.log('Successfully deleted user ', uid))
    .catch((err) => functions.logger.log('Error deleting user:', err))
})

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  // Create new user document
  admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .set({
      // TODO: starter habit & sequence
      sequences: [],
      habits: [],
    })
    .then(() => functions.logger.log(`Successfully created user doc for [${user.uid}]`))
    .catch((err) => functions.logger.log(`Error creating new user [${user.uid}] doc: ${err}`))
  //TODO: Send welcome email
  //! Not working goddamnit
  const email = user.email // The email of the user.
  const displayName = user.displayName // The display name of the user.

  if (email && displayName) return sendWelcomeEmail(email, displayName)
  return
})

// Sends a welcome email to the given user.
async function sendWelcomeEmail(email: string, displayName: string) {
  const mailOptions: any = {
    from: `${APP_NAME} <${gmailEmail}>`,
    to: email,
  }

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`
  mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`
  await mailTransport.sendMail(mailOptions)
  functions.logger.log('New welcome email sent to:', email)
  return null
}

// Custom Claims
exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      })
    })
    .then(() => {
      return { message: `Success! ${data.email} has been made an admin` }
    })
    .catch((err) => err)
})
