export interface LinkIconData {
  iconId: number;
  title: string;
  path: string;
  link: string;
  otherLink?: string;
}

export default function IconLink({ iconData }: { iconData: LinkIconData }) {
  return (
    <a target="_blank" rel="noopener noreferrer" aria-label={iconData.title} href={iconData.otherLink ?? iconData.link}
      className="hover:[&_path]:fill-softHover cursor-pointer p-3">
      <div className="flex justify-center items-center w-6 h-6 hover:text-link-hover">
        <svg aria-hidden="true" focusable="false" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path className="fill-soft" d={iconData.path} />
        </svg>
      </div>
    </a>
  );
}
