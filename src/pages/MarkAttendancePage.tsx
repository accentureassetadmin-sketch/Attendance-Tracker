import { useMemo, useState } from 'react'
import { PageCard, FieldLabel, Input } from '../components/Ui'
import { STATUS_OPTIONS } from '../config/attendance'
import { isWeekend, safeDay } from '../utils/date'
import { isRateLimited } from '../utils/rateLimit'

const members = ['Dev 1', 'Dev 2', 'Tester 1', 'Tester 2']

export function MarkAttendancePage() {
  const [result, setResult] = useState('')
  const todayDisabled = useMemo(() => isWeekend(new Date()), [])

  function guard(key: string): boolean {
    if (isRateLimited(key)) {
      setResult('Blocked: more than 5 calls within 5 seconds.')
      return false
    }
    return true
  }

  return (
    <div className="grid gap-4">
      <PageCard title="Quick Mark">
        <p className="mb-3 text-sm">Mark today for a selected member. Weekends are blocked.</p>
        <div className="grid gap-2 md:grid-cols-3">
          <select className="rounded-lg border px-3 py-2">{members.map((m) => <option key={m}>{m}</option>)}</select>
          <select className="rounded-lg border px-3 py-2">{STATUS_OPTIONS.map((s) => <option key={s.code}>{s.code}</option>)}</select>
          <button
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-40"
            disabled={todayDisabled}
            onClick={() => {
              if (!guard('quick-mark')) return
              setResult(todayDisabled ? 'Weekend blocked.' : 'Queued monthly doc write for today.')
            }}
          >
            Mark Today
          </button>
        </div>
      </PageCard>

      <PageCard title="Range Mark">
        <p className="mb-3 text-sm">Apply one status across a date range, excluding weekends.</p>
        <div className="grid gap-2 md:grid-cols-4">
          <select className="rounded-lg border px-3 py-2">{members.map((m) => <option key={m}>{m}</option>)}</select>
          <select className="rounded-lg border px-3 py-2">{STATUS_OPTIONS.map((s) => <option key={s.code}>{s.code}</option>)}</select>
          <Input type="date" />
          <Input type="date" />
          <button
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white md:col-span-2"
            onClick={() => {
              if (!guard('range-mark')) return
              setResult('Queued backend batched write for date range.')
            }}
          >
            Mark Range
          </button>
        </div>
      </PageCard>

      <PageCard title="Specific Dates">
        <p className="mb-3 text-sm">Provide comma-separated days for selected year/month.</p>
        <div className="grid gap-2 md:grid-cols-4">
          <select className="rounded-lg border px-3 py-2">{members.map((m) => <option key={m}>{m}</option>)}</select>
          <select className="rounded-lg border px-3 py-2">{STATUS_OPTIONS.map((s) => <option key={s.code}>{s.code}</option>)}</select>
          <Input type="number" defaultValue={new Date().getFullYear()} />
          <Input type="number" min={1} max={12} defaultValue={new Date().getMonth() + 1} />
          <div className="md:col-span-4">
            <FieldLabel>Dates (comma-separated)</FieldLabel>
            <Input
              placeholder="1,3,12"
              onBlur={(e) => {
                const dates = e.target.value
                  .split(',')
                  .map((x) => Number(x.trim()))
                  .filter((x) => !Number.isNaN(x))
                const year = new Date().getFullYear()
                const month = new Date().getMonth() + 1
                const invalid = dates.some((d) => !safeDay(d, year, month))
                setResult(invalid ? 'Invalid date found in list.' : 'Dates are valid.')
              }}
            />
          </div>
        </div>
      </PageCard>

      <p className="text-sm text-indigo-700 dark:text-indigo-300">{result}</p>
    </div>
  )
}
