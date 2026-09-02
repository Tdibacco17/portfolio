export interface TechIconData {
  iconId: number;
  path: string;
  title: string;
  color: string;
}

export default function TechIcon({ iconData }: { iconData: TechIconData }) {
  return (
    <div className="icon-container flex flex-col justify-center gap-3 items-center rounded-custom p-6 border-solid border-[1px] bg-darkPrimary border-darkPrimary hover:bg-darkPrimaryHover">
      <svg aria-hidden="true" focusable="false" className="max-h-[2.25rem] max-w-[2.25rem]" stroke="none" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeWidth="0" className={`color-${iconData.color}`} d={iconData.path} />
      </svg>
      <p className={`text-xs font-medium uppercase color-${iconData.color}`}>{iconData.title}</p>
    </div>
  );
}
