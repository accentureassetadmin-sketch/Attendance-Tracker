import { PageCard } from '../components/Ui'
import { STATUS_META, type AttendanceStatus } from '../config/attendance'

const names = ['Dev 1', 'Dev 2', 'Tester 1', 'Tester 2']

export function MonthlySummaryPage() {
  const days = Array.from({ length: 30 }, (_, i) => `D${i + 1}`)
  return (
    <PageCard title="Monthly Summary">
      <div className="mb-3 flex justify-end">
        <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white">Refresh Data</button>
      </div>
      <div className="overflow-auto">
        <table className="min-w-[1400px] border-separate border-spacing-1 text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 bg-slate-200 p-2 dark:bg-slate-700">Name</th>
              {days.map((d) => <th key={d} className="bg-slate-200 p-2 dark:bg-slate-700">{d}</th>)}
              <th className="bg-slate-200 p-2 dark:bg-slate-700">PH</th>
              <th className="bg-slate-200 p-2 dark:bg-slate-700">SL</th>
              <th className="bg-slate-200 p-2 dark:bg-slate-700">PL</th>
              <th className="bg-slate-200 p-2 dark:bg-slate-700">CL</th>
            </tr>
          </thead>
          <tbody>
            {names.map((name) => (
              <tr key={name}>
                <td className="sticky left-0 bg-slate-200 p-2 dark:bg-slate-700">{name}</td>
                {days.map((d, idx) => {
                  const code: AttendanceStatus = idx % 7 === 0 ? 'PH' : idx % 5 === 0 ? 'SL' : 'AB'
                  return <td key={d} className={`rounded p-2 text-center ${STATUS_META[code].color}`}>{code}</td>
                })}
                <td className="bg-slate-100 p-2 dark:bg-slate-800">4</td>
                <td className="bg-slate-100 p-2 dark:bg-slate-800">3</td>
                <td className="bg-slate-100 p-2 dark:bg-slate-800">2</td>
                <td className="bg-slate-100 p-2 dark:bg-slate-800">1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageCard>
  )
}
