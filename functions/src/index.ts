import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

exports.deleteUser = functions.https.onCall((data, context) => {
  const uid = data
  // Delete User
  admin
    .auth()
    .deleteUser(uid)
    .then(() => functions.logger.log('Successfully deleted user ', uid))
    .catch((error) => functions.logger.log('Error deleting user:', error))
})
