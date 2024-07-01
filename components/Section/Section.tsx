export default function Section({ text }: { text: string }) {
    return (
        <div className="absolute top-0 -left-10 text-lightPrimary">
            <p className="text-right -ml-28">{text}</p>
        </div>
    )
}