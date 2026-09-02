export interface IconData {
  path: string;
  viewBox: string;
  strokeWidth: string;
}

export default function Icon({ iconData, stroke = false, fill = false, reduce = false }: {
  iconData: IconData;
  stroke?: boolean;
  fill?: boolean;
  reduce?: boolean;
}) {
  return (
    <div className={`flex justify-center items-center ${reduce ? 'w-5 h-5' : 'w-6 h-6'}`}>
      <svg aria-hidden="true" focusable="false" stroke="none" fill="none" viewBox={iconData.viewBox} xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path strokeWidth={iconData.strokeWidth} className={stroke ? 'stroke-dark' : fill ? 'fill-soft' : ''} d={iconData.path} />
      </svg>
    </div>
  );
}
