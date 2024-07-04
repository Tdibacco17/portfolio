export default function Section({ text }: { text: string }) {
    return (
        <div className="absolute top-0 -left-10 text-lightPrimary lg:block hidden">
            <p className="text-right -ml-28 font-bold">{text}</p>
        </div>
    )
}