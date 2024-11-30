import PDFUploader from "@/components/pdf-uploader";
import TransactionsList from "@/components/transactions-list";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Track your expenses
      </h1>
      <div className="max-w-2xl mx-auto">
        <PDFUploader />
        <TransactionsList />
      </div>
    </main>
  );
}
