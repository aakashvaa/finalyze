import {
  FuturisticHighIncomeIndicator,
  FuturisticLowIncomeIndicator,
} from './arrow/Arrow'
import AmountDateChart from './charts/AmountDateChart'
import InvestmentCard from './InvestmentChart'

interface DetailsSectionProps {
  totalCreditedAmount: number
  totalDebitedAmount: number
  totalInvestmentAmount: number
  chartData: { date: string; creditAmount: number; debitAmount: number }[]
}

const DetailsSection: React.FC<DetailsSectionProps> = ({
  totalCreditedAmount,
  totalDebitedAmount,
  totalInvestmentAmount,
  chartData,
}) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-white/5 rounded-xl blur-sm" />

      <div className="relative w-full py-4 px-6 bg-black/30 text-white/90 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 border border-black/10 flex-col">
        <div className="text-center w-full py-5 flex xl:flex-row flex-col justify-center items-center">
          <div className="flex lg:flex-row w-[90%] text-center py-5 pl-4 justify-center items-center">
            Net Savings Balance:
            <div className="flex justify-center items-center">
              <span className="text-center mx-3 px-10 py-1 h-fit border rounded-md">
                {(totalCreditedAmount - totalDebitedAmount).toFixed(2)}
                {totalCreditedAmount > 0 && (
                  <span className="text-sm ml-2 opacity-75">
                    (
                    {(
                      ((totalCreditedAmount - totalDebitedAmount) /
                        totalCreditedAmount) *
                      100
                    ).toFixed(1)}
                    % of income)
                  </span>
                )}
              </span>
              {totalCreditedAmount - totalDebitedAmount > 0 ? (
                <FuturisticHighIncomeIndicator />
              ) : (
                <FuturisticLowIncomeIndicator />
              )}
            </div>
          </div>
          <InvestmentCard
            invest={totalInvestmentAmount}
            nonInvest={totalDebitedAmount}
          />
        </div>
        <div className=" w-full my-3   bg-black/5 p-4 rounded-xl border border-white/10 backdrop-blur-lg">
          <AmountDateChart data={chartData} />
        </div>
        <div className="flex w-4/5 flex-col divide-y divide-white/10">
          <div className="px-3 py-6 space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-black/5 rounded-xl" />
              <p className="relative z-10 font-medium bg-black/5 p-4 rounded-xl border border-white/10 backdrop-blur-lg">
                {totalCreditedAmount - totalDebitedAmount > 0 ? (
                  <>
                    <span className="text-emerald-400 mr-2">●</span>
                    You're saving{' '}
                    <span className="font-bold text-emerald-400">
                      {(totalCreditedAmount - totalDebitedAmount).toFixed(2)}
                    </span>{' '}
                    <span className="text-sm opacity-75">
                      (
                      {(
                        ((totalCreditedAmount - totalDebitedAmount) /
                          totalCreditedAmount) *
                        100
                      ).toFixed(1)}
                      % of income)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-rose-400 mr-2">●</span>
                    Expense Exceedance:{' '}
                    <span className="font-bold text-rose-400">
                      {Math.abs(
                        totalCreditedAmount - totalDebitedAmount
                      ).toFixed(2)}
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="p-4 bg-black/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-sm font-semibold mb-3 text-white/90 border-b border-white/10 pb-2">
                  Income Analysis
                </h4>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Total Income</span>
                    <span className="font-medium">
                      {totalCreditedAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Essential Expenses</span>
                    <span className="text-rose-400">
                      {totalDebitedAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Investment Ratio</span>
                    <span className="text-emerald-400">
                      {(
                        (totalInvestmentAmount / totalCreditedAmount) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-black/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-sm font-semibold mb-3 text-white/90 border-b border-white/10 pb-2">
                  Financial Guidelines
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="opacity-80">Expense Ratio</span>
                    <span className="font-medium">
                      {(
                        (totalDebitedAmount / totalCreditedAmount) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="text-sm p-2.5 rounded-lg bg-black/5">
                    {+(
                      (totalDebitedAmount / totalCreditedAmount) *
                      100
                    ).toFixed(1) > 80 ? (
                      <div className="text-rose-400">
                        Exceeds recommended 80% by{' '}
                        {Math.abs(
                          (totalDebitedAmount / totalCreditedAmount) * 100 - 80
                        ).toFixed(1)}
                        %
                      </div>
                    ) : (
                      <div className="text-emerald-400">
                        Within healthy spending range
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-black/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <p className="text-sm font-medium">
                {totalCreditedAmount - totalDebitedAmount > 0 ? (
                  <>
                    <span className="text-emerald-400">Optimization:</span>{' '}
                    Maintain expenses below{' '}
                    <span className="font-bold">
                      {(0.8 * totalCreditedAmount).toFixed(2)}
                    </span>{' '}
                    <span className="opacity-75">
                      ({(0.8 * 100).toFixed(0)}% of income)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-rose-400">Action Needed:</span> Reduce
                    expenses by{' '}
                    <span className="font-bold">
                      {Math.abs(
                        totalDebitedAmount - 0.8 * totalCreditedAmount
                      ).toFixed(2)}
                    </span>{' '}
                    to reach safety threshold
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="w-full p-5">
            <span className="block font-semibold mb-2 text-white/90">
              Expected Allocations:
            </span>
            <div className="border bg-black/5 border-white/20 backdrop-blur-md rounded-xl overflow-auto flex w-full divide-x-2 divide-white/30 ">
              <div className=" basis-2/3 divide-y-2 divide-white/20 ">
                <div className="flex divide-x-2 divide-white/30 w-full  items-center">
                  <div className="flex w-[55%] flex-col ">
                    <p className="p-3 flex justify-between ">
                      <span className="font-medium">50% Essentials</span>
                      <span className="">:</span>
                      {(0.5 * totalCreditedAmount).toFixed(2)}
                    </p>
                    <p className="p-3 flex justify-between">
                      <span className="font-medium">30% Lifestyle</span>
                      <span className="">:</span>
                      {(0.3 * totalCreditedAmount).toFixed(2)}
                    </p>
                  </div>
                  <p className="flex  justify-between basis-1/2  py-10 h-full   px-5">
                    <p className="font-medium h-full pr-3 ">50% + 30%</p>
                    <span>:</span>
                    <span>
                      {(
                        0.5 * totalCreditedAmount +
                        0.3 * totalCreditedAmount
                      ).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className=" w-full h-[38%] flex justify-center items-center">
                  <div className="flex justify-between w-1/2">
                    <span className="font-medium">20% Investments</span>{' '}
                    <span className="">:</span>
                    {(0.2 * totalCreditedAmount).toFixed(2)}
                  </div>
                </div>
              </div>
              <p className=" text-start flex justify-between basis-1/3 py-[4.5rem] px-5 h-full">
                <p className="font-medium h-full">50% + 30% + 20%</p>
                <span>: </span>
                {totalCreditedAmount.toFixed(2)}
              </p>
            </div>
            <div className="mt-4 p-4 bg-black/10 rounded-xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-sm font-semibold mb-2 text-white/90">
                Understanding the 50/30/20 Rule
              </h4>
              <p className="text-sm text-white/80">
                The 50/30/20 rule is a simple budgeting framework that allocates
                50% of your income to essentials, 30% to lifestyle choices, and
                20% to savings and investments. This helps ensure a balanced
                financial life by prioritizing necessary expenses while also
                allowing for personal enjoyment and future security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsSection
