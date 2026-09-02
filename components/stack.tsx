import data from '@/models/data.json';
import SectionHeading from './section-heading';
import TechIcon from './icons/tech-icon';

export default function Stack({ title }: { title: string }) {
  return (
    <section className="relative" aria-labelledby="stack-heading">
      <SectionHeading id="stack-heading" text={title} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(125px,1fr))] w-full gap-[.675rem]">
        {Object.values(data.technologies).map(iconData => <TechIcon key={iconData.iconId} iconData={iconData} />)}
      </div>
    </section>
  );
}
