export default function Section({ text }: { text: string }) {
    return (
        <div className="text-lightPrimary lg:top-0 lg:-left-10 lg:absolute lg:-pb-0 relative pb-4">
            <p className="font-bold lg:-ml-28 lg:text-right">{text}</p>
        </div>
    )
}