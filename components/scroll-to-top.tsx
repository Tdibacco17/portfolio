export default function ScrollToTop({ label }: { label: string }) {
  return (
    <div className="flex justify-center absolute -bottom-40 w-full">
      <a href="#top" className="text-sm cursor-pointer font-bold text-lightPrimary">{label}</a>
    </div>
  );
}
