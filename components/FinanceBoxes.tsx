import { motion } from 'framer-motion'
import { useState } from 'react'
export default function FinanceBoxes({
  totalCreditedAmount,
  totalDebitedAmount,
  totalInvestmentAmount,
}: {
  totalCreditedAmount: number
  totalDebitedAmount: number
  totalInvestmentAmount: number
}) {
  const [isHovered, setIsHovered] = useState<string>('')
  return (
    <div className="my-6  grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        {
          name: 'Total Credited Amount',
          value: totalCreditedAmount,
        },
        {
          name: 'Total Non-Investment Amount',
          value: totalDebitedAmount,
        },
        {
          name: 'Total Investment Amount',
          value: totalInvestmentAmount,
        },
      ].map((item) => (
        <motion.div
          key={item.name}
          onHoverStart={() => setIsHovered(item.name)}
          onHoverEnd={() => setIsHovered('')}
          className="relative group"
        >
          <motion.div className="relative w-full py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 border border-white/10">
            <div className="text-center p-4  rounded-lg">
              <motion.div
                animate={{ scale: isHovered === item.name ? 1.1 : 1 }}
                transition={{
                  duration: 0.2,
                  ease: 'easeInOut',
                }}
                className={`text-2xl  font-bold ${
                  item.name === 'Total Non-Investment Amount'
                    ? 'text-rose-400'
                    : 'text-emerald-400'
                }`}
              >
                {item.value}
              </motion.div>
              <div className="text-sm mt-1">{item.name}</div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
