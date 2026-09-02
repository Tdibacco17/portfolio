export default function SectionHeading({ id, text }: { id: string; text: string }) {
  return (
    <div className="text-lightPrimary lg:top-0 lg:-left-10 lg:absolute relative pb-4">
      <h2 id={id} className="font-bold lg:-ml-28 lg:text-right">{text}</h2>
    </div>
  );
}
