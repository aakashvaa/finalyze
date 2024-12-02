import { UploadForm } from "@/components/upload-form";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        PDF Data Extractor
      </h1>
      <div className="max-w-4xl mx-auto">
        <UploadForm />
      </div>
    </main>
  );
}
