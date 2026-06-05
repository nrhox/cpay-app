import Card from "../ui/Card";

interface ReviewItem {
  label: string;
  value: string;
}

export default function TransactionReview({
  items,
  className = "max-w-xl",
}: {
  items: ReviewItem[];
  className?: string;
}) {
  return (
    <Card className={className}>
      <div className="text-primary grid gap-3 text-sm">
        {items.map((item) => (
          <div key={item.label} className="grid gap-1">
            <p className="caption text-primary">{item.label}</p>
            <p className="text-primary font-semibold">{item.value || "-"}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
