import { onCall, HttpsError } from 'firebase-functions/https'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

initializeApp()
const db = getFirestore()

function assertAccenture(email?: string) {
  if (!email || !email.endsWith('@accenture.com')) {
    throw new HttpsError('permission-denied', 'Only @accenture.com users are allowed.')
  }
}

export const markTodayAttendance = onCall(async (req) => {
  assertAccenture(req.auth?.token.email)
  const uid = String(req.data.uid ?? '')
  const status = String(req.data.status ?? 'AB')
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const docId = `${uid}_${now.getFullYear()}_${month}`
  await db.collection('attendance').doc(docId).set(
    {
      uid,
      year: now.getFullYear(),
      month: Number(month),
      attendanceData: { [day]: status },
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: req.auth?.uid ?? null,
    },
    { merge: true },
  )
  return { ok: true }
})

export const markAttendanceRange = onCall(async () => ({ ok: true }))
export const markSpecificDates = onCall(async () => ({ ok: true }))
export const upsertMember = onCall(async () => ({ ok: true }))
export const adminAddOrRemoveAdmin = onCall(async () => ({ ok: true }))
export const pruneAttendanceByDateRange = onCall(async () => ({ ok: true }))
export const validateAdminSecretPhrase = onCall(async () => ({ ok: true }))
