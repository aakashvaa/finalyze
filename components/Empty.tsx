import { FullNavbarType } from '@/type'

export default function Empty({ select }: { select: FullNavbarType }) {
  return (
    <div className="w-full  h-full py-10 flex flex-col items-center justify-center space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-3xl text-white/60">
          ⎓
        </div>
        <h3 className="text-xl font-semibold text-white/90">
          No transactions recorded
        </h3>
        <p className="text-center  text-white/60 max-w-md text-sm leading-6">
          No transactions found in{' '}
          {select.charAt(0).toUpperCase() + select.slice(1)}.
        </p>
      </div>
    </div>
  )
}
