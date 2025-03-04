import { TableRow } from '@/components/ui/table'
import { TypeTransaction } from '@/type/store/typeStore'
import { bill, foodKeywords, investmentKeywords } from '@/utils/constant'
import axios from 'axios'

const dateRegex = /\d{2}\/\d{2}\/\d{2}/

export async function uploadPdf(file: File): Promise<any> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post('api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    // console.log(response);
    const data = parseBankStatement(response.data.content)
    // console.log(data);
    return data // Axios automatically parses the JSON response
  } catch (error: any) {
    console.error('Error uploading PDF:', error.response?.data || error.message)
    throw new Error(error.response?.data?.error || 'Failed to upload PDF')
  }
}
function splitByDates(line: string) {
  const matches = line.match(new RegExp(dateRegex, 'g'))
  if (matches && matches.length === 2) {
    const [firstDate, secondDate] = matches
    const firstDateIndex = line.indexOf(firstDate)
    const secondDateIndex = line.indexOf(
      secondDate,
      firstDateIndex + firstDate.length
    )

    return [
      line.slice(0, firstDateIndex + firstDate.length).trim(), // Up to the first date
      line.slice(firstDateIndex + firstDate.length, secondDateIndex).trim(), // Between the two dates
      line.slice(secondDateIndex).trim(), // From the second date onward
    ]
  }
  return [line] // Return the original line if it doesn't have two dates
}

function parseBankStatement(text: string) {
  const lines = text.split('\n')
  const tableRows: TypeTransaction[] = []
  const regex = /^\d{2}\/\d{2}\/\d{2}/ // Match rows starting with a date (e.g., 01/11/24)
  let currency = ''
  let prev = null
  for (const line of lines) {
    const isMatch = regex.test(line)
    // console.log(line, isMatch);
    if (line.startsWith('Currency')) {
      console.warn(line.split(' '))
      currency = line.split(' ')[2]
    }
    if (isMatch) {
      // Extract content and format as needed
      const formattedLine = line.trim() // Space-separated
      // tableRows.push(formattedLine);
      const temp = splitByDates(line)

      const dateRegex = /^\d{2}\/\d{2}\/\d{2}/ // Matches the date at the start
      const amountRegex = /\d+\.\d{2}/g // Matches numbers with two decimal places

      // Extract the date
      if (temp[2]) {
        const date = temp[2].match(dateRegex)?.[0] as string
        // Extract the remaining part after the date
        const rest = date ? temp[2].replace(date, '') : line
        // console.log("hii", date, rest);

        const parts = rest.split('.')
        // console.warn(parts, parts[0] + "." + parts[1].substring(0, 2));

        const temp1 = parts[0] + '.' + parts[1].substring(0, 2)
        const temp2 = parts[1].slice(2) + '.' + parts[2]

        let firstAmount = parseFloat(temp1.replace(/,/g, '')).toFixed(2)
        let secondAmount = parseFloat(temp2.replace(/,/g, '')).toFixed(2)
        // console.warn(line, firstAmount, secondAmount);

        if (prev == null) prev = +secondAmount

        const type = +prev < +secondAmount ? 'credit' : 'debit'
        const amount = firstAmount
        let totalInvestment = 0
        let totalCredit = 0
        let totalDebit = 0
        let tableName = ''
        const description = temp[1].startsWith('UPI')
          ? temp[1].split('@')[0].split('-')[1]
          : temp[1].split('@')[0]

        // Check if the transaction matches any investment keyword
        const isInvestment = investmentKeywords.some((keyword) =>
          description.toUpperCase().includes(keyword)
        )

        const isFood = foodKeywords.some((keyword) => {
          return description.toUpperCase().includes(keyword.toUpperCase())
        })
        const isBill = bill.some((keyword) =>
          description.toUpperCase().includes(keyword.toUpperCase())
        )
        // finding the total investment amount, total credit amount and total debit amount
        if (!isNaN(+amount)) {
          if (isInvestment && type === 'debit') {
            // console.log(+amount, description)
            totalInvestment += parseFloat(amount)
          } else {
            // console.log(parseFloat(amount), description);
            if (type === 'credit') totalCredit += parseFloat(amount)
            else if (type === 'debit') totalDebit += parseFloat(amount)
          }
        }

        // making mapping table for each type of transaction
        // mapping will be like {description: { full description => totalAmount: 100, count: 2}}

        // console.log({
        //   date,
        //   to: temp[1],
        //   [typeKey]: firstAmount,
        //   totalAmount: secondAmount,
        // });
        tableRows.push({
          date,
          description: temp[1],
          type,
          amount,
          tableName: isBill
            ? 'bill'
            : isFood
            ? 'food'
            : isInvestment
            ? 'investment'
            : type,
          totalAmount: secondAmount,
        })
        prev = secondAmount
      } else {
        // console.warn("match not found", line, temp);
        let tableName = ''
        const date = temp[0].match(dateRegex)?.[0] as string
        const description = date ? temp[0].replace(date, '') : temp[0]

        // Check if the transaction matches any investment keyword
        const isInvestment = investmentKeywords.some((keyword) =>
          description.toUpperCase().includes(keyword)
        )

        const isFood = foodKeywords.some((keyword) => {
          return description.toUpperCase().includes(keyword.toUpperCase())
        })
        const isBill = bill.some((keyword) =>
          description.toUpperCase().includes(keyword.toUpperCase())
        )

        tableRows.push({
          date,
          description,
          type: 'credit',
          amount: 'NA',
          tableName: isBill
            ? 'bill'
            : isFood
            ? 'food'
            : isInvestment
            ? 'investment'
            : 'credit',
          totalAmount: 'NA',
        })
      }
    }
  }
  const data = {
    transactions: tableRows,
    currency,
    months: ['Nov'],
  }
  console.log(data)
  return data
}
